import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private getProductsUrl = 'http://localhost:3000/getProducts/';
  private removeProductUrl = 'http://localhost:3000/removeProduct/';
  private addProductUrl = 'http://localhost:3000/addProduct';
  private updateProductUrl = 'http://localhost:3000/updateProduct/'; // Assuming update API exists

  constructor(private http: HttpClient) {}

  // Add or create a new product - sending formData or product object
  addProduct(formData: any): Observable<Product> {
    return this.http.post<Product>(this.addProductUrl, formData);
  }

  // Get all products for an organization by orgId
  getProducts(orgId: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.getProductsUrl + orgId);
  }

  // Remove a product by its productId
  removeProduct(prodId: string): Observable<any> {
    return this.http.delete(this.removeProductUrl + prodId);
  }

  // Update a product by id with partial updates
  updateProduct(id: string, updates: any): Observable<Product> {
    return this.http.put<Product>(this.updateProductUrl + id, updates);
  }

  // Get a single product by id (optional - if backend has such endpoint)
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.getProductsUrl}product/${id}`);
  }
}
