import { ActionReducerMap } from "@ngrx/store";
import { userReducer, UserReducerState } from "./components/reactive-form/state/reactive-form.reducer";



export interface AppState{
    users : UserReducerState
}

export const AppState: ActionReducerMap<AppState> = {
    users : userReducer
}