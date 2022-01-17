import axios from "axios";
import * as constants from "../types/actions";
import errors from "./errors";
import { setAlert } from "./alert";
import { AddPost } from "../types/forms";

export const getPosts = () : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.get("/api/posts");
        dispatch({
            type: constants.SET_POSTS,
            payload: res.data
        });
    } catch(err) {
        dispatch(errors(err));
    };
};

export const addPost = (formData : AddPost) : constants.AppThunk => async dispatch => {
    try {
        await axios.post("/api/posts", formData);
        dispatch(setAlert("Post Created", "success"));
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const deletePost = (id : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`);
        dispatch(setAlert("Post Removed", "success"));
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const getPost = (id : string) : constants.AppThunk => async dispatch => {
    try {
        const res : any = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: constants.SET_POST,
            payload: res.data
        });
    } catch (err) {
        dispatch(errors(err));
        dispatch({
            type: constants.POST_ERROR
        });
    }
}

export const resetPost = () : constants.AppThunk => dispatch => {
    dispatch({
        type: constants.RESET_POST
    });
};

export const addLike = (postId : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.patch(`/api/posts/likes/${postId}`);
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const removeLike = (postId : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.delete(`/api/posts/likes/${postId}`);
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const addDislike = (postId : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.patch(`/api/posts/dislikes/${postId}`);
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};

export const removeDislike = (postId : string) : constants.AppThunk => async dispatch => {
    try {
        await axios.delete(`/api/posts/dislikes/${postId}`);
        dispatch(getPosts());
    } catch (err) {
        dispatch(errors(err));
    };
};
