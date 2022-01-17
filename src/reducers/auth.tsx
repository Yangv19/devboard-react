import * as constants from "../types/actions";
import { Auth } from "../types/reducers";

const initialState : Auth = {
    isAuthenticated: false,
    user: null
};

export default function(state = initialState, action: constants.AuthActionTypes) : Auth {
    const { type, payload } = action;
    switch (type) {
        case constants.LOAD_USER:
            return {
                isAuthenticated: true,
                user: payload
            };
        case constants.RESET_AUTH:
            return initialState;
        default:
            return state;
    };
};
