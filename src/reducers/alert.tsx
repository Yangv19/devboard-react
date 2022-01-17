import * as constants from "../types/actions";
import { Alerts } from "../types/reducers";

const initialState: Alerts[] = [];

export default function(state = initialState, action : constants.AlertActionTypes): Alerts[] {
    const { type, payload } = action;
    switch(type) {
        case constants.SET_ALERT:
            return [...state, payload];
        case constants.REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload.id);
        default:
            return state;
    };
};
