import axios from "axios";
import * as constants from "../types/actions";
import errors from "./errors";
import { setAlert } from "./alert";
import { AddComment } from "../types/forms";

export const addComment = (postId : string, formData : AddComment) : constants.AppThunk => async dispatch => {
    try {
        await axios.post(`/api/posts/comments/${postId}`, formData);
        dispatch(setAlert("Comment added", "success"));
        dispatch(getComments(postId));
    } catch (err) {
        dispatch(errors(err));
    };
};

export const deleteComment = (postId : string, commentId : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
        dispatch(setAlert("Comment removed", "success"));
        dispatch(getComments(postId));
    } catch (err) {
        dispatch(errors(err));
    };
};

export const getComments = (postId : string) : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.get(`/api/posts/comments/${postId}`);
        dispatch({
            type: constants.SET_COMMENTS,
            payload: res.data
        });
    } catch (err) {
        dispatch(errors(err));
    };
}
