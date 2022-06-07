import * as actionTypes from '../actionTypes';
import { where, query, db, collection, getDocs } from '../../firebase';

export const setUser = (data) => {
    return { type: actionTypes.SET_USER, data }
}

export const resetUser = () => {
    return { type: actionTypes.RESET_USER }
}

export const getUserDetails = (uid) => {
    return async (dispatch) => {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        dispatch(setUser({name: data?.name}));
    }
}