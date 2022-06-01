import React, { useEffect, useState } from 'react'
import { VehicleModel } from './VehicleModel'
import { useSelector, useDispatch } from 'react-redux';
import { addModelApi, deleteModelApi, updateModelApi } from '../../actions/vehicleModelActions';
import { ModelForm } from './ModelForm';
import { Button, Modal } from 'react-bootstrap';
import { types } from '../../helpers/types';
import { Pagination } from '../ui/Pagination';
import {fetchModels} from '../../reducers/vehicleModelSlice';
export const VehicleModelList = () => {

  const [modelObj, setModelObj] = useState({})
  const dispatch = useDispatch();
 
  const [show, setShow] = useState(false);
  const [modalAction, setModalAction] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10)


  const {value:models, loading, error} = useSelector((state) => state.vehicleModel)
  useEffect(() => {
      dispatch(fetchModels())
  }, [dispatch])

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = models?.slice(indexOfFirst, indexOfLast);
  const totalPagesNum = Math.ceil(models?.length / itemsPerPage)

  const handleShowModal = (action) =>{
    setModalAction(action)
    return setShow(true);
  }
  const handleCloseModal = () =>{
    return setShow(false);
  }

  const handleSubmitModel = (model) =>{
      if(modalAction === types.add){
        dispatch(addModelApi(model.name))
      }else{
        dispatch(updateModelApi(model))
      }
    handleCloseModal();
  }

  const handleDelete = (id) =>{
    dispatch(deleteModelApi(id));
  }

  const handleEdit = (model) =>{
      setModelObj(model);
      handleShowModal(types.update)
  }

  return (
    <div className="container-xl">
	      <div className="table-responsive">
		        <div className="table-wrapper">
            <div className="table-title">
				      <div className="row">
					        <div className="col-sm-6">
						        <h2>Vehicle <b>Model</b></h2>
					        </div>
					        <div className="col-sm-6">
						          <Button onClick={()=>handleShowModal(types.add)} className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>Add New Model</span></Button>					
					        </div>
				      </div>
			       </div>
             <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Model Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                    {
                      currentItems?.map(model=>(
                        <tr key={model.id}>
                        <VehicleModel 
                          handleShowModel
                          handleCloseModel
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          model={model}
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
                    totalItems={models}
                    setItemsPerPage={setItemsPerPage}
                    itemsPerPage={itemsPerPage}
                    
              />
              <Modal show={show} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>
                      {modalAction === types.add ? 'Add Model' : 'Edit Model'}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ModelForm 
                        action={modalAction} 
                        handleSubmitModel={handleSubmitModel}
                        model={modelObj}
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
