import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products$: Observable<Product[]>;
  products: Product[] = [];
  selectedTabIndex = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
    this.products$ = this.productService.getProducts('Org-1');
  }

  ngOnInit(): void {
    this.products$
      .pipe(takeUntil(this.destroy$))
      .subscribe(products => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onProductAdded(): void {
    this.selectedTabIndex = 0; // Switch to view products tab
    this.snackBar.open('Product added successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  onProductDeleted(productId: string): void {
    this.productService.removeProduct(productId);
    this.snackBar.open('Product deleted successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }

  trackByProductId(index: number, product: Product): string {
    return product.prodId;
  }
}
