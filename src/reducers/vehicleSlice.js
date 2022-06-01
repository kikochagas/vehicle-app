import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_API } from "../helpers/Api_url";
const URL = REACT_APP_API+'Vehicle';
const initialState = {
    value: [],
    loading: false,
    error: null
  }
  export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (state) => {
    const resp = await fetch(URL)
    .then(data => data.json())
        return resp
    
    })

    
  
export const vehicleSlice = createSlice({
    name: "vehicle",
    initialState,
    reducers: {
        addVehicle: (state, action) => {
          state.value.push(action.payload)
        },
        deleteVehicle: (state, action) => {
          state.value = state.value.filter(vehicle => vehicle.requestId !== action.payload)
        },
        updateVehicle: (state, action) => {
          state.value.map(vehicle => {
            if(vehicle.requestId === action.payload.requestId){
              vehicle.vin = action.payload.vin;
              vehicle.deliveryDate = action.payload.deliveryDate;
              vehicle.modelId = action.payload.modelId;
              vehicle.model.id = action.payload.modelId;
              vehicle.model.name = action.payload.model.name
            }
          })
        },
    },
    extraReducers: {
      [fetchVehicles.pending]: (state) => {
        state.loading = true
      },
      [fetchVehicles.fulfilled]: (state, payload) => {
        state.loading = false
        state.value = payload.payload
        state.error = null
      },
      [fetchVehicles.rejected]: (state, payload) => {
        state.loading = false
        state.value = []
        state.error = payload
      },
    },
})


export const {addVehicle, deleteVehicle, updateVehicle} = vehicleSlice.actions




export default vehicleSlice.reducer