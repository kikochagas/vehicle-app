import moment from 'moment'
import React from 'react'

export const Vehicle = ({vehicle, handleDelete, handleEdit}) => {
  return (
       <>
       <td>{vehicle.requestId}</td>
       <td>{vehicle.vin}</td>
       <td>{vehicle.model.name}</td>
       <td>{moment(vehicle.deliveryDate).format('LL')}</td>
        <td>
          <a onClick={()=>handleEdit(vehicle)}  className="edit pointer"  data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
          <a onClick={()=> handleDelete(vehicle.requestId)}  className="delete pointer" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
       </>
  )
}