import { Component, OnInit } from '@angular/core';

import { Subscription, Observable } from 'rxjs';
import { Product } from '../product';
import { Store } from '@ngrx/store';
import { productReducer, State, getShowProductCode, getCurrentProductState, getProductsState, getError } from '../state/product.reducer';
import * as productActions from '../state/product.actions';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: any;
  errorMessage$: Observable<string>;

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    // TODO unsubscribe
    this.selectedProduct$ =  this.store.select(getCurrentProductState)

    this.products$ = this.store.select(getProductsState);

    this.store.dispatch(productActions.loadProduct());

    // TODO unsubscribe
    this.displayCode$ = this.store.select(getShowProductCode);

    this.errorMessage$ = this.store.select(getError);
  }

  checkChanged(): void {
    this.store.dispatch(productActions.toggleProductCode());
  }

  newProduct(): void {
    this.store.dispatch(productActions.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(productActions.setCurrentProduct({ currentProductId: product.id }));
  }


}
