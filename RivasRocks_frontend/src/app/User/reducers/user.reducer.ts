import { Action, createReducer, on } from '@ngrx/store';
import {
  getUserById,
  getUserByIdFailure,
  getUserByIdSuccess,
  getUsersById,
  getUsersByIdFailure,
  getUsersByIdSuccess,
  register,
  registerFailure,
  registerSuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
  getUsersByActivityId,
  getUsersByActivityIdFailure,
  getUsersByActivityIdSuccess,
} from '../actions';
import { UserDTO } from '../models/user.dto';

export interface UserState {
  user: UserDTO;
  users: UserDTO[];
  loading: boolean;
  loaded: boolean;
  error: any;
}

export const initialState: UserState = {
  user: new UserDTO('', '', '', new Date(), '', '', 0),
  users: new Array<UserDTO>(),
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(registerSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(registerFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(updateUser, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(updateUserSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(updateUserFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getUserById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUserByIdSuccess, (state, action) => ({
    ...state,
    user: action.user,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUserByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getUsersById, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUsersByIdSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUsersByIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
  on(getUsersByActivityId, (state) => ({
    ...state,
    loading: true,
    loaded: false,
    error: null,
  })),
  on(getUsersByActivityIdSuccess, (state, action) => ({
    ...state,
    users: action.users,
    loading: false,
    loaded: true,
    error: null,
  })),
  on(getUsersByActivityIdFailure, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: { payload },
  })),
);

export function userReducer(
  state: UserState | undefined,
  action: Action
): UserState {
  return _userReducer(state, action);
}
