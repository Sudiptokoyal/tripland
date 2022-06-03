import * as actionTypes from '../actionTypes'

export const initialState = {
    airports: [],
    favAirPorts: [],
    loading: false,
    error: '',
    source: '',
    destination: '',
}

const airportReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_AIRPOTRS:
            return { ...state, loading: true };

        case actionTypes.SET_AIRPOTRS:
            return { 
                ...state, 
                airports: action.data.map(e => ({...e, label: e.city_name })), 
                error: '' };

        case actionTypes.SET_FAV_AIRPOTRS:
            return { ...state, favAirPorts: action.data, error: '' };

        case actionTypes.SET_AIRPOTRS_ERROR:
            return { ...state, error: action.data || 'Something went wrong' };

        default:
            return state;
    }
}

export default airportReducer;