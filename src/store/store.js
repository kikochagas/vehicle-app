import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import { vehicleModelReducer } from "../reducers/vehicleModelReducer";
import { vehicleReducer } from "../reducers/vehicleReducer";


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const reducers = combineReducers({
    vehicleModel: vehicleModelReducer,
    vehicle: vehicleReducer
})
export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
)