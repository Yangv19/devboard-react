import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import{ Alerts, RootState } from "./reducers";

export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export const LOAD_USER = "LOAD_USER";
export const RESET_AUTH = "RESET_AUTH"

export const SET_POSTS = "SET_POSTS";
export const SET_POST = "SET_POST";
export const POST_ERROR = "POST_ERROR";
export const RESET_POST = "RESET_POST";

export const SET_COMMENTS = "SET_COMMENTS";

export type AppThunk = ThunkAction<void, RootState, object, Action<string>>;

export interface AlertActionTypes {
    type: typeof SET_ALERT | typeof REMOVE_ALERT,
    payload: Alerts
};

export interface AuthActionTypes {
    type: typeof LOAD_USER | typeof RESET_AUTH,
    payload: object
};

export interface PostActionTypes {
    type: typeof SET_POSTS | typeof SET_POST | typeof POST_ERROR | typeof RESET_POST,
    payload: object[]
};

export interface CommentActionTypes {
    type: typeof SET_COMMENTS,
    payload: object[]
}
