import { useState, useEffect, useRef } from 'react';


export const useFetch = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect( () => {

        setState({ data: null, loading: true, error: null });

        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                setState({
                    loading: false,
                    error: null,
                    data
                });
            })
            .catch( (error) => {
                setState({
                    data: null,
                    loading: false,
                    error: error
                })
            })

    },[url])

    return state;
}
