import React from 'react'
import {Row,Col,Modal} from "react-bootstrap";
import './delete.css'
const DeleteModel = ({show,close}) => {
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
            <h3>Delete Positions</h3>
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

export default DeleteModel