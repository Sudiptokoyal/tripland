import { combineReducers } from "redux";
import userReducer from './user.reducer';
import airportReducer from './airports.reducer'
import flightReducer from "./flight.reducer";

const rootReducer = combineReducers({
    user: userReducer,
    airport: airportReducer,
    flight: flightReducer
});
 
export default rootReducer;