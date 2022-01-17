import * as constants from "../types/actions";
import { Post } from "../types/reducers";

const initialState : Post = {
    posts: [],
    post: null,
    loadedPosts: false,
    loadedPost: false
};

export default function(state = initialState, action: constants.PostActionTypes) : Post {
    const { type, payload } = action;
    switch(type) {
        case constants.SET_POSTS:
            return {
                ...state,
                posts: payload,
                loadedPosts: true
            };
        case constants.SET_POST:
            return {
                ...state,
                post: payload,
                loadedPost: true
            };
        case constants.POST_ERROR:
            return {
                ...state,
                post: null,
                loadedPost: true
            };
        case constants.RESET_POST:
            return initialState;
        default:
            return state;
    };
};
