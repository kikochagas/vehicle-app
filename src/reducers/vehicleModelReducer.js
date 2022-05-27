import { types } from "../helpers/types";
export const vehicleModelReducer = (state = {}, action) => {
    switch (action.type) {
        case types.getAll:
            return {
                values : action.payload.values
            }
        case types.add:
            return action.payload;

        case types.delete:
            return action.payload;

        case types.update:
            return action.payload;
    
        default:
           return state;
    }
}