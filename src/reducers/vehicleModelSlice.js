import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { REACT_APP_API } from "../helpers/Api_url";
const URL = REACT_APP_API+'Model';
const initialState = {
    value: [],
    loading: false,
    error: null
  }
  export const fetchModels = createAsyncThunk('models/fetchModels', async (state) => {
    const resp = await fetch(URL)
    .then(data => data.json())
        return resp
    
    })

    
  
export const vehicleModelSlice = createSlice({
    name: "vehicleModel",
    initialState,
    reducers: {
        addModel: (state, action) => {
          state.value.push(action.payload)
        },
        deleteModel: (state, action) => {
          state.value = state.value.filter(model => model.id !== action.payload)
        },
        updateModel: (state, action) => {
          state.value.map(model => {
            if(model.id === action.payload.id){
              model.name = action.payload.name;
            }
          })
        },
    },
    extraReducers: {
      [fetchModels.pending]: (state) => {
        state.loading = true
      },
      [fetchModels.fulfilled]: (state, payload) => {
        state.loading = false
        state.value = payload.payload
        state.error = null
      },
      [fetchModels.rejected]: (state, payload) => {
        state.loading = false
        state.value = []
        state.error = payload
      },
    },
})


export const {addModel, deleteModel, updateModel} = vehicleModelSlice.actions




export default vehicleModelSlice.reducer