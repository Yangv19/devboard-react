import * as constants from "../types/actions";
import { v4 } from "uuid";

export const setAlert = (msg : string, alertType : string, timeout : number = 2000) : constants.AppThunk => dispatch => {
    const id = v4();
    dispatch({
        type: constants.SET_ALERT,
        payload: {msg, alertType, id}
    });

    setTimeout(() => {dispatch({
                            type: constants.REMOVE_ALERT, 
                            payload: {msg, alertType, id}})}, timeout);
};
