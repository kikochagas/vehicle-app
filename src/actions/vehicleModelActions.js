import { REACT_APP_API } from "../helpers/Api_url"
import { addModel, deleteModel, updateModel } from "../reducers/vehicleModelSlice";
const URL = REACT_APP_API+'Model';

export const addModelApi = (name) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        })
            .then( resp => resp.json() )
            .then( data => {
                dispatch(addModel(data));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

export const updateModelApi = (model) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...model })
        })
            .then()
            .then( () => {
                dispatch(updateModel(model));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}
export const deleteModelApi = (id) => {
    return (dispatch) => {
            
        fetch(URL+'/'+id, {method: 'DELETE'})
            .then()
            .then( () => {
                dispatch(deleteModel(id));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}