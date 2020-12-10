import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CurrentUserInterface } from '../../../shared/types/currentUser.interface';
import { AuthService } from '../../services/auth.service';
import { registerAction, registerFailureAction, registerSuccessAction } from '../actions';

/*
https://stackoverflow.com/questions/57247613/ngrx-effects-type-observableunknown-is-not-assignable-to-type-observable
Quick version
comment out createEffect(() =>,
fix errors that your IDE (VSCode) flags up,
add createEffect(() => back in.
*/

@Injectable()
export class RegisterEffect {
  constructor(private actions$: Actions
    ,         private authService: AuthService) { }
  currentUser$ = createEffect(() =>
    // a(): void {
    this.actions$.pipe(
      ofType(registerAction),
      switchMap(({ request }) => {
        return this.authService.register(request)
          .pipe(
            map((currentUser) => {
              return registerSuccessAction({ currentUser });
            }),
            catchError(() => {
              return of(registerFailureAction());
            })
          );
      })
    )
  );
}
