import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as UserActions from '../actions';
import { UserService } from '../services/user.service';

@Injectable()
export class UserEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService
  ) {
    this.responseOK = false;
  }

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.register),
      exhaustMap(({ user }) =>
        this.userService.register(user).pipe(
          map((user) => {
            return UserActions.registerSuccess({ user: user });
          }),
          catchError((error) => {
            return of(UserActions.registerFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'registerFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              console.log('Register success');
              alert('Te has registrado correctamente');
              this.router.navigateByUrl('home');
            }
          })
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  registerFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.registerFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          alert(this.errorResponse.message);
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      exhaustMap(({ userId, user }) =>
        this.userService.updateUser(userId, user).pipe(
          map((user) => {
            return UserActions.updateUserSuccess({
              userId: userId,
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.updateUserFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'profileFeedback',
              this.responseOK,
              this.errorResponse
            );
          })
        )
      )
    )
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.updateUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUserById),
      exhaustMap(({ userId }) =>
        this.userService.getUserById(userId).pipe(
          map((user) => {
            return UserActions.getUserByIdSuccess({
              userId: userId,
              user: user,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUserByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getUserByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUserByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUsersById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsersById),
      exhaustMap(({ userIds }) =>
        this.userService.getUsersById(userIds).pipe(
          map((users) => {
            return UserActions.getUsersByIdSuccess({
              users: users,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUsersByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getUsersByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUsersByIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getUsersByActivityId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.getUsersByActivityId),
      exhaustMap(({ activityId }) =>
        this.userService.getUsersByActivityId(activityId).pipe(
          map((users) => {
            return UserActions.getUsersByActivityIdSuccess({
              users: users,
            });
          }),
          catchError((error) => {
            return of(UserActions.getUsersByActivityIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getUsersByActivityIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUsersByActivityIdSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  getUsersByActivityIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UserActions.getUsersByActivityIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );
}
