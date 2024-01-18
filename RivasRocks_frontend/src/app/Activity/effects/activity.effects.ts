import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, finalize, map } from 'rxjs/operators';
import { SharedService } from 'src/app/Shared/Services/shared.service';
import * as ActivityActions from '../actions';
import { ActivityService } from '../services/activity.service';

@Injectable()
export class ActivitiesEffects {
  private responseOK: boolean;
  private errorResponse: any;

  constructor(
    private actions$: Actions,
    private ActivityService: ActivityService,
    private sharedService: SharedService,
    private router: Router
  ) {
    this.responseOK = false;
  }

  deleteActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.deleteActivity),
      exhaustMap(({ activityId }) =>
        this.ActivityService.deleteActivity(activityId).pipe(
          map(() => {
            return ActivityActions.deleteActivitySuccess({
              activityId: activityId,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.deleteActivityFailure({ payload: error }));
          })
        )
      )
    )
  );

  deleteActivityFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.deleteActivityFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getActivityById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.getActivityById),
      exhaustMap(({ activityId }) =>
        this.ActivityService.getActivityById(activityId).pipe(
          map((activity) => {
            return ActivityActions.getActivityByIdSuccess({
              activity: activity,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.getActivityByIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getActivityByIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.getActivityByIdFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  createActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.createActivity),
      exhaustMap(({ activity }) =>
        this.ActivityService.createActivity(activity).pipe(
          map((activity) => {
            return ActivityActions.createActivitySuccess({
              activity: activity,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.createActivityFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'activityFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('activities');
            }
          })
        )
      )
    )
  );

  createActivitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.createActivitySuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  createActivityFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.createActivityFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  updateActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.updateActivity),
      exhaustMap(({ activityId, activity }) =>
        this.ActivityService.updateActivity(activityId, activity).pipe(
          map((activity) => {
            return ActivityActions.updateActivitySuccess({
              activityId: activityId,
              activity: activity,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.updateActivityFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'activityFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              this.router.navigateByUrl('activities');
            }
          })
        )
      )
    )
  );

  updateActivitySuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.updateActivitySuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  updateActivityFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.updateActivityFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getActivities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.getActivities),
      exhaustMap(() =>
        this.ActivityService.getActivities().pipe(
          map((activities) => {
            return ActivityActions.getActivitiesSuccess({
              activities: activities,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.getActivitiesFailure({ payload: error }));
          })
        )
      )
    )
  );

  getActivitiesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.getActivitiesFailure),
        map((error) => {
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.addUser),
      exhaustMap(({ userxactivity }) =>
        this.ActivityService.addUser(userxactivity).pipe(
          map(() => {
            return ActivityActions.addUserSuccess({
              userxactivity: userxactivity,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.addUserFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'activityFeedback',
              this.responseOK,
              this.errorResponse
            );

          })
        )
      )
    )
  );

  addUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.addUserSuccess),
        map(() => {
          this.responseOK = true;
          alert('Te has inscrito en la actividad');
        })
      ),
    { dispatch: false }
  );

  addUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.addUserFailure),
        map((error) => {
          alert('Error al inscribirse en la actividad');
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  removeUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.removeUser),
      exhaustMap(({ userxactivity}) =>
        this.ActivityService.removeUser(userxactivity).pipe(
          map(() => {
            return ActivityActions.removeUserSuccess({
              userxactivity: userxactivity,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.removeUserFailure({ payload: error }));
          }),
          finalize(async () => {
            await this.sharedService.managementToast(
              'activityFeedback',
              this.responseOK,
              this.errorResponse
            );

            if (this.responseOK) {
              alert('Te has desinscrito de la actividad');
            }
          })
        )
      )
    )
  );

  removeUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.removeUserSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );

  removeUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.removeUserFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  getActivitiesByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActivityActions.getActivitiesByUserId),
      exhaustMap(({ userId }) =>
        this.ActivityService.getActivitiesByUserId(userId).pipe(
          map((activities) => {
            return ActivityActions.getActivitiesByUserIdSuccess({
              activities: activities,
            });
          }),
          catchError((error) => {
            return of(ActivityActions.getActivitiesByUserIdFailure({ payload: error }));
          })
        )
      )
    )
  );

  getActivitiesByUserIdSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.getActivitiesByUserIdSuccess),
        map(() => {
          this.responseOK = true;
        })
      ),
    { dispatch: false }
  );



  getActivitiesByUserIdFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ActivityActions.getActivitiesByUserIdFailure),
        map((error) => {
          this.responseOK = false;
          this.errorResponse = error.payload.error;
          this.sharedService.errorLog(error.payload.error);
        })
      ),
    { dispatch: false }
  );

  // getActivitiesByIds$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ActivityActions.getActivitiesByIds),
  //     exhaustMap(({ activity_ids }) =>
  //       this.ActivityService.getActivitiesByIds(activity_ids).pipe(
  //         map((activities) => {
  //           return ActivityActions.getActivitiesByIdsSuccess({
  //             activities: activities,
  //           });
  //         }),
  //         catchError((error) => {
  //           return of(ActivityActions.getActivitiesByIdsFailure({ payload: error }));
  //         })
  //       )
  //     )
  //   )
  // );

  // getActivitiesByIdsSuccess$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ActivityActions.getActivitiesByIdsSuccess),
  //       map(() => {
  //         this.responseOK = true;
  //       })
  //     ),
  //   { dispatch: false }
  // );

  // getActivitiesByIdsFailure$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(ActivityActions.getActivitiesByIdsFailure),
  //       map((error) => {
  //         this.responseOK = false;
  //         this.errorResponse = error.payload.error;
  //         this.sharedService.errorLog(error.payload.error);
  //       })
  //     ),
  //   { dispatch: false }
  // );
}