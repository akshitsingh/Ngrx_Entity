import { RouterReducerState } from "@ngrx/router-store";
import { createSelector } from "@ngrx/store";
import { AppState } from "../appstate";



export const getRouterState = (state:AppState ) => state.router;

export const getCurrentRouteState = createSelector(
  getRouterState,
  (state: RouterReducerState) => state.state
);
