import * as constants from "../types/actions";
import { Comment } from "../types/reducers";

const initialState : Comment = {
    comments: [],
    loadedComments: false
};

export default function(state = initialState, action: constants.CommentActionTypes) : Comment {
    const { type, payload } = action;
    switch(type) {
        case constants.SET_COMMENTS:
            return {
                comments: payload,
                loadedComments: true
            }
        default:
            return state;
    }
}
