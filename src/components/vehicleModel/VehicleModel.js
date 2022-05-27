import React from 'react'

export const VehicleModel = ({model, handleDelete, handleEdit}) => {
  return (
       <>
       <td>{model.id}</td>
				<td>{model.name}</td>
        <td>
          <a onClick={()=>handleEdit(model)}  className="edit pointer"  data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
          <a onClick={()=> handleDelete(model.id)}  className="delete pointer" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>
       </>
  )
}