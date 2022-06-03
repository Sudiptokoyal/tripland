import * as actionTypes from '../actionTypes';

export const setUser = (data) => {
    return { type: actionTypes.SET_USER, data }
}

export const resetUser = () => {
    return { type: actionTypes.RESET_USER }
}

