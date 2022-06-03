import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const setAirports = () => {
    return (dispatch) => {
        const url = `https://629497a963b5d108c18ecfb5.mockapi.io/airport`;
        return axios.get(url)
            .then((res) => {
                if(res?.data && res.data.length) {
                    dispatch({type: actionTypes.SET_AIRPOTRS, data: res.data});
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


