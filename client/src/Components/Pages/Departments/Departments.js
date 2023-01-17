import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Modal, Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications'
import ViewListIcon from '@mui/icons-material/ViewList';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Table from './TableView/Table';
import { get } from 'jquery';
import { useContext } from 'react';
import {Context} from '../../../Context/Context'

const Departments = () => {
  const [getdata, setData] = useState([])
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = '/departments/adddepartment'

  const [departmentname, setdepartmentname] = useState('')
  const [description, setDescription] = useState('')
  const{user} = useContext(Context);
  console.log(user)

  const departments = async () => {
    try {
      const res = await axios.get(`/company/${user.company}`);
      const data = res.data.company.departments;
      console.log("departments", data)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }


  const handleChange = (event, nextView) => {
    setView(!view);
    setView(nextView);
    setView(!view)
    // setlist(nextView)
    console.log(nextView)
  };


  const postData = async (e) => {
    e.preventDefault();
    try {

      const save = await axios.post(url, {
        departmentname: departmentname,
        description:description,
        company:user && user.company 
      })
      console.log("dep", departmentname)
      save && NotificationManager.success("Successfully Added")
      window.location.replace('/departments')

    } catch (error) {
      console.log(error)
      NotificationManager.error("Failed to add department")
    }
  }

  useEffect(() => {
    departments();
  }, [])
  return (

    <>
      <div className="content-wrapper my-2 " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Departments</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Departments</li>
                </ul>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }} onClick={handleShow}>
                    <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      data-bs-target="#add_calendar"
                    >
                      <i
                        className="fa fa-plus"
                        style={{ fontSize: "14px", marginRight: "2px" }}
                      >
                        {" "}
                      </i>
                      Add Department
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className='mb-3' style={{ display: "flex", justifyContent: "flex-end", marginRight:"70px" }}>
          <div>
            <ToggleButtonGroup
              orientation="horizontal"
              value={view}
              exclusive
              onChange={handleChange}
            >

              <ToggleButton value="module" aria-label="module" selected={!view}>
                <ViewModuleIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list" selected={view}>
                <ViewListIcon />
              </ToggleButton>

            </ToggleButtonGroup>
          </div>
        </div>
        <section className="content">
          <div className="container">
            <div className="card">
              <div
                className="card-header  buttoncolor"

              >
                <h3 className="card-title" style={{ color: "white" }}>
                  Departments
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: 500, width: "100%" }}>

                    {view ? <Table data={getdata}></Table> :

                    <Container>
                      <Row>
                        {
                          getdata.map((d, i) => {
                            return (<>
                              <Col xs="12" xl="3" lg="4" md="6" sm="6">
                                <Card>
                                  <Card.Title className="id">Department</Card.Title>
                                  <Card.Body>
                                    <Card.Text>{d.departmentname}</Card.Text>
                                    {/* <div className='d-flex justify-content-center align-items-center'><p className="px-2 text-center buttoncolor rounded" style={{ width: '70%' }}>Add Employee</p></div> */}
                                  </Card.Body>
                                </Card>
                              </Col>
                            </>)
                          })
                        }
                      </Row>
                    </Container>
}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
      <NotificationContainer />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postData}>
            <Form.Label>Department Name</Form.Label>
            <Form.Control type='text' required onChange={(e) => { setdepartmentname(e.target.value) }}></Form.Control>
            <br />
            <Form.Label>Description</Form.Label>
            <textarea class="form-control" required onChange={(e) => { setDescription(e.target.value) }}></textarea>
            <div className='mt-2 d-flex align-items-center justify-content-center'>
              <Button type='submit'>Submit</Button>
            </div>
          </Form>

        </Modal.Body>
      </Modal>

    </>
  )
}

export default Departments