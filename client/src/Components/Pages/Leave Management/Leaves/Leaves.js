import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Card, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NotificationContainer,NotificationManager } from "react-notifications";
import './leaves.css'
import { useContext } from "react";
import {Context} from '../../../../Context/Context'
const Leaves = () => {
  const {user,} = useContext(Context)
  const [show, setShow] = useState(false);
  const [showdescription, setShowdescription] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datamodal, setmodaldata] = useState({});
  const [leaves, setLeaves] = useState([]);
  const champ = JSON.parse(localStorage.getItem("companydata"));
  const [data,setdata] = useState({
    leaveType:"",
    company: user && user.company,
    description:"",
    owner:champ.owner._id,
    LeaveStatus:""
  })
  const [update,setUpdate] = useState(false)
  const url = "/leaves";

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      const dd = res.data.getLeave;
      console.log("data", dd);
      setLeaves(dd);
    } catch (error) {
      console.log(error);
    }
  };
  const handleInput = (e) =>{
  e.preventDefault();
  let name,value;
  name = e.target.name;
  value = e.target.value;
  setdata({...data,[name]:value})

  }
  const postdata = async(e) =>{
    e.preventDefault();
    try{
          const leavetype = await  axios.post('/leaves/addleaves',data);
          leavetype && NotificationManager.success("Successfully Added ");
          setUpdate(!update);
          handleClose();
    }catch(error){
       console.log(error);
       NotificationManager.error("Failed to Add")
    }
  }
  useEffect(() => {
    fetchData();
   
  }, [update]);
  return (
    <>
      <div className="content-wrapper " style={{ backgroundColor: "#f7f7f7" }}>
        <section className="content-header ">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Leaves</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Leaves</li>
                </ul>
                <div className="col-auto float-end ms-auto">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <a
                      className="btn add-btn "
                      data-bs-toggle="modal"
                      onClick={handleShow}
                    >
                      <i
                        className="fa fa-plus"
                        style={{ fontSize: "14px", marginRight: "2px" }}
                      >
                        {" "}
                      </i>
                      Add Leave Types
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div
                className="card-header buttoncolor "
               
              >
                <h3 className="card-title" style={{ color: "white" }}>
                  Leave Types
                </h3>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <div style={{ height: 550, width: "100%" }}>
             
                    <Container>
                      <Row>
                        {leaves.map((d, i) => {
                          return (
                            <Col xs="12" xl="3" lg="4" md="6" sm="6" key={i}>
                              <Card onClick={()=>{ setmodaldata(d);
                                    handleShow();}}>
                                <Card.Title className="id">Leave Type</Card.Title>
                                <Card.Body>
                                  <Card.Text>{d.leaveType}</Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                      </Row>
                    </Container>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <NotificationContainer/>
      </div>
      <Modal show={showdescription} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Leave Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-justify">{datamodal.description}</div>
        </Modal.Body>
      </Modal>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title><h4>Sagacious Systems</h4> </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form onSubmit={(e)=>{postdata(e)}}>
          <Container>
            <Row>
              <Col>
                 <Form.Label>Leave Type</Form.Label>
                 <Form.Control type='text' name="leaveType" value={data.leaveType} required onChange={(e)=>{handleInput(e)}}>

                 </Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label >Description</Form.Label>
                <Form.Control type="text" name="description" value={data.description} onChange={(e)=>{handleInput(e)}}></Form.Control>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label >Status</Form.Label>
                <Form.Select type="text" required name="LeaveStatus" value={data.LeaveStatus} onChange={(e)=>{handleInput(e)}}>
                  <option selected hidden value={""}>Please Select</option>
                  <option value={"LWP (Leave with pay)"}>LWP (Leave with pay)</option>
                  <option value={"LWOP (Leave Without Pay)"}>LWOP (Leave Without Pay)</option>
                </Form.Select>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-3">
               <Button type="submit">Submit</Button>
            </div>
          </Container>
         </Form>
         
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Leaves;
