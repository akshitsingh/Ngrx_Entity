// import { User } from './../models/user.model';
import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import {
  USER_ADD,
  USER_DELETE,
  USER_DETAIL,
  USER_UPDATE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_ADD_SUCCESS,
  USER_UPDATE_SUCCESS,
  USER_DELETE_SUCCESS,
  USER_ERROR,
} from './reactive-form.type';

export const userListRequestAction = createAction(USER_LIST_REQUEST);

export const userListSuccessAction = createAction(
  USER_LIST_SUCCESS,
  props<{ users: User[] }>()
);

export const userListErrorAction = createAction(USER_LIST_ERROR);

export const UserDeleteAction = createAction(
  USER_DELETE,
  props<{ id: number }>()
);

export const UserDeleteSuccessAction = createAction(
  USER_DELETE_SUCCESS,
  props<{ id: number }>()
);

export const UserAddAction = createAction(
  USER_ADD,
  props<{ user: User }>()
  );

export const UserAddSuccessAction = createAction(
  USER_ADD, 
  props<{ user: User }>()
  );


export const UserAddsuccessAction = createAction(
  USER_ADD_SUCCESS,
  props<{ user: User }>()
);

export const UserUpdateAction = createAction(
  USER_UPDATE,
  props<{ update: Update<User> }>()
);

export const UserUpdateSuccessAction = createAction(
  USER_UPDATE_SUCCESS,
  props<{ update: Update<User> }>()
);

export const userErrorAction = createAction(
  USER_ERROR
)


