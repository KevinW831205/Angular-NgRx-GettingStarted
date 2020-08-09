import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store } from '@ngrx/store';
import { productReducer, State, getShowProductCode, getCurrentProductState } from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;

  constructor(private store: Store<State> ,private productService: ProductService) { }

  ngOnInit(): void {
    // TODO unsubscribe
    this.store.select(getCurrentProductState).subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    // TODO unsubscribe
    this.store.select(getShowProductCode).subscribe(showProductCode => {
      this.displayCode = showProductCode;
    });
  }

  checkChanged(): void {
    this.store.dispatch(productActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(productActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(productActions.setCurrentProduct({ product: product }));
  }

}
