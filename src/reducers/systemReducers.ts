import { SYSTEM_ACTIONS } from '../actions/actionTypes';

const INITIAL_STATE: any = {
    token: "",

};

export default function (
    state = INITIAL_STATE,
    action: any,
) {
    switch (action.type) {
        case SYSTEM_ACTIONS.SET_TOKEN:
            return {
                ...state,
                token: action.payload as string,
            };
                default:
            return state;
    }
}
