import React from "react";
import pp from "../All Employees/avatar.png";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Row, Col, Modal, Form, Button } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./card.css";
import Table from "react-bootstrap/Table";

import ReactFlags from "react-flags-select";
import CountryDropdown from "country-dropdown-with-flags-for-react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
const Cards = ({ data }) => {
  const [update, setUpdate] = useState(true);
  const navigate = useNavigate();
  console.log("propsdata", data);
  const [firstname, setfirstname] = useState(data.firstname);
  const [lastname, setlastname] = useState(data.lastname);
  const [email, setemail] = useState(data.setemail);
  const [designation, setdesignation] = useState(data.designation);
  const [supervisor, setsupervisor] = useState([]);
  const [supervisors, setsupervisors] = useState([]);
  const [disableFields, setDisableFields] = useState(true);
  const [editEdu, setEditEdu] = useState(true);
  const PP = "http://locallhost:5001/images/";
  console.log("supervisors", supervisor);

  //modals states for education and employement history
  const Closechildmodal = () => setShowChildModel(false);
  const Closechildmodal1 = () => setShowChildModel1(false);
  const [childModel, setShowChildModel] = useState(false);
  const [childModel1, setShowChildModel1] = useState(false);
  const [testUpdate, setTestUpdate] = useState(false);
  const [ emp, setEmp] = useState({
    profilepic: data.profilepic,
    firstname: data.firstname,
    lastname: data.lastname,
    dob: data.dob,
    cnic: data.cnic,
    gender: data.gender,
    martialStatus: data.martialStatus,
    religion: data.religion,
    jobtitle: data.jobtitle,
    username: data.username,
    primaryemail: data.primaryemail,
    secondaryemail: data.secondaryemail,
    primaryphone: data.primaryphone,
    secondaryphone: data.secondaryphone,
    permanentaddress: data.permanentaddress,
    temporaryaddress: data.temporaryaddress,
    province: data.province,
    city: data.city,
    postalCode: data.postalCode,
    departments: data.departments,
    designation: data.designation,
    joiningdate: data.joiningdate,
    educationdetails: data.educationdetails,
    employementhistory: data.employementhistory,
    currentSalary: data.currentSalary,
    employementstatus: data.employeementstatus,
    //bank information
    bankname: data.bankname,
    paymentmode: data.paymentmode,
    accounttitle: data.accounttitle,
    accountno: data.accountno,
    IBAN: data.IBAN,
    branchcode: data.branchcode,
    country: data.country,
  });

  useEffect(() => {
    setEmp({
      profilepic: data.profilepic,
      firstname: data.firstname,
      lastname: data.lastname,
      dob: data.dob,
      cnic: data.cnic,
      gender: data.gender,
      martialStatus: data.martialStatus,
      religion: data.religion,
      jobtitle: data.jobtitle,
      username: data.username,
      primaryemail: data.primaryemail,
      secondaryemail: data.secondaryemail,
      primaryphone: data.primaryphone,
      secondaryphone: data.secondaryphone,
      permanentaddress: data.permanentaddress,
      temporaryaddress: data.temporaryaddress,
      province: data.province,
      city: data.city,
      postalCode: data.postalCode,
      departments: data.departments,
      designation: data.designation,
      joiningdate: data.joiningdate,
      educationdetails: data.educationdetails,
      employementhistory: data.employementhistory,
      currentSalary: data.currentSalary,
      employementstatus: data.employeementstatus,
      //bank information
      bankname: data.bankname,
      paymentmode: data.paymentmode,
      accounttitle: data.accounttitle,
      accountno: data.accountno,
      IBAN: data.IBAN,
      branchcode: data.branchcode,
      country: data.country,
    });
  }, [data]);

  const handleinput = (e) => {
    let name, value;

    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });
  };

  const handleCloseModal = () => setShow(false);

  const handleShow = () => {
    setShow(true);
  };

  const [show, setShow] = useState(false);
  const handleupdateform = {
    userId: data._id,
    firstname,
    lastname,
    email,
    designation,
    supervisors,

    //handle user input form data
  };

  console.log(handleupdateform);
  const handleSubmit = async (e) => {
    // e.preventDefault();
    const url = `${data._id}`;

    try {
      const updateUser = await axios
        .put(url, {
          profilepic: emp.profilepic,
          firstname: emp.firstname,
          lastname: emp.lastname,
          dob: emp.dob,
          cnic: emp.cnic,
          gender: emp.gender,
          martialStatus: emp.martialStatus,
          religion: emp.religion,
          jobtitle: emp.jobtitle,
          username: emp.username,
          primaryemail: emp.primaryemail,
          secondaryemail: emp.secondaryemail,
          primaryphone: emp.primaryphone,
          secondaryphone: emp.secondaryphone,
          permanentaddress: emp.permanentaddress,
          temporaryaddress: emp.temporaryaddress,
          province: emp.province,
          city: emp.city,
          currentSalary: emp.currentSalary,
          postalCode: emp.postalCode,
          departments: emp.departments,
          designation: emp.designation,
          joiningdate: emp.joiningdate,
          educationdetails: emp.educationdetails,
          employementhistory: emp.employementhistory,
          currentSalary: emp.currentSalary,
          employementstatus: emp.employementstatus,
          //bank information
          bankname: emp.bankname,
          paymentmode: emp.paymentmode,
          accounttitle: emp.accounttitle,
          accountno: emp.accountno,
          IBAN: emp.IBAN,
          branchcode: emp.branchcode,
          country: emp.country,
        })
        .then((user) => {
          console.log("updateUser", user.data.updateData);
          data.firstname = user.data.updateData.firstname;
          data.lastname = user.data.updateData.lastname;
          data.dob = user.data.updateData.dob;
          data.cnic = user.data.updateData.cnic;
          data.salary = user.data.updateData.salary;
          data.primaryemail = user.data.updateData.primaryemail;
          data.primaryphone = user.data.updatedData.primaryphone;
          data.secondaryemail = user.data.updateData.secondaryemail;
          data.secondaryphone = user.data.updateData.secondaryphone;
          data.martialStatus = user.data.updateData.martialStatus;
          data.designation = user.data.updateData.designation;
          data.supervisors = user.data.updateData.supervisors;
          data.currentSalary = user.data.updateData.currentSalary;
          data.IBAN = user.data.updateData.IBAN;
          data.temporaryaddress = user.data.updateData.temporaryaddress;
          data.secondaryaddress = user.data.updateData.secondaryaddress;
          data.bankname = user.data.updateData.bankname;
          data.bankbranchno = user.data.updateData.bankbranchno;
          data.country = user.data.updateData.country;
          data.educationdetails = user.data.updateData.educationdetails
        });

      updateUser && NotificationManager.success("Successfully Updated");

      handleCloseModal();

      // console.log({data})

      // const updateUser = await axios.put(url, handleupdateform);
      // NotificationManager.success("Successfully Updated");
      // handleCloseModal();
      // console.log("fistname",firstname)
      // // setUpdate(!update)
    } catch (error) {
      console.log(error);
      // NotificationManager.error("Failed to update");
    }
  };
  const departmentemployees = async () => {
    // setsupervisors(data.departments)
    try {
      const getdep = await axios
        .get("employeesofdepartments", {
          params: {
            departments: data.departments.map((d) => d._id),
          },
        })
        .then((d) => {
          console.log("then data", setsupervisor(d.data.employees));
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    departmentemployees();
  }, [data]);


  //educational details handler
  const [education, seteducation] = useState([]);
  const [employement, setemployement] = useState([]);
  const [empdetails, setempdetails] = useState({
    company: "",
    position: "",
    joiningdate: "",
    resignationdate: "",
    duration: "",
    jobdescription: "",
  });
  const [details, setdetails] = useState({
    degreetitle: "",
    institute: "",
    start: "",
    end: "",
    status: "",
  });
  const removeitem = (i) => {
    const temp = education;
    temp.splice(i, 1);
    console.log("splice", temp);
    seteducation(temp);
    setTestUpdate(!testUpdate);
  };
  const removemployement = (i) => {
    const temp = employement;
    employement.splice(i, 1);
    console.log("splice", temp);
    setemployement(temp);
    setTestUpdate(!testUpdate);
  };

  const addhistory = () => {
    var empl = employement;
    empl.push({
      company: empdetails.company,
      position: empdetails.position,
      joiningdate: empdetails.joiningdate,
      resignationdate: empdetails.resignationdate,
      duration: empdetails.duration,
      jobdescription: empdetails.jobdescription,
    });
    console.log("emplllllllll", empl);
    setemployement(empl);
    setEmp({ ...emp, employementhistory: empl });
  };
  const handleeducationdetails = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    await setdetails({
      ...details,
      [name]: value,
    });
  };
  const handleempinput = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    await setempdetails({
      ...empdetails,
      [name]: value,
    });
  };
  const addeducation = () => {
    var temp = education;
    temp.push({
      degreetitle: details.degreetitle,
      institute: details.institute,
      start: details.start,
      end: details.end,
      status: details.status,
    });
    seteducation(temp);
    setEmp({ ...emp, educationdetails: education });
  };
  const removeducation1 = (i) => {
    console.log("before splice",data.educationdetails)
    // const temp = data.educationdetails;
  
    data.educationdetails.splice(i,1);
    console.log("splice",data.educationdetails);
  
    setTestUpdate(!testUpdate);
  };
  const removemployement1 = (i) => {
    console.log("before splice",data.employementhistory)
    // const temp = data.employementhistory;
  
    data.employementhistory.splice(i,1);
    console.log("splice", data.employementhistory); 
  
    setTestUpdate(!testUpdate);
  };
  const handleempinputJoiningDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    console.log("change", empdetails);

    var a = moment(empdetails.resignationdate);
    var b = moment(e.target.value);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setempdetails({
      ...empdetails,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };

  const handleempinputResignationDate = async (e) => {
    let name, value;

    name = e.target.name;
    value = e.target.value;

    var a = moment(e.target.value);
    var b = moment(empdetails.joiningdate);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");

    console.log(years + " years " + months + " months " + days + " days");

    await setempdetails({
      ...empdetails,
      [name]: e.target.value,
      duration: `${years}  years  ${months}  months  ${days} days`,
    });
  };
  //history and educational details end
  const moment = require("moment");
  return (
    <>
      <div className="d-flex">
        <div style={{ marginLeft: "59vw", marginRight: 10 }}>
          <a
            className="btn buttoncolor "
            onClick={() => {
              setDisableFields(false);
            }}
          >
            Edit
          </a>
        </div>
        <div>
          <a
            className="btn buttoncolor "
            onClick={() => {
              handleSubmit();
              setDisableFields(true);
            }}
            // style={{opacity:"60%"}}
          >
            Save
          </a>
        </div>
      </div>
      <div className="container">
        <Container fluid>
          <Row>
            <div className="py-3">
              <h4>Employee Information</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            <Col sm={8}>
              <Row>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    className="formmargin"
                  >
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="firstname"
                      placeholder="First Name"
                      value={emp.firstname}
                      onChange={handleinput}
                      disabled={disableFields}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="lastname"
                      placeholder="Last Name"
                      value={emp.lastname}
                      onChange={handleinput}
                      disabled={disableFields}
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
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      required
                      name="gender"
                      placeholder="gender"
                      value={emp.gender}
                      onChange={handleinput}
                      disabled={disableFields}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridFirstName"
                    className="formmargin"
                  >
                    <Form.Label>National ID </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="cnic"
                      placeholder="national id no.."
                      value={emp.cnic}
                      onChange={handleinput}
                      disabled={disableFields}
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
                    <Form.Label>D-0-B</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={emp.dob}
                      onChange={handleinput}
                      disabled={disableFields}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Martial Status</Form.Label>
                    <Form.Select
                      required
                      name="martialStatus"
                      value={emp.martialStatus}
                      onChange={handleinput}
                      disabled={disableFields}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>widow</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    as={Col}
                    controlId="formGridLastName"
                    className="formmargin"
                  >
                    <Form.Label>Religion</Form.Label>
                    <Form.Select
                      required
                      name="religion"
                      placeholder="Religion"
                      value={emp.religion}
                      onChange={handleinput}
                      disabled={disableFields}
                    >
                      <option value="" selected hidden disabled>
                        Please Select
                      </option>
                      <option>Islam</option>
                      <option>Christianity</option>
                      <option>Buddhism</option>
                      <option> Sikhism</option>
                      <option> Hinduism</option>
                      <option>Bahá’í</option>
                      <option>Confucianism</option>
                      <option>Jainism</option>
                      <option>Judaism</option>
                      <option>Zoroastrianism</option>
                      <option>Druze</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col sm={4}>
              <div className="d-flex justify-content-center">
                {data.profilepic ? (
                  <img
                    src={PP + data.profilepic}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                ) : (
                  <img
                    src={pp}
                    alt="Admin"
                    className="rounded-circle"
                    width={150}
                  />
                )}
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <div className="py-3">
              <h4>Contact Details</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>

            <h5>Primary Details</h5>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="primaryemail"
                  placeholder="email..."
                  value={emp.primaryemail}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  required
                  name="primaryphone"
                  placeholder="mobile no"
                  value={emp.primaryphone}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <h5>Secondary Details</h5>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="secondaryemail"
                  placeholder="email..."
                  value={emp.secondaryemail}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="number"
                  required
                  name="secondaryphone"
                  placeholder="mobile no"
                  value={emp.secondaryphone}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>
          {/* <Row> */}
          <div>
            <h4>Address & Region</h4>
            <hr
              style={{
                fontWeight: "bold",
                borderWidth: "2px",
                border: "1px solid black",
              }}
            ></hr>
          </div>
          <Col lg={12}>
            <Form.Group
              as={Col}
              controlId="formGridFirstName"
              className="formmargin"
            >
              <Form.Label>Temporary Address</Form.Label>
              <Form.Control
                type="text"
                required
                name="temporaryaddress"
                placeholder="complete address"
                value={emp.temporaryaddress}
                onChange={handleinput}
                disabled={disableFields}
              />
            </Form.Group>
          </Col>

          <Col lg={12}>
            <Form.Group
              as={Col}
              controlId="formGridFirstName"
              className="formmargin"
            >
              <Form.Label>Permanent Address</Form.Label>
              <Form.Control
                type="text"
                required
                name="permanentaddress"
                placeholder="complete address"
                value={emp.permanentaddress}
                onChange={handleinput}
                disabled={disableFields}
              />
            </Form.Group>
          </Col>

          <Row>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="city"
                  placeholder="city"
                  value={emp.city}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="province"
                  placeholder="province"
                  value={emp.province}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Label>Country</Form.Label>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Control
                  name="country"
                  value={emp.country}
                  onChange={handleinput}
                  disabled={disableFields}
                  type="text"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col lg={4} xl={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="postalCode"
                  placeholder="postal code"
                  value={emp.postalCode}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Row>
              <div className="py-3">
                <h4>Education Information</h4>
                <hr
                  style={{
                    fontWeight: "bold",
                    borderWidth: "2px",
                    border: "1px solid black",
                  }}
                ></hr>
              </div>

              <div style={{ marginLeft: "59vw", marginRight: 10 }}>
                <a
                  className="btn buttoncolor "
                  onClick={() => {
                    setShowChildModel1(true);
                  }}
                >
                  Edit
                </a>
              </div>
            </Row>
            {data.educationdetails ? (
              <>
                <Row style={{ marginTop: "3%" }}>
                  <Col lg={12}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Institude</th>
                          <th>Degree</th>
                          <th>Start</th>
                          <th>End</th>
                          <th>Status</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {education &&
                          education.map((d, i) => {
                            return (
                              <tr>
                                <th>{i + 1}</th>
                                <td>{d.institute}</td>
                                <td>{d.degreetitle}</td>
                                <td>{d.start}</td>
                                <td>{d.end}</td>
                                <td>{d.status}</td>
                                <td>
                                  <i
                                    class="fa fa-trash-can"
                                    aria-hidden="true"
                                    style={{ color: "red" }}
                                    onClick={() => removeitem(i)}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                          { data.educationdetails &&
                            data.educationdetails.map((d, i) => {
                            return (
                              <tr>
                                <th>{i + 1}</th>
                                <td>{d.institute}</td>
                                <td>{d.degreetitle}</td>
                                <td>{d.start}</td>
                                <td>{d.end}</td>
                                <td>{d.status}</td>
                                <td>
                                  <i
                                    class="fa fa-trash-can"
                                    aria-hidden="true"
                                    style={{ color: "red" }}
                                    onClick={() => removeducation1(i)}
                                  ></i>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              </>
            ) : (
              "No Data Available"
            )}
          </Row>

          <Row>
            <div className="py-3">
              <h4>Previous Employment</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
            <div style={{ marginLeft: "59vw", marginRight: 10 }}>
              <a
                className="btn buttoncolor "
                onClick={() => {
                  setShowChildModel(true);
                }}
              >
                Edit
              </a>
            </div>
          </Row>
          <Row style={{ marginTop: "3%" }}>
            <Col lg={12}>
              <Table striped bordered hover >
                <thead>
                  <tr>
                    <th>#</th>
                    <th style={{ textAlign: "center" }}>Company</th>
                    <th style={{ textAlign: "center" }}>Position</th>
                    <th style={{ textAlign: "center" }}>start Date</th>
                    <th style={{ textAlign: "center" }}>Left Date</th>
                    <th style={{ textAlign: "center" }}>duration</th>
                    <th style={{ textAlign: "center" }}>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {employement &&
                    employement.map((d, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{d.company}</td>
                            <td>{d.position}</td>
                            <td>{d.joiningdate}</td>
                            <td>{d.resignationdate}</td>
                            <td>{d.duration}</td>
                            <td>
                              <i
                                class="fa fa-trash-can"
                                aria-hidden="true"
                                style={{ color: "red" }}
                                onClick={() => removemployement(i)}
                              ></i>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {data.employementhistory &&
                    data.employementhistory.map((d, i) => {
                      return (
                        <>
                          <tr key={i}>
                            <th>{i + 1}</th>
                            <td>{d.company}</td>
                            <td>{d.position}</td>
                            <td>{d.joiningdate}</td>
                            <td>{d.resignationdate}</td>
                            <td>{d.duration}</td>
                            <td>
                              <button style={{padding:'0px',border:"0px"}}>
                              <i
                                class="fa fa-trash-can"
                                aria-hidden="true"
                                style={{ color: "red" }}
                                onClick={() => removemployement1(i)}
                                
                              ></i>
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row>
            <div className="py-3">
              <h4>Employement Details</h4>
              <hr
                style={{
                  fontWeight: "bold",
                  borderWidth: "2px",
                  border: "1px solid black",
                }}
              ></hr>
            </div>
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
                  value={emp.username}
                  onChange={handleinput}
                  disabled={disableFields}
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
                  value={emp.joiningdate}
                  onChange={handleinput}
                  disabled={disableFields}
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
                  value={emp.currentSalary}
                  onChange={handleinput}
                  disabled={disableFields}
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
                  value={emp.designation}
                  onChange={handleinput}
                  disabled={disableFields}
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
                  value={emp.paymentmode}
                  onChange={handleinput}
                  disabled={disableFields}
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
            <Col lg={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Department</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="department"
                  placeholder="department.."
                  value={emp.departments}
                  onChange={handleinput}
                  disabled={disableFields}
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
                <Form.Label>Bank Name</Form.Label>
                <Form.Select
                  selected={emp.bankname}
                  required
                  name="bankname"
                  placeholder="bank name.."
                  value={emp.bankname}
                  onChange={handleinput}
                  disabled={disableFields}
                >
                  <option>Please Select</option>
                  <option>MCB Limited</option>
                  <option>Bank Islami Limited</option>
                  <option>Allied Bank Limited</option>
                  <option>Bank Al-Habib Limited</option>
                  <option>Faysal Bank Limited</option>
                  <option>Mezaan Bank Limited</option>
                  <option>National Bank of Pakistan</option>
                  <option>MCB Islamic Limited</option>
                  <option>HBL</option>
                  <option>UBL</option>
                  <option>Askari Bank </option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Account Title</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="accounttitle"
                  placeholder="account title.."
                  value={emp.accounttitle}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Account No</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="accountno"
                  placeholder="account no.."
                  value={emp.accountno}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="p-0">
            <Col xxl={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label> IBAN</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="IBAN"
                  placeholder="iban.."
                  value={emp.IBAN}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>

            <Col xxl={4}>
              <Form.Group
                as={Col}
                controlId="formGridLastName"
                className="formmargin"
              >
                <Form.Label>Branch code</Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="branchcode"
                  placeholder="branch code.."
                  value={emp.branchcode}
                  onChange={handleinput}
                  disabled={disableFields}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="my-3 d-flex justify-content-center">
            <Button>Add Employee</Button>
          </div>
        </Container>
        <NotificationContainer />
      </div>
      {/* ///educational details modal  */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={childModel1}
        onHide={Closechildmodal1}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            style={{ textAlign: "center" }}
          >
            <h5>Education Details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="mb-3">
              {/* <div className="py-3">
                    <h4>Education Information</h4>
                    <hr
                      style={{
                        fontWeight: "bold",
                        borderWidth: "2px",
                        border: "1px solid black",
                      }}
                    ></hr>
                  </div> */}

              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridLastName"
                  className="formmargin"
                >
                  <Form.Label>Institution</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="institute"
                    placeholder="institution.."
                    value={details.institute}
                    onChange={handleeducationdetails}
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
                  <Form.Label>Degree Title</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="degreetitle"
                    placeholder="degree.."
                    value={details.degreetitle}
                    onChange={handleeducationdetails}
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
                  <Form.Label>Start</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    name="start"
                    value={details.start}
                    onChange={handleeducationdetails}
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
                  <Form.Label>End</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    name="end"
                    value={details.end}
                    onChange={handleeducationdetails}
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
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    required
                    name="status"
                    placeholder="status"
                    value={details.status}
                    onChange={handleeducationdetails}
                    //   disabled={disableFields}
                  >
                    <option value="" selected hidden disabled>
                      Please Select
                    </option>
                    <option>Completed</option>
                    <option>In progress</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center my-3">
              <Button
                onClick={() => {
                  addeducation();
                  Closechildmodal1();
                }}
              >
                Add Education
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
      {/* //employement history modal */}
      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={childModel}
        onHide={Closechildmodal}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter "
            style={{ textAlign: "center" }}
          >
            <h5>Eployement Details</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <div className="py-3">
                <h4>Previous Employment</h4>
                <hr
                  style={{
                    fontWeight: "bold",
                    borderWidth: "2px",
                    border: "1px solid black",
                  }}
                ></hr>
              </div>

              <Col>
                <Form.Group
                  as={Col}
                  controlId="formGridempcompany"
                  className="formmargin"
                >
                  <Form.Label>Company</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="company"
                    placeholder="company name.."
                    value={empdetails.company}
                    onChange={handleempinput}
                    //   onChange={handleinput}
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
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    name="position"
                    placeholder="position.."
                    value={empdetails.position}
                    onChange={handleempinput}
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
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
                    value={empdetails.joiningdate}
                    onChange={async (e) => await handleempinputJoiningDate(e)}
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
                  <Form.Label>Resignation Date</Form.Label>
                  <Form.Control
                    type="date"
                    required
                    name="resignationdate"
                    placeholder="resignation date"
                    value={empdetails.resignationdate}
                    onChange={async (e) =>
                      await handleempinputResignationDate(e)
                    }
                    //   disabled={disableFields}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Form.Label>Job Description</Form.Label>
              <Form.Group
                as={Col}
                controlId="formGridFirstName"
                className="formmargin"
              >
                <Form.Control
                  as="textarea"
                  rows={"3"}
                  style={{ resize: "none" }}
                  required
                  name="jobdescription"
                  placeholder="Tell us about your job role & experience in previous company "
                  value={empdetails.jobdescription}
                  onChange={handleempinput}
                  //   disabled={disableFields}
                />
              </Form.Group>
            </Row>
            <div className="d-flex justify-content-center my-3">
              <Button
                onClick={() => {
                  addhistory();
                  Closechildmodal();
                }}
              >
                Add Employement
              </Button>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cards;
