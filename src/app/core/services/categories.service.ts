import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Category } from 'src/app/core/models/category.model';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}categories/`);
  }

  getCategory(id: string): Observable<Category> {
    return this.http.get<Category>(`${environment.url_api}categories/${id}`);
  }

  createCategory(data: Partial<Category>) {
    return this.http.post<Category>(`${environment.url_api}categories/`, data);
  }

  updateCategory(id: string, changes: Partial<Category>) {
    return this.http.put<Category>(`${environment.url_api}categories/${id}`, changes);
  }

  deleteCategory(id: string) {
    return this.http.delete<Category>(`${environment.url_api}categories/${id}`);
  }

  checkAvailability(name: Category['name']) {
    return this.getAllCategories().pipe(
      map((categories) => {
        const isAvailable = !categories.some((category) => category.name === name);
        return isAvailable;
      })
    );
  }

}
