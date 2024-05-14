import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductsService } from 'src/app/core/services/products/products.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
displayedColumns: string[] = ['image', 'title', 'price', 'actions'];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id).subscribe(
      () => {
        this.fetchProducts(); // Refresh the list after deletion
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }
}
