import { createReducer, on, createAction } from '@ngrx/store';

export const userReducer = createReducer(
    { maskName: false },
    on(createAction('[User] toggle maskName'), state => {
        return {
            ...state,
            maskName: !state.maskName
        };
    })

)