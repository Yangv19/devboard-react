import axios from "axios";
import * as constants from "../types/actions";
import errors from "./errors";
import { setAlert } from "./alert";
import { RegisterForm, LoginForm } from "../types/forms";

export const logout = () : constants.AppThunk => async dispatch => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    dispatch({type: constants.RESET_AUTH});
};

export const loadUser = () : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.get("/api/users");
        dispatch({
            type: constants.LOAD_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch(errors(err));
    };
};

export const register = (formData : RegisterForm) : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.post("/api/users/register", formData);
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["x-auth-token"] = localStorage.token;
        dispatch(loadUser());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const login = (formData : LoginForm) : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.post("/api/users/login", formData);
        localStorage.setItem("token", res.data.token);
        axios.defaults.headers.common["x-auth-token"] = localStorage.token;
        dispatch(loadUser());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const updateAccount = (img : any) : constants.AppThunk => async dispatch => {
    try {
        const formData : FormData = new FormData();
        formData.append("img", img);
        await axios.patch("/api/users", formData);
        dispatch(setAlert("Image Added", "success"));
        dispatch(loadUser());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const deleteAccount = () : constants.AppThunk => async dispatch => {
    try {
        await axios.delete("/api/users");
        dispatch(setAlert("Account deleted", "danger"));
        dispatch(logout());
    } catch (err) {
        dispatch(errors(err));
    };
};
