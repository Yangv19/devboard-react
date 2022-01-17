import { setAlert } from "./alert";
import { logout } from "./auth";
import * as constants from "../types/actions";

const errors = (err : any) : constants.AppThunk => async dispatch => {
    if (!err.response || !err.response.data || !err.response.data.errors) {
        console.error(err);
        return;
    };

    const errors = err.response.data.errors;

    if (errors && errors[0].msg === "Token is not valid") {
        dispatch(setAlert("Session expired", "danger"));
        dispatch(logout());
        return;
    };

    errors.forEach((error : any) => dispatch(setAlert(error.msg, "danger")));
};

export default errors;
