import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getAllVehiclesApi, addVehicleApi, deleteVehicleApi, updateVehicleApi } from '../../actions/vehicleActions';
import { Button, Modal } from 'react-bootstrap';
import { types } from '../../helpers/types';
import { Pagination } from '../ui/Pagination';
import { Vehicle } from './Vehicle';
import { VehicleForm } from './VehicleForm';
export const VehicleList = () => {
  const [vehicles, setVehicles] = useState([])
  const [vehicleObj, setVehicleObj] = useState({})
  const dispatch = useDispatch();
  dispatch(getAllVehiclesApi())
  const state = useSelector(state => state)
  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)

  useEffect(() => {
    if(state?.vehicle?.values){
      setVehicles(state?.vehicle?.values?.data)
    }

  }, [state])

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = vehicles?.slice(indexOfFirst, indexOfLast);
  const totalPagesNum = Math.ceil(vehicles?.length / itemsPerPage)

  const handleShowModal = (action) =>{
    setAction(action)
    return setShow(true);
  }
  const handleCloseModal = () =>{
    return setShow(false);
  }

  const handleSubmitVehicle = (vehicle) =>{
      if(action === types.add){
        dispatch(addVehicleApi(vehicle))
      }else{
        dispatch(updateVehicleApi(vehicle))
      }
     //console.log(vehicle)
    handleCloseModal();
  }

  const handleDelete = (id) =>{
    dispatch(deleteVehicleApi(id));
    //setVehicles(vehicles.filter(x=>x.requestId !== id))
    window.location.reload(false);

  }

  const handleEdit = (vehicle) =>{
     // console.log(vehicle)
      setVehicleObj(vehicle);
      handleShowModal(types.update)
  }

  return (
    <div className="container-xl">
	      <div className="table-responsive">
		        <div className="table-wrapper">
            <div className="table-title">
				      <div className="row">
					        <div className="col-sm-6">
						        <h2>Vehicle</h2>
					        </div>
					        <div className="col-sm-6">
						          <Button onClick={()=>handleShowModal(types.add)} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Vehicle</span></Button>					
					        </div>
				      </div>
			       </div>
             <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>VIN</th>
                    <th>Model</th>
                    <th>Delivery Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      currentItems?.map(vehicle=>(
                        <tr key={vehicle.requestId}>
                        <Vehicle
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          vehicle={vehicle}
                        />
                        </tr>
                      ))
                    }
                </tbody>
              </table>
              <Pagination 
                    pages={totalPagesNum} 
                    setCurrentPage={setCurrentPage} 
                    currentItems={currentItems}
                    totalItems={vehicles}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                    
              />
              <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                      {action === types.add ? 'Add Vehicle' : 'Edit Vehicle'}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VehicleForm 
                        action={action} 
                        handleSubmitVehicle={handleSubmitVehicle}
                        vehicle={vehicleObj}
                      />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleCloseModal} variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
              </Modal> 
            </div>
        </div>
    </div>
  )
}
