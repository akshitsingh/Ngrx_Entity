import { User } from '../models/user.model';
import {
  userListRequestAction,
  userListSuccessAction,
  userListErrorAction,
  UserAddAction,
  UserDeleteAction,
  UserUpdateSuccessAction,
  UserDeleteSuccessAction,
  userErrorAction,
} from './reactive-form.action';
import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';


export interface UserReducerState extends EntityState<User>{
    loading: boolean;
    loaded: boolean;
    error: boolean;
}

export const userAdapter = createEntityAdapter<User>({
  selectId:User => User.id,
  // sortComparer: sortBySeqNo,
});

export const initialState = userAdapter.getInitialState({
  loading: false,
  loaded: false,
  error: false
});

export const _userReducer = createReducer(
  initialState,
  on(userListRequestAction, (state) => ({ ...state, loading: true })),
  on(userListSuccessAction, (state,{users}): UserReducerState => {
    return userAdapter.addMany(users,state)
  }),
  on(userListErrorAction, (state) => {
    return { ...state, error: true, loading: false };
  }),
  on(UserAddAction, (state,action) => {
    return userAdapter.addOne(action.user,state)
  }),
  on(UserUpdateSuccessAction, (state,{update}) => {
    return userAdapter.updateOne(update,state)
  }),
  on(UserDeleteSuccessAction, (state, { id }) => {
    return userAdapter.removeOne(id,state)
  }),
  on(userErrorAction, (state,action):UserReducerState => {
    return {
      ...state,
      error : true
    };
  })
)

export function userReducer(state: any, action: Action) {
  return _userReducer(state, action);
}


 