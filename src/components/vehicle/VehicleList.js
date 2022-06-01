import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addVehicleApi, deleteVehicleApi, updateVehicleApi } from '../../actions/vehicleActions';
import { Button, Modal } from 'react-bootstrap';
import { types } from '../../helpers/types';
import { Pagination } from '../ui/Pagination';
import { Vehicle } from './Vehicle';
import { VehicleForm } from './VehicleForm';
import {fetchVehicles} from '../../reducers/vehicleSlice';
export const VehicleList = () => {
  const [vehicleObj, setVehicleObj] = useState({})
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [action, setAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const {value:vehicles, loading, error} = useSelector((state) => state.vehicle)
  useEffect(() => {
      dispatch(fetchVehicles());
  }, [dispatch])

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = vehicles?.slice(indexOfFirst, indexOfLast);
  const totalPagesNum = Math.ceil(vehicles?.length / itemsPerPage);
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
    handleCloseModal();
  }

  const handleDelete = (id) =>{
    dispatch(deleteVehicleApi(id));

  }

  const handleEdit = (vehicle) =>{
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
