import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../../core/services/products/products.service';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  categories: Category[] = [];
  states = [
    {name: 'Arizona', abbrev: 'AZ'},
    {name: 'California', abbrev: 'CA'},
    {name: 'Colorado', abbrev: 'CO'},
    {name: 'New York', abbrev: 'NY'},
    {name: 'Pennsylvania', abbrev: 'PA'},
  ];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
      this.productsService.getProduct(id).subscribe(product => {
        this.form.patchValue({
          title: product.title,
          price: product.price,
          description: product.description,
          categoryId: product.categoryId // Asegúrate de que el nombre aquí coincida exactamente con lo que devuelve la API
        });
      });
      this.categoriesService.getAllCategories().subscribe(categories => {
        this.categories = categories;
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      this.productsService.updateProduct(this.activatedRoute.snapshot.params['id'], this.form.value)
        .subscribe(() => {
          this.router.navigate(['./admin/products']);
        }, error => {
          console.error('Error updating product:', error);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      categoryId: ['', Validators.required] // Asegúrate de que este es el nombre correcto del FormControl
    });
  }
}
