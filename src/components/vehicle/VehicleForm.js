import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { types } from '../../helpers/types.js'
import {useForm} from '../../hooks/useForm/useForm.js'
import { useDispatch, useSelector } from 'react-redux'
import {fetchModels} from '../../reducers/vehicleModelSlice';
export const VehicleForm = ({action = types.add, vehicle={}, handleSubmitVehicle}) => {
  const dispatch = useDispatch();
  
  const {value:models, loading, error} = useSelector((state) => state.vehicleModel)
  useEffect(() => {
    if(models.length === 0) {
      dispatch(fetchModels())
    }
  }, [dispatch])


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
const handleSubmit = (e) =>{
  e.preventDefault();
  if(vin.trim().length <= 1 || deliveryDate.trim().length <= 1 || modelId.trim().length <= 1){
      return;
  }
  const name = models.find(x => x.id === modelId).name;
  handleSubmitVehicle({...vehicle, vin, deliveryDate, modelId, model:{id:modelId, name:name}});
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
                <option key={model.id} value={model.id}>{model.name}</option>)

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
