import { configureStore } from "@reduxjs/toolkit"
import vehicleModelReducer from '../reducers/vehicleModelSlice'
import vehicleReducer from '../reducers/vehicleSlice'

export const store = configureStore({
    reducer:{
        vehicleModel: vehicleModelReducer,
        vehicle: vehicleReducer
    }
})