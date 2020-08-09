import { createReducer, on, createAction, createFeatureSelector, createSelector, props } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { Product } from '../product';
import * as ProductActions from './product.actions';
import { Action } from 'rxjs/internal/scheduler/Action';
import { act, createEffect } from '@ngrx/effects';

export interface State extends AppState.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
}

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductIdState = createSelector(
  getProductFeatureState,
  state => state.currentProductId
)

export const getCurrentProductState = createSelector(
  getProductFeatureState,
  getCurrentProductIdState,
  (state, currentProductId) => {
    if (currentProductId === 0){
      return  {
        id: 0,
        productName: '',
        productCode: 'new',
        description: '',
        starRating: 0
      };
    } else {
      return currentProductId ? state.products.find(p => p.id === currentProductId) : null;
    }
  }
);

export const getProductsState = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
)

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
      currentProductId: action.currentProductId
    };
  }),
  on(ProductActions.initCurrentProduct, (state): ProductState => {
    return {
      ...state,
      currentProductId: 0
    }
  }),
  on(ProductActions.clearCurrentProduct, (state): ProductState =>{
    return {
      ...state,
      currentProductId: null
    }
  }),
  on(ProductActions.loadProductSuccess, (state, action): ProductState => {
    return {
      ...state,
      products: action.products,
      error: ''
    }
  }),
  on(ProductActions.loadProductFail, (state, action): ProductState => {
    return {
      ...state,
      products: [],
      error: action.error
    }
  }),
  on(ProductActions.updateProductSuccess, (state, action):ProductState => {
    const updatedProducts = state.products.map(item => action.product.id === item.id ? action.product : item);
    return {
      ...state,
      products: updatedProducts,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductActions.updateProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),  
  on(ProductActions.createProductSuccess, (state, action): ProductState => {
    const newProductList = state.products.concat(action.product);
    return {
      ...state,
      products: newProductList,
      currentProductId: action.product.id,
      error: ''
    }
  }),
  on(ProductActions.createProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(ProductActions.deleteProductSuccess, (state, action): ProductState => {
    const newProductList = state.products.filter(product => product.id !== action.productId);
    return {
      ...state,
      products: newProductList,
      currentProductId: action.productId,
      error: ''
    }
  }),
  on(ProductActions.deleteProductFail, (state, action): ProductState => {
    return {
      ...state,
      error: action.error
    }
  })
);