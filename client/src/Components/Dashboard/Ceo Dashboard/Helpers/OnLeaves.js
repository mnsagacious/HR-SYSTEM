import React from 'react'
import {Container,Row,Col,Card} from 'react-bootstrap'
import Avatar from "@mui/material/Avatar";
import img from '../../../../Assets/avatar.jpg';
import GroupsIcon from "@mui/icons-material/Groups";
import {Link}from 'react-router-dom'
const OnLeaves = () => {
    const employees = [
        {
          id: 1,
          name: "Raheel Bashir",
          LeaveType: "Sick Leave",
        },
        {
          id: 2,
          name: "Mazhar Qayyum",
          LeaveType: "Casual Leave",
        },
        {
          id: 3,
          name: "Fayaz ul Hassan",
          LeaveType: "Casual Leave",
        },
        {
          id: 4,
          name: "Daniyal Khalid",
          LeaveType: "Sick Leave",
        },
      ];
  return (
    <>
      
    
       <Row>
       <Col xxl="11">
                      <Card>
                        <Card.Header style={{ backgroundColor: "#ffff" }}>
                          <Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5
                                  style={{
                                    // color: "rgb(160, 160, 160)",
                                    color: "#5D5D5D",
                                    fontSize: "1.3vw",
                                    fontWeight: "bold",
                                  }}
                                >
                                 On Leaves
                                </h5>
                              </div>
                            </div>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body
                          className="px-0 dashboard"
                          style={{ height: "20vh", overflow: "auto" }}
                        >
                          {/* <div className="d-flex align-items-start align-items-center "> */}
                          {employees.map((d) => {
                            return (
                              <>
                                <div className="d-flex  align-items-center px-2 my-2">
                                  <Avatar src={img} alt="img" />
                                  <div className="d-flex flex-column">
                                    <div
                                      style={{
                                        color: "#5D5D5D",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {d.name}
                                    </div>
                                    <div style={{ color: "#5D5D5D" }}>
                                      {d.designation}
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                          {/* </div> */}
                        </Card.Body>
                        <Card.Footer
                          style={{ backgroundColor: "#ffff", border: "0px" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <Link
                                to={"/employees"}
                                style={{
                                  color: "#5D5D5D",
                                  borderBottom: "1px solid rgb(160, 160, 160)",
                                }}
                              >
                                See All Employees
                              </Link>
                            </div>
                            <div>
                              <GroupsIcon
                                className="iconDashboard"
                                style={{
                                  backgroundColor: "rgba(218, 165, 32, 0.2)",
                                  color: "goldenrod",
                                  fontSize: "1.8vw",
                                }}
                              />
                            </div>
                          </div>
                        </Card.Footer>
                      </Card>
                    </Col>
       </Row>
     

     
    </>
  )
}

export default OnLeaves
