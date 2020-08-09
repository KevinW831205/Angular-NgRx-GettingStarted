import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType, act } from '@ngrx/effects';
import { ProductService } from 'src/app/products/product.service';
import * as ProductActions from './product.actions'
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of, merge } from 'rxjs';

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions,
    private productService: ProductService) { }


  // switch map -> cause race conditions, use on cancelable requests
  // concat map -> guarantees order
  // merge map -> runs in parallel but doesn't guarantee order
  // exhaustMap -> ignores all subsequent subscriptions until is complete, use in login
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProduct),
      mergeMap(() => this.productService.getProducts().pipe(
        map(products => ProductActions.loadProductSuccess({ products: products })),
        catchError(error => of(ProductActions.loadProductFail({ error: error })))
      ))
    )
  })

  updateProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.updateProduct),
      concatMap(action => this.productService.updateProduct(action.product).pipe(
        map(product => ProductActions.updateProductSuccess({ product: product })),
        catchError(error => of(ProductActions.updateProductFail({ error })))
      ))
    )
  })

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.createProduct),
      concatMap(action => this.productService.createProduct(action.product).pipe(
        map(product => ProductActions.createProductSuccess({ product: product })),
        catchError(error => of(ProductActions.createProductFail({error})))
      ))
    )
  })

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.deleteProduct),
      mergeMap(action => this.productService.deleteProduct(action.productId).pipe(
        map(() => ProductActions.deleteProductSuccess({ productId: action.productId})),
        catchError(error => of(ProductActions.createProductFail({error})))
      ))
    )
  })
}