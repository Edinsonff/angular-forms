import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { CategoriesService } from 'src/app/core/services/categories.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[];



  constructor(
    private categoriesService: CategoriesService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.getAllInfo();
  }

    getAllInfo() {
    this.categoriesService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  deleteCategory(category: Category) {
    console.log("Categoria a eliminar:", category);
    if (category.id) { // Cambiar `_id` por `id` si ese es el nombre correcto
      this.categoriesService.deleteCategory(category.id).subscribe(rta => {
        this.getAllInfo();
      }, error => {
        console.error("Error al eliminar la categoría:", error);
      });
    } else {
      console.error("No se encontró ID válido en la categoría:", category);
    }
  }
}
