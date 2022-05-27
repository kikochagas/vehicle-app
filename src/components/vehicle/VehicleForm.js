import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { types } from '../../helpers/types.js'
import {useForm} from '../../hooks/useForm/useForm.js'
import { getAllModelsApi } from '../../actions/vehicleModelActions';
import { useDispatch, useSelector } from 'react-redux'

export const VehicleForm = ({action = types.add, vehicle={}, handleSubmitVehicle}) => {
  const [models, setModels] = useState([])
  const dispatch = useDispatch();
  dispatch(getAllModelsApi())
  const state = useSelector(state => state)
  useEffect(() => {
    if(state?.vehicleModel?.values){
      setModels(state?.vehicleModel?.values?.data)
    }
  }, [state])


let initialForm = {
  vin: '',
  deliveryDate: '',
  modelId: ''
};
if(action === types.update){
  initialForm = {
    ...vehicle,
    deliveryDate: vehicle.deliveryDate.split('T')[0]
  }
}

const [ {vin, deliveryDate, modelId}, handleInputChange, reset ] = useForm( initialForm );
console.log(deliveryDate.split('T')[0])
const handleSubmit = (e) =>{
  //e.preventDefault();
  if(vin.trim().length <= 1 || deliveryDate.trim().length <= 1 || modelId.trim().length <= 1){
      return;
  }
  handleSubmitVehicle({...vehicle, vin, deliveryDate, modelId});
  reset();
}
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>VIN</Form.Label>
          <Form.Control
            type='text'
            placeholder="VIN"
            required
            name='vin'
            value={vin}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Model</Form.Label>
          <Form.Control 
            as="select"
            required
            name='modelId'
            value={modelId}
            onChange={handleInputChange}
          >
            <option value=''>Select...</option>
            {
              models?.map(model =>
                <option value={model.id}>{model.name}</option>)

            }
          </Form.Control>
        </Form.Group>
        <Form.Label>Delivery Date</Form.Label>
        <Form.Group controlId="deliveryDate">
              <Form.Control
                type="date"
                name="deliveryDate"
                value={deliveryDate}
                onChange={handleInputChange}
              />
            </Form.Group>
        
        <Button variant='success' type='submit'>
          {action === types.add ? 'Add New Vehicle' : 'Edit Vehicle'}
        </Button>
    </Form>
  )
}
