import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from 'src/app/products/product.service';
import * as ProductActions from './product.actions'
import { mergeMap, map } from 'rxjs/operators';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions,
        private productService: ProductService){}


    // switch map -> cause race conditions, use on cancelable requests
    // concat map -> guarantees order
    // merge map -> runs in parallel but doesn't guarantee order
    // exhaustMap -> ignores all subsequent subscriptions until is complete, use in login
    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProduct),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => ProductActions.loadProductSuccess({ products: products}))
            ))
        )
    })
}