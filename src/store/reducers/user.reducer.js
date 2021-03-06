import * as actionTypes from '../actionTypes'

export const initialState = {
    name: '',
    uid: '',
    email: '',
    isLoggedIn: false,
    bookings: []
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER: 
            return {...state, ...action.data};
        case actionTypes.RESET_USER: 
            return initialState;
        default:
            return state;
    }
}

export default userReducer;