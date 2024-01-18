import { Action, createReducer, on } from '@ngrx/store';
import {
  createActivity,
  createActivityFailure,
  createActivitySuccess,
  deleteActivity,
  deleteActivityFailure,
  deleteActivitySuccess,
  getActivityById,
  getActivityByIdFailure,
  getActivityByIdSuccess,
  getActivities,
  getActivitiesByUserId,
  getActivitiesByUserIdFailure,
  getActivitiesByUserIdSuccess,
  getActivitiesFailure,
  getActivitiesSuccess,
  addUser,
  addUserFailure,
  addUserSuccess,
  removeUser,
  removeUserFailure,
  removeUserSuccess,
  updateActivity,
  updateActivityFailure,
  updateActivitySuccess,
} from '../actions';
import { ActivityDTO } from '../models/activity.dto';
import { UserXActivityDTO } from 'src/app/Shared/Models/userXactivity.dto';
import { UserDTO } from 'src/app/User/models/user.dto';

export interface ActivitiesState {
  activities: ActivityDTO[];
  activity: ActivityDTO;
  userxactivity: UserXActivityDTO;
  users: UserDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: ActivitiesState = {
  activities: new Array<ActivityDTO>(),
  activity: new ActivityDTO('', '', '', '',new Date(), new Date()),
  users: new Array<UserDTO>(),
  userxactivity: new UserXActivityDTO('', ''),
  loading: false,
  loaded: false,
  error: null,
};

const _activitiesReducer = createReducer(
  initialState,
  on(getActivitiesByUserId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getActivitiesByUserIdSuccess, (state, action) => ({
    ...state,
    activities: action.activities,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getActivitiesByUserIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(deleteActivity, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(deleteActivitySuccess, (state, { activityId }) => ({
    ...state,
    activities: [...state.activities.filter((activity) => activity.id !== activityId)],
    loading: false,
    loaded: true,
    error: null,
  })),
  on(deleteActivityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getActivityById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getActivityByIdSuccess, (state, action) => ({
    ...state,
    activity: action.activity,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getActivityByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(createActivity, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(createActivitySuccess, (state, action) => ({
    ...state,
    activity: action.activity,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(createActivityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateActivity, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateActivitySuccess, (state, action) => ({
    ...state,
    activity: action.activity,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateActivityFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getActivities, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getActivitiesSuccess, (state, action) => ({
    ...state,
    activities: action.activities,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getActivitiesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(addUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(addUserSuccess, (state, action) => ({
    ...state,
    userxactivity: action.userxactivity,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(addUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(removeUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(removeUserSuccess, (state, action) => ({
    ...state,
    userxactivity: action.userxactivity,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(removeUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  // on(getActivitiesByIds, (state) => ({
  //   ...state,
  //   loading: true,
  //   loaded: false,
  //   error: null,
  // })),
  on(getActivitiesSuccess, (state, action) => ({
    ...state,
    activities: action.activities,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getActivitiesFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  }))

);


export function activitiesReducer(
  state: ActivitiesState | undefined,
  action: Action
): ActivitiesState {
  return _activitiesReducer(state, action);
}
