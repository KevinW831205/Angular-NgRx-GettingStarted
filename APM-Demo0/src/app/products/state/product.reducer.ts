import { createReducer, on, createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';
import { Action } from 'rxjs/internal/scheduler/Action';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductState = createSelector(
  getProductFeatureState,
  state => state.currentProduct
);

export const getProductsState = createSelector(
  getProductFeatureState,
  state => state.products
);

export const productReducer = createReducer<ProductState>(
  initialState,
  on(ProductActions.toggleProductCode, (state) : ProductState => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  }),
  on(ProductActions.setCurrentProduct, (state, action): ProductState => {
    return {
      ... state,
      currentProduct: action.product
    };
  }),
  on(ProductActions.initCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProduct: {
        id: 0,
        productName: '',
        productCode: 'new',
        description: '',
        starRating: 0
      }
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState =>{
    return {
      ...state,
      currentProduct: null
    }
  })
);