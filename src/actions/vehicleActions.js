import { REACT_APP_API } from "../helpers/Api_url"
import { addVehicle, deleteVehicle, updateVehicle } from "../reducers/vehicleSlice";
const URL = REACT_APP_API+'Vehicle';


export const addVehicleApi = ({vin, deliveryDate, modelId, model}) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vin: vin, deliveryDate: deliveryDate, modelId:modelId, model: model })
        })
            .then( resp => resp.json() )
            .then( data => {
                dispatch(addVehicle(data));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

export const updateVehicleApi = (vehicle) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...vehicle })
        })
            .then()
            .then( () => {
                dispatch(updateVehicle(vehicle));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

export const deleteVehicleApi = (id) => {
    return (dispatch) => {
            
        fetch(URL+'/'+id, {method: 'DELETE'})
            .then()
            .then( () => {
                dispatch(deleteVehicle(id));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}