import { REACT_APP_API } from "../helpers/Api_url"
import { types } from "../helpers/types"
import { useFetch } from "../hooks/useFetch/useFetch"
const URL = REACT_APP_API+'Model';
const getAll = (values) => {
    return {
        type: types.getAll,
        payload: {
            values: values
        }

    }
}

export const getAllModelsApi = () => {
    return (dispatch) => {
        const { data, error } = useFetch(URL);
        if(!error) {
            dispatch(getAll({data}));  
        }else{
            console.error(error);
        }
    }
}

const add = ({id, name}) => {
    return {
        type: types.add,
        payload: {
            id: id,
            name: name
        }
    }
}

export const addModelApi = (name) => {
    return (dispatch) => {
            
        fetch(URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
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

const update = ({id, name}) => {
    return {
        type: types.update,
        payload: {
            id: id,
            name: name
        }
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
                dispatch(update(model));
            })
            .catch( (error) => {
                console.error(error);
            })
    }
    
}

const deleteModel = (id) => {
    return {
        type: types.delete,
        payload: id
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