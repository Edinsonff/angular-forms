import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {
  form: FormGroup;
  image$: Observable<any>;
  images: string[] = [];
  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private storage: AngularFireStorage,
    private categoriesService: CategoriesService
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = {
        title: this.form.value.title,
        price: this.form.value.price,
        description: this.form.value.description,
        categoryId: this.form.value.categoryId,  // Asegúrate de usar categoryId
        images: this.images
      };

      this.productsService.createProduct(product)
        .subscribe({
          next: (newProduct) => {
            console.log('Product created:', newProduct);
            this.router.navigate(['./admin/products']);
          },
          error: (error) => {
            console.error('Error creating product:', error);
            console.error('Error details:', error.error);
          }
        });
    } else {
      console.error('Form is not valid', this.form.errors);
    }
  }

  uploadFile(event) {
    const files = event.target.files;
    if (files) {
      for (let file of files) {
        const name = `${Date.now()}_${file.name}`;
        const fileRef = this.storage.ref(name);
        const task = this.storage.upload(name, file);

        task.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.images.push(url); // Agrega cada nueva URL al arreglo de imágenes
            });
          })
        ).subscribe();
      }
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      categoryId: ['', Validators.required],  // Cambiado de category_id a categoryId
      stock:[0, Validators.required],
    });
  }


  private getCategories() {
    this.categoriesService.getAllCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  get titleField() {
    return this.form.get('title');
  }

  get priceField() {
    return this.form.get('price');
  }
}
