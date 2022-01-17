import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import post from "./post";
import comment from "./comment"

export default combineReducers({
    alert,
    auth,
    post,
    comment
});
