import { Action, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../../shared/types/authState.interface';
import { registerAction, registerFailureAction, registerSuccessAction } from './actions';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  currentUser: null,
  isLoggedIn: null,
  validationErrors: null
};

const authReduer = createReducer(initialState,
  on(registerAction, state => {
    return ({
      ...state,
      isSubmitting: true
    });
  }),
  on(registerSuccessAction, state => {
    return ({
      ...state,
      isSubmitting: false
    });
  }),
  on(registerFailureAction, state => {
    return ({
      ...state,
      isSubmitting: false
    });
  })
);

export function reducers(state: AuthStateInterface, action: Action) {
  return authReduer(state, action);
}
