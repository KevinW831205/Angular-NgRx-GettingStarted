import { createReducer, on, createAction, createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { User } from '../user';
import { createSerializationCheckMetaReducer } from '@ngrx/store/src/runtime_checks';

export interface State extends AppState.State {
  user: User;
}

export interface UserState {
  maskUserName: boolean;
  currentUser: User;
}

const initialState: UserState = {
  maskUserName: true,
  currentUser: null
}

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getMaskUserName = createSelector(
  getUserFeatureState,
  state => state.maskUserName
);

export const getCurrentUser = createSelector(
  getUserFeatureState,
  state => state.currentUser
)

export const userReducer = createReducer(
  initialState,
  on(createAction('[User] toggle maskName'), (state): UserState => {
    return {
      ...state,
      maskUserName: !state.maskUserName
    };
  })
)