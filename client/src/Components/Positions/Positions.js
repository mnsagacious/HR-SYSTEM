import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Card, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { Context } from "../../Context/Context";
import { Avatar } from "@mui/material";
import EditModal from "../Customized Modals/Edit Modal/EditModal";
import DeleteModel from "../Customized Modals/DeleteModel/DeleteModel";
import AddPosition from "../Customized Modals/Add/AddPosition";
import AvatarGroup from "@mui/material/AvatarGroup";
const Positions = () => {
  const { user, companydata } = useContext(Context);
  const [selected, setselected] = useState("");
  const [positions, setpositions] = useState([]);
  const [showdelete, setShowdelete] = useState();
  const [showedit, setShowedit] = useState();
  const [showAdd, setShowadd] = useState();
  const handleedit = () => setShowedit(false);
  const handleAdd = () => setShowadd(false);
  const handledelete = () => setShowdelete(false);
  const [update, setupdate] = useState(false);
  const [department, setdepartment] = useState(
    JSON.parse(localStorage.getItem("departmentid")) || ""
  );
  const [loading, setloading] = useState(false);
  const [filterresult, setfilterresult] = useState([]);
  const getdata = async () => {
    try {
      setloading(true);
      setTimeout(async()=>{
        const response = await axios.get(`/company/positions/${user.company}`);
        console.log("response of company positions", response.data.positions);
        const data = response && response.data.positions;
        setpositions(data);
        positions && setloading(false)
      },600)
    } catch (error) {
      console.log(error);
    }
  };
  const depdata = async () => {
    setloading(true);
    try {
       setTimeout(async()=>{
        const res = await axios.get(
          `/positions/query?department=${department && department}`
        );
       
        res && console.log(res.data);
        // res && setfilterresult(res.data.positions);
        res && setpositions(res.data.positions);
        const depdata = res.data.positions;
        if (department.length != "") {
          localStorage.setItem("departmentid", JSON.stringify(department));
          localStorage.setItem("filtered positions", JSON.stringify(depdata));
        };
       depdata  && setloading(false)
       },600)
    } catch (error) {
      console.log(error);
    }
  };

 

  useEffect(() => {
    if (department) {
     
     
        depdata();
        const lastselected = JSON.parse(
          (localStorage.getItem("departmentid") &&
            localStorage.getItem("departmentid")) ||
            null
        );
        setselected(lastselected);
       
    } else {
      
        getdata();
    }
  }, [department]);

  return (
    <>
      <div
        className="content-wrapper my-2"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        {/* Content Header (Page header) */}
        <section className="content-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Positions</h3>

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
                  <li className="breadcrumb-item active">Positions</li>
                </ul>
              </div>
              <div className="col-auto float-end ms-auto">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <a
                    className="btn add-btn "
                    data-bs-toggle="modal"
                    // onClick={showadd}
                  >
                    <i
                      className="fa fa-plus"
                      style={{ fontSize: "14px", marginRight: "2px" }}
                    >
                      {" "}
                    </i>
                    Add Position
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Container fluid className="px-3 ">
          {
            <Row>
              <Col>
                <Card>
                  <Card.Header className="bg-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <Card.Title>Positions</Card.Title>
                      </div>
                      <div>
                        <Card.Title>
                          <Form.Select
                            name="department"
                            value={department}
                            onChange={(e) => {
                              setdepartment(e.target.value);
                            }}
                          >
                            <option disabled selected hidden value={""}>
                              Please Select
                            </option>
                            {companydata.departments.map((d, i) => {
                              return (
                                <option value={d._id} key={i}>
                                  {d.departmentname}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Card.Title>
                      </div>
                    </div>
                    {department && (
                      <div className="d-flex justify-content-end my-2">
                        <p
                          className="text-primary text-md font-weight-bold "
                          style={{
                            cursor: "pointer",
                            textDecoration: "underline",
                          }}
                          onClick={() => {
                            setdepartment("");
                            localStorage.removeItem("filtered positions");
                            localStorage.removeItem("departmentid");
                            setupdate(!update);
                          }}
                        >
                          Clear Filters
                        </p>
                      </div>
                    )}
                  </Card.Header>

                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center py-4">
                      <Spinner
                        variant="primary"
                        animation="border"
                        aria-hidden="true"
                      />
                    </div>
                  ) : (
                    <div>
                      <Row className="my-3 px-2">
                        {positions.map((d, i) => {
                          return (
                            <>
                              <Col xxl="3" key={i}>
                                <Card
                                  style={{ borderLeft: "4px solid #26A69A" }}
                                >
                                  <Card.Header className="bg-white">
                                   <div className="d-flex justify-content-between align-items-center">
                                   <div>
                                    <strong style={{ color: "black" }}>
                                      {d.position}
                                    </strong>
                                    </div>
                                    <div>
                                    <i class="fa-solid fa-ellipsis-vertical"></i>
                                    </div>
                                   </div>
                                  </Card.Header>
                                  <Card.Body>
                                    <div>
                                      <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                          <p
                                            className="text-sm fw-normal"
                                            style={{ color: "#7F8487" }}
                                          >
                                            Assigned
                                            <span className="text-success pl-1">
                                              <i class="fa-solid fa-circle-check"></i>
                                            </span>
                                          </p>
                                        </div>
                                        <div>
                                          <p
                                            className="text-sm fw-normal"
                                            style={{ color: "#7F8487" }}
                                          >
                                            Allocated Leaves
                                            <span className="text-danger pl-1">
                                            <i class="fa-solid fa-circle-xmark"></i>
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="mt-2">
                                        <p
                                          className="text-sm fw-normal"
                                          style={{ color: "#7F8487" }}
                                        >
                                          Assign to
                                        </p>
                                        <div className="d-flex justify-content-between pt-1">
                                          <AvatarGroup
                                            max={3}
                                            sx={{
                                              "& .MuiAvatar-root": {
                                                width: 30,
                                                height: 30,
                                                fontSize: 15,
                                              },
                                            }}
                                          >
                                            <Avatar
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                            <Avatar
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                            <Avatar
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                            <Avatar
                                              style={{
                                                width: "30px",
                                                height: "30px",
                                              }}
                                            />
                                          </AvatarGroup>
                                         <div>
                                         <p
                                            className="text-sm  fw-normal "
                                            style={{ color: "#7F8487" ,textDecoration:'underline',cursor:'pointer'}}
                                          >
                                            See All
                                          </p>
                                         </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </Card.Body>
                                  <Card.Footer>
                                      <p className="text-sm text-center">View Details</p>
                                    </Card.Footer>
                                </Card>
                              </Col>
                            </>
                          );
                        })}
                      </Row>
                    </div>
                  )}
                </Card>
              </Col>
            </Row>
          }
        </Container>
        {/* //modals */}
        <DeleteModel show={showdelete} close={handledelete} />
        <EditModal show={showedit} close={handleedit} />
        <AddPosition show={showAdd} close={handleAdd} data={companydata} />
      </div>
    </>
  );
};

export default Positions;

{
  /* <Col>
                <Card>
                  <Card.Header className="bg-white">
                    <Card.Body>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ width: "25%" }}>
                          <Avatar
                            style={{
                              width: "80px",
                              height: "80px",
                              backgroundColor: "purple",
                            }}
                          >
                            <p className="fs-2">
                              {firstindex
                                ? firstindex.department.departmentname.charAt(0)
                                : positions.map((d) =>
                                    d.department.departmentname.charAt(0)
                                  )}
                            </p>
                          </Avatar>
                        </div>
                        <div style={{ width: "65%" }}>
                          <strong className="fs-6">Department</strong>
                          <p
                            className="fs-6"
                            style={{
                              color: "#808080",
                              fontWeight: "bold",
                              textAlign: "justify",
                            }}
                          >
                            {firstindex
                              ? firstindex.department.departmentname
                              : positions.map(
                                  (d, i) => d.department.departmentname
                                )}
                          </p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex justify-content-around align-items-center">
                      <div>
                        <strong style={{ color: "#808080" }}>
                          Employees 10+
                        </strong>
                      </div>
                      <p
                        style={{
                          borderLeft: "1px solid #808080",
                          height: "20px",
                        }}
                      ></p>
                      <div>
                        <strong style={{ color: "#808080" }}>
                          Positions 2+
                        </strong>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col> */
}
