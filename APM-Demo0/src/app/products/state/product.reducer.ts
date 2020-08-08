import { createReducer, on, createAction } from '@ngrx/store';

export interface ProductState {
  showProductCode: boolean
}

export const productReducer = createReducer(
  { showProductCode: true },
  on(createAction('[Product] Toggle Product Code'), state => {
    return {
      ...state,
      showProductCode: !state.showProductCode
    };
  })
);