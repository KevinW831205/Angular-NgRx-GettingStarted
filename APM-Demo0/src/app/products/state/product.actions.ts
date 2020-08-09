import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const toggleProductCode = createAction('[Product] Toggle Product Code');

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
   props<{ product: Product }>() 
);

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initCurrentProduct = createAction('[Product] Init Current Product');

export const loadProduct = createAction('[Product] Load Product');

export const loadProductSuccess = createAction(
    '[Product] Load Product Success',
    props<{ products: Product[]}>()
);

export const loadProductFail = createAction(
    '[Product] Load Product Fail',
    props<{ error: String }>()
);