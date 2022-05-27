import { REACT_APP_API } from "../helpers/Api_url"
import { types } from "../helpers/types"
import { useFetch } from "../hooks/useFetch/useFetch"
const URL = REACT_APP_API+'Vehicle';

const getAll = (values) => {
    return {
        type: types.getAll,
        payload: {
            values: values
        }

    }
}

export const getAllVehiclesApi = () => {
    return (dispatch) => {
        const { data, error } = useFetch(URL);
        if(!error) {
            console.log(data)
            dispatch(getAll({data}));  
        }else{
            console.error(error);
        }
    }
}

const add = (data) => {
    return {
        type: types.add,
        payload: data
    }
}

export const addVehicleApi = ({vin, deliveryDate, modelId}) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ vin: vin, deliveryDate: deliveryDate, modelId:modelId })
        })
            .then( resp => resp.json() )
            .then( data => {
                dispatch(add(data));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

const update = (data) => {
    return {
        type: types.update,
        payload: {...data}
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
                dispatch(update(vehicle));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

const deleteVehicle = (id) => {
    return {
        type: types.delete,
        payload: id
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