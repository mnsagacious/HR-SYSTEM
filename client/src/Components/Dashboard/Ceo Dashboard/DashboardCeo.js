import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import CountUp from "react-countup";
import DepartmentEmployees from "../../charts/DepartmentEmployees/DepartmentEmployees";
import Hiring from "../../charts/Hirring/Hiring";
import { Context } from "../../../Context/Context";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import img from "../../../Assets/avatar.jpg";
import Donot from "../../charts/CeoDahboard/Donot/Donot";
import Status from "../../charts/CeoDahboard/Donot/Status";
import Genders from "../../charts/CeoDahboard/Donot/Genders";
import Attendance from "./Helpers/Attendance";
import OnLeaves from "./Helpers/OnLeaves";
const DashboardCeo = () => {
  const { company } = useContext(Context);
  // console.log("company result",company.findquery && company.findquery.map((d)=>d.employees))

  const employees = [
    {
      id: 1,
      name: "Raheel Bashir",
      designation: "Team Lead",
    },
    {
      id: 2,
      name: "Mazhar Qayyum",
      designation: "Team Lead",
    },
    {
      id: 3,
      name: "Fayaz ul Hassan",
      designation: "Team Lead",
    },
    {
      id: 4,
      name: "Raheel Bashir",
      designation: "Team Lead",
    },
  ];
  return (
    <>
      <div>
        <div className="content-wrapper my-2" style={{ backgroundColor: "#f7f7f7" }}>
          {/* Content Header (Page header) */}
          <section className="content-header">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">{}</h3>
                </div>
              </div>
            </div>
            {/* /.container-fluid */}
          </section>
          <section>
            <Container fluid>
              <Row>
                <Col xxl="9">
                  <Row>
                    <Col xxl="3" lg="4">
                      <Card className="dashboard">
                        <Card.Header style={{ backgroundColor: "#ffff" }}>
                          <Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5
                                  style={{
                                    color: "#5D5D5D",
                                    fontSize: "1.3vw",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Total Employees
                                </h5>
                              </div>
                            </div>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0">
                          <div className="d-flex align-items-start align-items-center justify-content-center">
                            <p
                              style={{
                                fontSize: "2.3vw",
                                fontWeight: "600",
                                textAlign: "center",
                                color: "#5D5D5D",
                              }}
                            >
                              {/* <CountUp start={0} end={company.findquery && company.findquery.map((d)=>d.employees.length)} duration={1.0}>0</CountUp> */}
                              <CountUp start={0} end={112} duration={1.0}>
                                0
                              </CountUp>
                            </p>
                          </div>
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
                    <Col xxl="3" lg="4">
                      <Card className="dashboard">
                        <Card.Header style={{ backgroundColor: "#ffff" }}>
                          <Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5
                                  style={{
                                    color: "#5D5D5D",
                                    fontSize: "1.3vw",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Departments
                                </h5>
                              </div>
                            </div>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0">
                          <div className="d-flex align-items-start align-items-center justify-content-center">
                            <Donot />
                          </div>
                        </Card.Body>
                        <Card.Footer
                          style={{ backgroundColor: "#ffff", border: "0px" }}
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <Link
                                to={"/departments"}
                                style={{
                                  color: "#5D5D5D",
                                  borderBottom: "1px solid rgb(160, 160, 160)",
                                }}
                              >
                                See All Departments
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
                    <Col xxl="3" lg="4">
                      <Card className="dashboard">
                        <Card.Header style={{ backgroundColor: "#ffff" }}>
                          <Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5
                                  style={{
                                    color: "#5D5D5D",
                                    fontSize: "1.3vw",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Status
                                </h5>
                              </div>
                            </div>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0">
                          <div className="d-flex align-items-start align-items-center justify-content-center">
                            <Status />
                          </div>
                          {/* <Status/> */}
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
                    <Col xxl="3" lg="4">
                      <Card className="dashboard">
                        <Card.Header style={{ backgroundColor: "#ffff" }}>
                          <Card.Title>
                            <div className="d-flex justify-content-between align-items-center">
                              <div>
                                <h5
                                  style={{
                                    color: "#5D5D5D",
                                    fontSize: "1.3vw",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Genders
                                </h5>
                              </div>
                            </div>
                          </Card.Title>
                        </Card.Header>
                        <Card.Body className="px-0">
                          <div className="d-flex align-items-start align-items-center justify-content-center">
                            <Genders />
                          </div>
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
                </Col>
                <Col>
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
                                  Team Leads
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
                </Col>
              </Row>
            </Container>
          </section>
          <section>
            <Container fluid className="my-3 px-2">
              <Row>
                <Col xxl="9">
                  <Attendance />
                </Col>
                <Col xxl="3">
                  <OnLeaves />
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
};

export default DashboardCeo;
