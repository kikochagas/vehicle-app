import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { types } from '../../helpers/types.js'
import {useForm} from '../../hooks/useForm/useForm.js'
export const ModelForm = ({action = types.add, model={}, handleSubmitModel}) => {
  const initialForm = {
    name: (action === types.add) ? '' : model.name,
};
const [ {name}, handleInputChange, reset ] = useForm( initialForm );
const handleSubmit = (e) =>{
  //e.preventDefault();
  if(name.trim().length <= 1){
      return;
  }
  handleSubmitModel({...model, name});
  reset();
}
  return (
    <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder="Model Name"
            required
            name='name'
            value={name}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant='success' type='submit'>
          {action === types.add ? 'Add New Model' : 'Edit Model'}
        </Button>
    </Form>
  )
}
