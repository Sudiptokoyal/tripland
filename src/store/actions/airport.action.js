import * as actionTypes from '../actionTypes';
import { db, collection, getDocs } from '../../firebase'


export const setAirports = () => {
    return async (dispatch) => {
        const airportsRef = collection(db, 'airports');
        const docSnap = await getDocs(airportsRef);
        let airports = [];
        docSnap.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            airports.push(doc.data());
        });

        if(airports.length) dispatch({type: actionTypes.SET_AIRPOTRS, data: airports});

    }
}



