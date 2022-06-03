import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const setFlights = () => {
    return (dispatch) => {
        const url = `https://629497a963b5d108c18ecfb5.mockapi.io/flight`;
        return axios.get(url)
            .then((res) => {
                if(res?.data && res.data.length) {
                    dispatch({type: actionTypes.SET_FLIGHTS, data: res.data});
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


