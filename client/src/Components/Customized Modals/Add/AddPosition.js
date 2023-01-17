import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Row, Col, Modal, Form, Button, Spinner, Alert } from "react-bootstrap";
import "./add.css";
import { Context } from "../../../Context/Context";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const AddPosition = ({ show, close, data }) => {
  const { companydata } = useContext(Context);
  const [shows, setShow] = useState(false);
  const [accordian, setaccordian] = useState(false);
  const [loading, setloading] = useState(false);
  const [update,setupdate] = useState(false);
  const [position, setposition] = useState({
    assignTo: companydata && companydata._id,
    position: "",
    owner: companydata && companydata.owner._id,
    department: "",
    employee: "",
  });

  const departments = [];
  data &&
    data.departments.map((d) => {
      departments.push({
        id: d._id,
        department: d.departmentname,
      });
    });
  console.log("departmentid", departments);
  const handleInput = (e) => {
    let name, value;
    name = e.target.name;
    value = e.target.value;
    setposition({ ...position, [name]: value });
    if (position.department.length === 0 && employees.length === 0) {
      return setShow(true);
    }
  };
  const handledepartment =
    companydata &&
    companydata.departments.filter((d) => {
      return d._id === position.department;
    });
  console.log("filtered department", handledepartment);
  const employees = [];
  handledepartment.forEach((d, i) => {
    d.employees.map((d, i) => {
      employees.push(d);
    });
  });
  console.log("selected employees", employees);
  console.log("handledepartment", companydata);
  const handleAccordian = () => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
      setaccordian(!accordian);
      console.log("settimeout called");
    }, 500);
  };

  //submit positions data;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postdata = await axios.post("/addposition", position);
      postdata && NotificationManager.success("Successfully Added");
    } catch (error) {
      console.log(error);
    }
  };
useEffect(()=>{},[update])
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
        <Modal.Header closeButton>
          <Modal.Title>Add Position</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {accordian && employees.length === 0 && (
            <Alert
              variant="primary"
              onClose={() => setShow(false)}
              dismissible
              show={shows}
              // className={position.department === "" ? "d-none" : accordian ? "d-none" : ""}
            >
              <p className="text-sm">
                No Employees in the Department.. You can add position to the
                department now without adding the employee
              </p>
            </Alert>
          )}
          <div class="modal-btn delete-action">
            <Row>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                  setupdate(!update)
                  setTimeout(() => {close()}, 300);
                }}
              >
                <Row>
                  <Col>
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      value={"Sagacious pvt.Ltd"}
                      disabled
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Label>Position Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="position"
                      value={position.position}
                      onChange={(e) => {
                        handleInput(e);
                      }}
                    ></Form.Control>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Label>Department</Form.Label>
                    <Form.Select
                      onChange={(e) => {
                        handleInput(e);
                      }}
                      name="department"
                      required
                    >
                      <option defaultValue={""} disabled selected hidden>
                        Please Select
                      </option>
                      {console.log("departmentsdata", departments)}
                      {departments &&
                        departments.map((d) => {
                          return (
                            <>
                              <option key={d.id} value={d.id}>
                                {d.department}
                              </option>
                            </>
                          );
                        })}
                    </Form.Select>
                  </Col>
                </Row>
                {loading && (
                  <div className="d-flex justify-content-center">
                    <Spinner
                      variant="primary"
                      animation="border"
                      aria-hidden="true"
                    />
                  </div>
                )}
                {accordian && employees.length > 0 && (
                  <>
                    <Row className="my-3">
                      <Col>
                        <div className="d-flex justify-content-between align-items-center">
                          <Form.Label name="employee">
                            Assign Position
                          </Form.Label>
                          <p
                            className="text-primary text-sm "
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              setaccordian(!accordian);
                            }}
                          >
                            Hide{" "}
                            <i className="fa-solid fa-chevron-up text-primary"></i>
                          </p>
                        </div>
                        <Form.Select
                          onChange={handleInput}
                          name="employee"
                          value={position.employee}
                        >
                          <option defaultValue={""} disabled selected hidden>
                            Please Select
                          </option>
                          {employees.map((d, i) => {
                            return (
                              <>
                                <option key={i} value={d._id}>
                                  {`${d.firstname} ${d.lastname} `}
                                </option>
                              </>
                            );
                          })}
                        </Form.Select>
                      </Col>
                    </Row>
                  </>
                )}

                <Row className="my-3">
                  <p
                    className={
                      accordian
                        ? "d-none"
                        : loading
                        ? "d-none"
                        : "text-primary text-sm"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={handleAccordian}
                  >
                    Do you want to assign a position to employee?
                  </p>
                </Row>

                <div className="d-flex justify-content-center">
                  <Button type="submit">Submit</Button>
                </div>
              </Form>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
      <NotificationContainer />
    
    </>
  );
};

export default AddPosition;
