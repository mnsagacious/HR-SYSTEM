import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Employee.css";
import pp from "./avatar.png";
import { useState } from "react";
import Card from "../Emp Card/EmpCard";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  Modal,
  Button,
  Form,
  Col,
  Row,
  Container,
  FormGroup,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TableView from "../TableView/Table";
import { useNavigate } from "react-router-dom";
import ReactFlags from "react-flags-select";
import { cities } from "./cities";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import EmployeeData from "./EmployeeData";
import { useContext } from "react";
import {Context} from '../../../Context/Context'
const moment = require("moment");

const AllEmployees = () => {
  let navigate = useNavigate();
  const url2 = "/departments";
  const url = "/employees";
  const url1 = "/auth/register";
  const [dep, setDep] = useState([]);
  const [datas, setData] = useState();
  const {user,company} = useContext(Context)
  console.log("user and company",user,company);
  // const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const Closechildmodal = () => setShowChildModel(false);
  const Closechildmodal1 = () => setShowChildModel1(false);
  const showChildModel = () => setShowChildModel(true);
  const showChildModel1 = () => setShowChildModel1(true);
  const handleShow = () => setShow(true);
  const [childModel, setShowChildModel] = useState(false);
  const [childModel1, setShowChildModel1] = useState(false);
  const [show, setShow] = useState(false);
  const [birth, setbirth] = useState("");
  const [testUpdate, setTestUpdate] = useState(false);
  const [list, setlist] = useState(false);
  //for profile pic
  const [file, setfile] = useState();
  //Employee Add
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
  //educaion details add and remove //
  const [education, seteducation] = useState([]);
  const [selected, setSelected] = useState("");
  const [country, setcountry] = useState("");
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

  let name, value;
  const handleinput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setEmp({ ...emp, [name]: value });
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

  //handle user input form data

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
  ///education & employement details code end;

  //list and grid view start
  const [view, setView] = useState(false);
  const handleChange = (event, nextView) => {
    setView(!view);
    setView(nextView);
    setView(!view);
    // setlist(nextView)
    console.log(nextView);
  };
  //   const handleChange = () => {
  //     setlist(!list)
  //   };
  //submitting values of user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      emp.profilepic = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
        NotificationManager.error("Pic not Uploaded");
      }
    }

    try {
      const res = await axios.post(url1, emp);
      console.log(res);
      res && NotificationManager.success("Sucessfully Added Employee");
      // res && window.location.replace("/employees");
    } catch (error) {
      console.log(error);
      NotificationManager.error("Something went wrong ");
    }
  };
  //fetching company data
  const[companies,setcompany] = useState({});
  const companydata = async() =>{
    
    try{
         const res = await axios.get(`/company/${user && user.company}`);
         const data = res.data;
         console.log("companydata",companydata);
         setcompany(data);
    }catch(error){
      console.log(error)
    }
  }
  
    console.log("companydata",companies && companies)
  
  //fetching employees data
  // const fetchData = async () => {
  //   try {
  //     const res = await axios.get(url);
  //     console.log(res.data);
  //     const data = res.data.employees;
  //     setData(data);
  //   } catch (error) {
  //     console.log(error);
  //     NotificationManager.error("Api Error 404");
  //   }
  // };
  //getting Employees
  // const getEmp = async () => {
  //   try {
  //     const res = await axios.get(url2);
  //     const datas = res.data.departments;
  //     console.log("departments", datas);
  //     setDep(datas);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
 
  
 
  useEffect(() => {
     companydata();
    // fetchData();
    // getEmp();
  }, []);
  const PF = "http://localhost:5002/images/";

  // let companydata =[];
  // user && user.companies.map((d)=>{
  //     companydata.push({
  //     employees:d.employees.map((d)=>d)
  //    })
  // })

  return (
    <>
      <div className="content-wrapper my-2" style={{ backgroundColor: "#f7f7f7" }}>
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Employee</h3>

                {/* <img
                            className="rounded-circle"
                            style={{ width: "130px", height: "130px"}}
                            src={require('C:/Users/Noman/Desktop/SERVER/client/src/Components/Employee Data/All Employees/HurAbbas.jpg')}
                            alt=""
                          /> */}

                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Employee</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <a
                  className="btn add-btn "
                  data-bs-toggle="modal"
                  data-bs-target="#add_employee"
                  // onClick={handleShow}
                >
                  <i
                    className="fa fa-plus"
                    style={{ fontSize: "14px", marginRight: "2px" }}
                  >
                    {" "}
                  </i>
                  <Link to="/employeeData">Add Employee</Link>
                </a>
              </div>

              <div
                className="mt-4"
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <div>
                  <ToggleButtonGroup
                    orientation="horizontal"
                    value={view}
                    exclusive
                    onChange={handleChange}
                  >
                    <ToggleButton
                      value="module"
                      aria-label="module"
                      selected={!view}
                    >
                      <ViewModuleIcon />
                    </ToggleButton>
                    <ToggleButton
                      value="list"
                      aria-label="list"
                      selected={view}
                    >
                      <ViewListIcon />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </div>
          </div>
          {/* /.container-fluid */}
        </section>
        {/* Main content */}
        <section className="content" style={{ paddingBottom: "70px" }}>
          <div className="container-fluid">
            <div
              className="row  gy-3  vertical-scrollable"
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {/* list and grid view */}

              {/* {view
                ? companydata && <TableView data={companydata.company && companydata.company} />
                : user &&
                  companydata.company.map((p, i) => {

              {view
                ? datas && <TableView data={datas} />
                : datas &&
                  datas.map((p, i) => {

                    return (
                      <div
                        className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                        key={i}
                      >
                        <div>
                          <Card data={p} />
                        </div>
                      </div>
                    );
                  })} */}
                    
                  {/* { 
                    companies.company && companies.company.employees.map((p, i) => {
                    
                      <div
                        className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                        key={i}
                      >
                        <div>
                          <Card data={p} />
                        </div>
                      </div>
                
                  })
                  } */}
                  {
                    companies.company && companies.company.employees.map((d,i)=>{
                     return(<>
                      <div
                       className="col-md-4 col-sm-6 col-12 col-lg-4 col-xl-3"
                      key={i}
                      >
                          <div>
                          <Card data={d} />
                         </div>
                      </div>
                     </>)
                    })
                  }
            </div>
          </div>
        </section>
        <NotificationContainer />
        <Container style={{ alignSelf: "center" }}>
          <Modal
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={handleClose}
            dialogClassName="my-modal"
            // className='lg-4 md-8'
            // className="md-4"
            style={{ alignSelf: "center" }}
          >
            <Modal.Header closeButton>
              <Modal.Title
                id="contained-modal-title-vcenter "
                style={{ textAlign: "center" }}
              >
                <h5> Add Employee</h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Form onSubmit={handleSubmit}>
                  <Form.Group>

                    <EmployeeData
                    
                      // showModel={   showChildModel1     }

                      value={emp.firstname}
                      onChange={handleinput}
                      onChange1={(e) => setfile(e.target.files[0])}
                      value1={emp.lastname}
                      value2={emp.gender}
                      value3={emp.cnic}
                      value4={emp.dob}
                      value5={emp.martialStatus}
                      value6={emp.religion}
                      value7={emp.profilepic}
                      value8={emp.primaryphone}
                      value9={emp.primaryemail}
                      value10={emp.secondaryphone}
                      value11={emp.secondaryemail}
                      value12={emp.temporaryaddress}
                      value13={emp.permanentaddress}
                      value14={emp.city}
                      value15={emp.province}
                      value16={emp.postalCode}
                      value17={emp.username}
                      value18={emp.password}
                      value19={emp.joiningdate}
                      value20={emp.terminationdate}
                      value21={emp.username}
                      value22={emp.password}
                      value23={emp.currentSalary}
                      value24={emp.terminationreason}
                      value25={emp.paymentmode}
                      value26={emp.bankname}
                      value27={emp.accounttitle}
                      value28={emp.accountno}
                      value29={emp.IBAN}
                      value30={emp.branchcode}
                      value31={details.institute}
                      onChange2={handleeducationdetails}
                      value32={details.degreetitle}
                      onChange3={handleeducationdetails}
                      value33={details.start}
                      value34={details.end}
                      value35={details.status}
                      value36={empdetails.company}
                      value37={empdetails.position}
                      onChange4={handleempinput}
                      value38={empdetails.joiningdate}
                      onChange5={async (e) =>
                        await handleempinputJoiningDate(e)
                      }
                      value39={empdetails.resignationdate}
                      onChange6={async (e) =>
                        await handleempinputResignationDate(e)
                      }
                      value40={empdetails.jobdescription}
                      value41={emp.employementstatus}

                    />
                  </Form.Group>
                </Form>
              </Container>
            </Modal.Body>
          </Modal>
        </Container>
        <Modal
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={childModel1}
          onHide={Closechildmodal1}
          // size="lg"
          // style={{width:'50%',height:'40%'}}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                    showChildModel1();
                  }}
                >
                  Add Education
                </Button>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
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
              <h5>Employement Details</h5>
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
                      // onChange={handleempinput}
                      onChange={handleinput}
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
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
                      // disabled={disableFields}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label>Job Description</Form.Label>
                <FormGroup
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
                    // disabled={disableFields}
                  />
                </FormGroup>
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
      </div>
    </>
  );
};

export default AllEmployees;
