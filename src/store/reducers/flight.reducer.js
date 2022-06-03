import * as actionTypes from '../actionTypes'

export const initialState = {
    flights: [],
    loading: false,
    error: '',
}

const flightReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOAD_FLIGHTS:
            return { ...state, loading: true };

        case actionTypes.SET_FLIGHTS:
            return { 
                ...state, 
                flights: action.data,
                loading: false,
                error: action?.error || '' };

        default:
            return state;
    }
}

export default flightReducer;