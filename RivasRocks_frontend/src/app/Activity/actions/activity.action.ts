import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { ActivityDTO } from '../models/activity.dto';
import { UserXActivityDTO } from 'src/app/Shared/Models/userXactivity.dto';
import { UserDTO } from 'src/app/User/models/user.dto';

export const getActivitiesByUserId = createAction(
  '[ActivitiesList Page] Get activities list',
  props<{ userId: string }>()
);
export const getActivitiesByUserIdSuccess = createAction(
  '[ActivitiesList Page] Get activities list Success',
  props<{ activities: ActivityDTO[] }>()
);

export const getActivitiesByUserIdFailure = createAction(
  '[ActivitiesList Page] Get activities list Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const addUser = createAction(
  '[ActivitiesList Page] Add user to the activity',
  props<{ userxactivity: UserXActivityDTO}>()
);
export const addUserSuccess = createAction(
  '[ActivitiesList Page] Add user to the activity Success',
  props<{ userxactivity: UserXActivityDTO }>()
);

export const addUserFailure = createAction(
  '[ActivitiesList Page] Add user to the activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const removeUser = createAction(
  '[ActivitiesList Page] Remove user to the activity',
  props<{ userxactivity: UserXActivityDTO }>()
);
export const removeUserSuccess = createAction(
  '[ActivitiesList Page] Remove user to the activity Success',
  props<{ userxactivity: UserXActivityDTO }>()
);

export const removeUserFailure = createAction(
  '[ActivitiesList Page] Remove user to the activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const deleteActivity = createAction(
  '[ActivitiesList Page] Delete activity',
  props<{ activityId: string }>()
);
export const deleteActivitySuccess = createAction(
  '[ActivitiesList Page] Delete activity Success',
  props<{ activityId: string }>()
);

export const deleteActivityFailure = createAction(
  '[ActivitiesList Page] Delete activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getActivityById = createAction(
  '[activityForm Page] Get activity',
  props<{ activityId: string }>()
);
export const getActivityByIdSuccess = createAction(
  '[activityForm Page] Get activity Success',
  props<{ activity: ActivityDTO }>()
);

export const getActivityByIdFailure = createAction(
  '[activityForm Page] Get activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const createActivity = createAction(
  '[activityForm Page] Create activity',
  props<{ activity: ActivityDTO }>()
);
export const createActivitySuccess = createAction(
  '[activityForm Page] Create activity Success',
  props<{ activity: ActivityDTO }>()
);

export const createActivityFailure = createAction(
  '[activityForm Page] Create activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const updateActivity = createAction(
  '[activityForm Page] Update activity',
  props<{ activityId: string; activity: ActivityDTO }>()
);
export const updateActivitySuccess = createAction(
  '[activityForm Page] Update activity Success',
  props<{ activityId: string; activity: ActivityDTO }>()
);

export const updateActivityFailure = createAction(
  '[activityForm Page] Update activity Failure',
  props<{ payload: HttpErrorResponse }>()
);

export const getActivities = createAction(
  '[Home Page] Get activities list');
export const getActivitiesSuccess = createAction(
  '[Home Page] Get activities list Success',
  props<{ activities: ActivityDTO[] }>()
);

export const getActivitiesFailure = createAction(
  '[Home Page] Get activities list Failure',
  props<{ payload: HttpErrorResponse }>()
);

// export const getActivitiesByIds = createAction(
//   '[Home Page] Get activities list by ids',
//   props<{ activity_ids: number[] }>()
// );

// export const getActivitiesByIdsSuccess = createAction(
//   '[Home Page] Get activities list by ids Success',
//   props<{ activities: ActivityDTO[] }>()
// );

// export const getActivitiesByIdsFailure = createAction(
//   '[Home Page] Get activities list by ids Failure',
//   props<{ payload: HttpErrorResponse }>()
// );
