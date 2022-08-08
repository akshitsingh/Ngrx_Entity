import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { userReducer, UserReducerState } from "./store/reactive-form.reducer";



export interface AppState{
    users : UserReducerState,
    router : RouterReducerState
}

export const AppState: ActionReducerMap<AppState> = {
    users : userReducer,
    router : routerReducer
}