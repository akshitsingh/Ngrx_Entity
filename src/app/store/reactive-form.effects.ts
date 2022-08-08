import { userListErrorAction, userListRequestAction, userListSuccessAction, UserUpdateSuccessAction, UserUpdateAction, userErrorAction, UserAddAction, UserAddSuccessAction, UserDeleteAction, UserDeleteSuccessAction } from './reactive-form.action';
import { ApiService } from '../services/api.service';
import { Injectable } from '@angular/core';
import { Actions,createEffect, Effect } from '@ngrx/effects';
import { ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';

  
 
@Injectable()
export class ReactiveFormEffects {


    constructor(private actions$: Actions,private api : ApiService) {}

    /**Load all users */
    loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userListRequestAction),
      switchMap(() => this.api.getAllUsers().pipe(
        map((users) => userListSuccessAction({users : users}),
        catchError(() => of(userListErrorAction()))
      ))
    )
  )
    )

  /**Add new user effect */
   addUserEffect$ = createEffect(() =>
   this.actions$.pipe(
     ofType(UserAddAction),
     switchMap((action) => this.api.addNewUser(action.user).pipe(
       map((data:User) => UserAddSuccessAction({user: data })),
       catchError(() => of(userErrorAction()))
     ))
   )
 );

  /**Update user effect */
  updateUserEffect$ = createEffect(() =>
  this.actions$.pipe(
    ofType(UserUpdateAction),
    switchMap((action) => this.api.updateUser(action.update).pipe(
      map((data:User) => UserUpdateSuccessAction({update: action.update })),
      catchError(() => of(userErrorAction()))
    ))
  )
);

/**Delete user effects */
 deleteUserEffect$ = createEffect(() =>
 this.actions$.pipe(
   ofType(UserDeleteAction),
   switchMap((action) => this.api.deleteUser(action.id).pipe(
     map(() => UserDeleteSuccessAction({ id : action.id })),
     catchError(() => of(userErrorAction()))
   ))
 )
);


}