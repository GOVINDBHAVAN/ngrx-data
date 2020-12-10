import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../../shared/types/appState.interface';
import { AuthStateInterface } from '../../shared/types/authState.interface';

export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(authFeatureSelector,
  state => state.isSubmitting);

