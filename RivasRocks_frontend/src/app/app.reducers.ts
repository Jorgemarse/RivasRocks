import { ActionReducerMap } from '@ngrx/store';
import { AuthEffects } from './Auth/effects/auth.effects';
import * as AuthReducer from './Auth/reducers';
import { PostsEffects } from './Post/effects';
import * as PostsReducer from './Post/reducers';
import { UserEffects } from './User/effects/user.effects';
import * as UserReducer from './User/reducers';
import { ActivitiesEffects } from './Activity/effects';
import * as ActivitiesReducer from './Activity/reducers';


export interface AppState {
  auth: AuthReducer.AuthState;
  user: UserReducer.UserState;
  posts: PostsReducer.PostsState;
  activities: ActivitiesReducer.ActivitiesState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: AuthReducer.authReducer,
  user: UserReducer.userReducer,
  posts: PostsReducer.postsReducer,
  activities: ActivitiesReducer.activitiesReducer,
};

export const EffectsArray: any[] = [
  AuthEffects,
  UserEffects,
  PostsEffects,
  ActivitiesEffects,
];
