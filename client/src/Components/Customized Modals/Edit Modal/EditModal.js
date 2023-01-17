import React from 'react'
import {Row,Col,Modal,Form} from "react-bootstrap";
import './edit.css'
const EditModal = ({show,close}) => {
  return (
    <>
        <Modal
        size="md"
        onHide={close}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        className="custom-modal"
      >
        <Modal.Body>
          <div class="form-header">
            <h3>Positions</h3>
            <p>Are you sure want to delete?</p>
          </div>
		  <div class="modal-btn delete-action">
									<Row>
										<Col xxl='6'>
											<a  className="btn btn-primary continue-btn">Delete</a>
										</Col>
										<Col xxl='6'>
											<a  className="btn btn-primary cancel-btn" onClick={close}>Cancel</a>
										</Col>
									</Row>
								</div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default EditModal