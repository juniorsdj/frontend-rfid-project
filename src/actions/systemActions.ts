import { setBearerToken } from "../shared/AxiosApi";
import { goToIndex } from "../shared/FnUtils";
import { SYSTEM_ACTIONS } from './actionTypes'

import Cookie from '../lib/js-cookie';
import { CookieTokenKey } from '../constants';

export const login = (data: any) => {
    return async (dispatch: any) => {
        const { token } = data
        goToIndex();
        setBearerToken(token);
        dispatch(setToken(token));


    };
}


export const setToken = (token: string) => {
    return (dispatch: any) => {
        Cookie.set(CookieTokenKey, token, {
            expires: 365,
        });
        dispatch({
            type: SYSTEM_ACTIONS.SET_TOKEN,
            payload: token,
        });
    };
};



export const checkToken = () => {
    return async (dispatch: any) => {
        const token: any = Cookie.get(CookieTokenKey);

        if (!token) {
            return dispatch({
                type: SYSTEM_ACTIONS.SET_TOKEN,
                payload: null,
            });
        }

        try {
            setBearerToken(token);

            dispatch({
                type: SYSTEM_ACTIONS.SET_TOKEN,
                payload: token,
            });
        }
        catch (err) {
            const er: Error = err;
            console.log(er.message);
            dispatch({
                type: SYSTEM_ACTIONS.SET_TOKEN,
                payload: null,
            });
        }
    };
};