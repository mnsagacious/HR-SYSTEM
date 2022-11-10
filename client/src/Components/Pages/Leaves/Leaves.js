import React, { useState } from "react";
import { useEffect } from "react";
import { Card, Container, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './leaves.css'
const Leaves = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [datamodal, setmodaldata] = useState({});
  const [leaves, setLeaves] = useState([]);
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
  useEffect(() => {
    fetchData();
  }, []);
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
                      data-bs-target="#add_calendar"
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
      </div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Leave Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-justify">{datamodal.description}</div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Leaves;
