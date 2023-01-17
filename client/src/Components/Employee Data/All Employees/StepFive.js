import React, { useState } from "react";
// import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import {
  Modal,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
  Button,
} from "react-bootstrap";
// import validator from "validator";
import Card from "react-bootstrap/Card";
// creating functional component ans getting props from app.js and destucturing them
const StepFive = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [dep, setDep] = useState([]);
  const url2 = "/departments";
  let name, value;
    const handleinput = (e) => {
      console.log(e);
      name = e.target.name;
      value = e.target.value;
      setEmp({ ...emp, [name]: value });
    };


    const [emp, setEmp] = useState({
          profilepic: "",
          firstname: "",
          lastname: "",
          dob: "",
          cnic: "",
          gender: "",
          martialStatus: "",
          religion: "",
          jobtitle: "",
          username: "",
          primaryemail: "",
          secondaryemail: "",
          password: "",
          primaryphone: "",
          secondaryphone: "",
          permanentaddress: "",
          temporaryaddress: "",
          province: "",
          city: "",
          postalCode: "",
          departments: "",
          designation: "",
          joiningdate: "",
          educationdetails: "",
          employementhistory: "",
      
          currentSalary: "",
          employementstatus: "",
          //bank information
          bankname: "",
          paymentmode: "",
          accounttitle: "",
          accountno: "",
          IBAN: "",
          branchcode: "",
          country: "",
          //degree info
        });
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to next step
    if (
      validator.isEmpty(values.username) ||
      validator.isEmpty(values.password) ||
      validator.isEmpty(values.joiningdate) ||
      validator.isEmpty(values.salary) ||
      validator.isEmpty(values.designation) ||
      validator.isEmpty(values.paymentmode) ||
      validator.isEmpty(values.employementstatus)
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };
  console.log("values",values)
  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
            <h3>Employement Details </h3>
            <hr></hr>

            <Row>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="username"
                    placeholder="username"
                    // defaultValue={emp.username}
                    defaultValue={values.username}
                    onChange={handleFormData("username")}
                    // value={props.value21}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required
                    name="password"
                    placeholder="password"
                    // defaultValue={emp.password}
                    defaultValue={values.password}
                    onChange={handleFormData("password")}
                    // value={props.value22}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridFirstName"
                  className="formmargin"
                >
                  <Form.Label>Joining Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    name="joiningdate"
                    placeholder="joining date"
                    // defaultValue={emp.joiningdate}
                    defaultValue={values.joiningdate}
                    onChange={handleFormData("joiningdate")}
                    // value={props.value19}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="Number"
                    required
                    name="currentSalary"
                    placeholder="salary"
                    // defaultValue={emp.currentSalary}
                    defaultValue={values.salary}
                    onChange={handleFormData("salary")}
                    // value={props.value23}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="designation"
                    placeholder="designation.."
                    // defaultValue={emp.terminationreason}
                    defaultValue={values.designation}
                    onChange={handleFormData("designation")}
                    // value={props.value20}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridFirstName"
                  className="formmargin"
                >
                  <Form.Label>Payment Mode</Form.Label>
                  <Form.Select
                    required
                    name="paymentmode"
                    // defaultValue={emp.paymentmode}
                    defaultValue={values.paymentmode}
                    onChange={handleFormData("paymentmode")}
                    // value={props.value25}
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    //   disabled={disableFields}
                  >
                    <option value="" selected hidden disabled>
                      Please Select
                    </option>
                    <option>Cheque</option>
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* <Col lg={4}>
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Department</Form.Label>
                  <Form.Select name="departments">
                    onChange={handleinput} */}
                    {/* onChange={props.onChange} */}
                    {/* <option disabled selected defaultValue={""}>
                      Select department..
                    </option>
                    {dep.map((d) => {
                    return (
                      <>
                        <option key={d._id} value={d._id}>
                          {d.departmentname}
                        </option>
                      </>
                    );
                  })}
                  </Form.Select>
                </Form.Group>
               </Col> */}
              <Col xl="4">
                <Form.Group
                  as={Col}
                  controlId="formGriddepartments"
                  className="formmargin"
                >
                  <Form.Label>Employement Status</Form.Label>
                  <Form.Select
                    //   onChange={handleinput}
                    // onChange={props.onChange}
                    name="employementstatus"
                    // defaultValue={emp.employementstatus}
                    defaultValue={values.employementstatus}
                    onChange={handleFormData("employementstatus")}
                    // value={props.value41}
                  >
                    <option defaultValue={""} disbaled selected hidden>
                      Select Please
                    </option>
                    <option>Intern</option>
                    <option>Probation</option>
                    <option>Permanent</option>
                    <option>Left</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div style={{ display: "flex" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <Button
                variant="primary"
                type="submit"
                style={{ marginLeft: "2%" }}
              >
                Next
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default StepFive;
