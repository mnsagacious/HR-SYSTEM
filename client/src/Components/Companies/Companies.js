import React, { useState } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import BusinessIcon from "@mui/icons-material/Business";
import image from "../../Components/Employee Data/All Employees/avatar.png";
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useEffect } from "react";
import axios from "axios";
import AddIcon from '@mui/icons-material/Add';
import { Modal, Form,  } from 'react-bootstrap';
const Companies = () => {
  const { user } = useContext(Context);
  console.log(user, "users");
  const url = `owners/${user.id}`;
  const [owner, setowner] = useState({});
  const [show, setShow] = useState()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const companiesdata = async () => {
    try {
      const company = await axios.get(url);
      const data = company.data.owner;
      console.log(data, "owners data");
      setowner(data);
    } catch (error) {
      console.log(error);
    }
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "company", headerName: "Company", width: 150 },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "owner",
      headerName: "Owner",
      type: "text",
      width: 150,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 150,
      headerAlign: 'center',
      renderCell:(params)=>{
        console.log(params,"params")
        return (<>
        
          <div className="d-flex justify-content-center w-100">
              {
                params.row.status === true ? <div><span className="badge  badge-success" style={{padding:'4px'}}><p style={{fontSize:'12px'}}>Active</p></span></div> :<span className="badge badge-danger">inActive</span>
              }
          </div>
      </>)
      }
    },
  ];

  const rows = [];
  console.log(owner.companies, "companies");


  // console.log(rowss,"eeeee")
  owner.companies &&
    owner.companies.map((d, i) => {
      rows.push({
        id: i + 1,
        company: d.title,
        location: d.Location,
        owner: owner.ownername,
        status: d.status,
      });
    });
  console.log(rows, "rowss");
 
  useEffect(() => {
    console.log("useeffect data");
    companiesdata();
  }, []);
  return (
    <>
      <div>
        <div className="content-wrapper my-2" style={{ backgroundColor: "#f7f7f7" }}>
          {/* Content Header (Page header) */}

          <section>
            <Container className="my-3">
              <div class="jumbotron ">
                <div class="container ">
                  <h4>Hii M.Sajjad (CEO)</h4>
                  <p class="lead">Welcome back to your dashboard !.</p>
                </div>
              </div>
              <Container>
                <Row className="justify-content-between gx-5">
                  <Col xxl="8">
                    <Row>
                      <Card>
                        <Card.Header className="bg-white d-flex align-items-center">
                          
                          <div
                            className="rounded-circle "
                            style={{
                              padding: "5px 8px",
                              backgroundColor: "#17a392",
                              opacity: "0.7",
                              color: "white",
                              
                            }}
                          >
                            <span>
                              {<BusinessIcon style={{ fontSize: "18px" }} />}
                            </span>
                          </div>
                          &nbsp;
                          <div style={{width:'50%'}}>
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "18px",
                              marginBottom: "0px",
                            }}
                          >
                            Your Companies{" "}
                          </p>
                          </div>
                         
                          <div style={{width:'100%'}}>
                           <div style={{display:'flex',justifyContent:'end',}}>
                           
                           <div
                            className="rounded-circle "
                            style={{
                              padding: "5px 8px",
                              backgroundColor:"#17a392",
                              opacity:"0.7",
                              color: "white",
                              
                            }}
                           
                           
                          >
                            <span>
                              {<AddIcon style={{ fontSize: "18px" }} onClick={handleShow}/>}
                            </span>
                          </div>
                           </div>
                          </div>
                        </Card.Header>
                        <Card.Body>
                          
                           <div style={{minheight:'200px'}}>
                           <div style={{ height: 'auto', overflow: "auto" }}>
                              <DataGrid rows={rows && rows} columns={columns} autoHeight/>
                            </div>
                           </div>
                         
                        </Card.Body>
                      </Card>
                    </Row>
                  </Col>
                  <Col xxl="4">
                    <Row>
                      <Card>
                        <Card.Header className="bg-white d-flex align-items-center">
                          <div
                            className="rounded-circle "
                            style={{
                              padding: "5px 6px",
                              backgroundColor: "#17a392",
                              opacity: "0.7",
                              color: "white",
                            }}
                          >
                            <i
                              class="fa-solid fa-users"
                              style={{ fontSize: "18px" }}
                            ></i>
                          </div>
                          &nbsp;
                          <p
                            style={{
                              fontWeight: "bold",
                              fontSize: "18px",
                              marginBottom: "0px",
                            }}
                          >
                            Meetings
                          </p>
                        </Card.Header>
                        <Card.Body>
                          <div style={{ minheight: "20vh", width: "100%" }}>
                            <div className="d-flex ">
                              <img
                                src={image}
                                className="rounded-circle"
                                alt="profile pic"
                                style={{ width: "50px", height: "50px" }}
                              />
                              <div className="px-2">
                                <p>Abdul Hameed</p>
                                <p className="font-weight-bold">
                                  Sagacious System
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Container>
          </section>
        </div>
      </div>
      <Modal size="md"
                onHide={handleClose}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}

            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter" className='header-modal'>
                         <span>Add Company</span>
                    </Modal.Title>
                    <Modal.Body>
                      <Form>
                          <Form.Label>Title</Form.Label>
                          <Form.Control type='text' required></Form.Control>
                          <Form.Label></Form.Label>
                      </Form>
                    </Modal.Body>
                </Modal.Header>
                <Modal.Body>
                    
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
    </>
  );
};

export default Companies;
