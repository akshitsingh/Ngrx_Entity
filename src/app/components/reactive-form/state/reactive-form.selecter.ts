 import { UserReducerState, userAdapter } from './reactive-form.reducer';
import { AppState } from './../../../appstate';
import { createFeatureSelector, createSelector } from "@ngrx/store";
 
export const getUserState = createFeatureSelector<UserReducerState>('users');

export const userSelector = userAdapter.getSelectors();

export const getAllUsers = createSelector(getUserState,userSelector.selectAll);

export const getUserDetail = createSelector(getUserState,(state,props)=>{
    return state.users.find(element=> element.id==props.id)
})

export const getUserLoading = createSelector(getUserState,(state:UserReducerState)=>{
     return state.loading;
})

export const getUserLoaded = createSelector(getUserState,(state:UserReducerState)=>{
     return state.loaded;
})

export const getUserError = createSelector(getUserState,(state:UserReducerState)=>{
     return state.error;
})

export const selectUserEntities = createSelector(
     getUserState,
     userSelector.selectEntities
   );

   export const selectCurrentUserId = createSelector(
     getUserState,
     userSelector.selectIds
   );

// export const selectCurrentUser = createSelector(
//      selectUserEntities,
//      selectCurrentUserId,
//      (userEntities, id) => userEntities[id]
//    );



// export const getUserState = createFeatureSelector<UserReducerState>('users');

// export const getAllUsers = createSelector(getUserState,(state:UserReducerState)=>{
//      return state.users;
// })








