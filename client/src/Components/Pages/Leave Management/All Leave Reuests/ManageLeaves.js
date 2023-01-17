import React from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../../../Context/Context";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Report from "../report leave request/Report";
import LeaveApplication from "./LeaveApplication";
import PrintIcon from "@mui/icons-material/Print";
const ManageLeaves = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [handlemodal, sethandlemodal] = useState(false);
  console.log("handle modal ", handlemodal);
  function getMimetype(extension) {
    var mimetype;

    switch (extension) {
      case ".jpeg":
      case ".jpg":
        // JPEG Image
        mimetype = "image/jpeg";
        break;
      case ".jpgv":
        // JPGVideo
        mimetype = "video/jpeg";
        break;
      case ".png":
        // Portable Network Graphics (PNG)
        mimetype = "image/png";
        break;

      case ".svg":
        // Scalable Vector Graphics (SVG)
        mimetype = "image/svg+xml";
        break;

      case ".xls":
        // Microsoft Excel
        mimetype = "application/vnd.ms-excel";
        break;
      case ".xlam":
        // Microsoft Excel - Add-In File
        mimetype = "application/vnd.ms-excel.addin.macroenabled.12";
        break;

      case ".xlsm":
        // Microsoft Excel - Macro-Enabled Workbook
        mimetype = "application/vnd.ms-excel.sheet.macroenabled.12";
        break;
      case ".pptx":
        // Microsoft Office - OOXML - Presentation
        mimetype =
          "application/vnd.openxmlformats-officedocument.presentationml.presentation";
        break;

      case ".xlsx":
        // Microsoft Office - OOXML - Spreadsheet
        mimetype =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;

      case ".docx":
        // Microsoft Office - OOXML - Word Document
        mimetype =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        break;
      case ".dotx":
        // Microsoft Office - OOXML - Word Document Template
        mimetype =
          "application/vnd.openxmlformats-officedocument.wordprocessingml.template";
        break;
      case ".ppt":
        // Microsoft PowerPoint
        mimetype = "application/vnd.ms-powerpoint";
        break;

      case ".doc":
        // Microsoft Word
        mimetype = "application/msword";
        break;

      case ".pdf":
        // Adobe Portable Document Format
        mimetype = "application/pdf";
        break;
      case ".txt":
        // Text File
        mimetype = "text/plain";
        break;
      default:
        break;
    }

    if (mimetype) {
      return mimetype;
    }

    switch (extension) {
      case ".7z":
        // 7-Zip
        mimetype = "application/x-7z-compressed";
        break;

      case ".ace":
        // Ace Archive
        mimetype = "application/x-ace-compressed";
        break;
      case ".acc":
        // Active Content Compression
        mimetype = "application/vnd.americandynamics.acc";
        break;

      case ".avi":
        // Audio Video Interleave (AVI)
        mimetype = "video/x-msvideo";
        break;

      case ".csv":
        // Comma-Seperated Values
        mimetype = "text/csv";
        break;

      case ".texinfo":
        // GNU Texinfo Document
        mimetype = "application/x-texinfo";
        break;

      case ".html":
        // HyperText Markup Language (HTML)
        mimetype = "text/html";
        break;

      case ".m3u":
        // M3U (Multimedia Playlist)
        mimetype = "audio/x-mpegurl";
        break;
      case ".m4v":
        // M4v
        mimetype = "video/x-m4v";
        break;

      case ".mpeg":
        // MPEG Video
        mimetype = "video/mpeg";
        break;

      case ".mp4a":
        // MPEG-4 Audio
        mimetype = "audio/mp4";
        break;
      case ".mp4":
        // MPEG-4 Video
        mimetype = "video/mp4";
        break;
      case ".mp4":
        // MPEG4
        mimetype = "application/mp4";
        break;

      case ".weba":
        // Open Web Media Project - Audio
        mimetype = "audio/webm";
        break;
      case ".webm":
        // Open Web Media Project - Video
        mimetype = "video/webm";
        break;

      case ".psd":
        // Photoshop Document
        mimetype = "image/vnd.adobe.photoshop";
        break;

      case ".pic":
        // PICT Image
        mimetype = "image/x-pict";
        break;

      case ".au":
        // Sun Audio - Au file format
        mimetype = "audio/basic";
        break;

      case ".tar":
        // Tar File (Tape Archive)
        mimetype = "application/x-tar";
        break;

      case ".wav":
        // Waveform Audio File Format (WAV)
        mimetype = "audio/x-wav";
        break;

      case ".webp":
        // WebP Image
        mimetype = "image/webp";
        break;

      case ".xml":
        // XML - Extensible Markup Language
        mimetype = "application/xml";
        break;

      case ".zip":
        // Zip Archive
        mimetype = "application/zip";
        break;

      default:
        // Binary Data
        mimetype = "application/octet-stream";
        break;
    }

    return mimetype;
  }

  const navigate = useNavigate();
  const [modaldata, setmodaldata] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    console.log("handleshow", id);

    // var reader = new FileReader();
    // reader.onload = function (e) {
    //   var contents = e.target.result;
    //   displayContents(contents, id.row.attachment);
    // };
    // let blob = new Blob(id.row.attachment, { type: 'text/html' });

    // const fileReaded = reader.readAsBinaryString(blob);

    // console.log("fileReaded", fileReaded)

    setmodaldata(id.row);

    setstatus(id.row.status);
    setShow(true);
    setSupervisorApproval(id.row.supervisorApproval);
  };
  console.log("modalDATA", modaldata);
  const [leavesData, setLeavesData] = useState([]);
  const [status, setstatus] = useState();
  const [supervisorApproval, setSupervisorApproval] = useState();
  const [update, setUpdate] = useState(true);

  const { user } = useContext(Context);

  const getUrl = "/leaverequest/all/";
  const getLeavesrequests = async () => {
    console.log("user", user);
    var getLeaves = [];
    {
      if (!user.isAdmin) {
        getLeaves = await axios.get(`${getUrl}${user.id}`);
      } else {
        getLeaves = await axios.get(`/leaverequest/allForHR`);
      }
    }
    const data = getLeaves.data;
    setLeavesData(data.allRequest);
    console.log("Leaves Requests", data.allRequest);
  };
  //data for report generate;
  const employee = user.id;
  const getEmp = `/employees/${user.id}`;
   
  const newArray = [];
  leavesData.map((d) => {
    var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    var firstDate = new Date(d.from); // 29th of Feb at noon your timezone
    var secondDate = new Date(d.to);
    var diffDays = Math.round(
      Math.abs((secondDate.getTime() - firstDate.getTime()) / oneDay) + 1
    );
    console.log("new leaves data", leavesData);
    newArray.push({
      id: d._id,
      Emp_id: d.employee.emp_id,
      leavetype: d.leaveType,
      employeename: d.employee.firstname,
      department: d.employee.departments.map((d) => d.departmentname),
      from: new Date(d.from).toDateString(),
      to: new Date(d.to).toDateString(),
      reason: d.reason,
      totaldays: diffDays,
      status: d.status,
      designation: d.employee.designation,
      supervisorApproval: d.supervisorApproval,
      attachment: d.attachment,
      applicationdate: d.applicationdate,
      leaves: d.employee.Leaves.map((d) => d),
    });
  });
 
  // const depemp = `/departments/${}`

  const updateUserStatus = async (e) => {
    e.preventDefault();
    const updateStatus = `/leaverequest/${modaldata.id}`;

    try {
      const update = await axios.put(updateStatus, {
        status,
        supervisorApproval,
      });

      NotificationManager.success("Successfully Updated");

      handleClose();
    } catch (error) {
      console.log(error);
      NotificationManager.error("Failed to Update");
    }
    setUpdate(!update);
  };
  console.log("newArray", newArray);
  useEffect(() => {
    getLeavesrequests();
  }, [update]);

  //  const handleUpdate = async() =>{
  //   try{
  //        const res = await axios.put('/leaverequest/:id',{
  //         status:req.body.status
  //        })

  //   }catch(error){

  //   }
  //  }

  const rows = newArray;

  const columns = [
    // { field: "Emp_id", headerName: "Employee ID", width: 150 },
    { field: "leavetype", headerName: "Leave-type", width: 150 },
    { field: "employeename", headerName: "Employee Name", width: 150 },
    { field: "department", headerName: "Department", width: 150 },
    { field: "from", headerName: "from", width: 150 },
    { field: "to", headerName: "to", width: 150 },
    // { field: "reason", headerName: "reason", width: 150 },
    {
      field: "supervisorApproval",
      headerName: "Supervisor Approval",
      width: 150,
    },

    { field: "status", headerName: "Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (id) => {
        console.log("id", id);
        return (
          <div>
            <BorderColorIcon
              onClick={() => {
                handleShow(id);
                sethandlemodal(!handlemodal);
              }}
            />
          </div>
        );
      },
    },
    {
      field: "print",
      headerName: "Print",
      width: 80,
      renderCell: (id) => {
        console.log("id", id);
        return (
          <div>
            <PrintIcon
              onClick={async () => {
               const setdata = await  setmodaldata(id.row);
                handlePrint();
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div
        className="content-wrapper my-2"
        style={{ backgroundColor: "#f7f7f7" }}
      >
        <section className="content-header py-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col">
                <h3 className="page-title">Leave Management</h3>
                <ul
                  className="breadcrumb"
                  style={{ backgroundColor: "#f7f7f7" }}
                >
                  <li className="breadcrumb-item">
                    <Link to="/" style={{ color: "#1f1f1f" }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Leave Management</li>
                  <li className="breadcrumb-item active">ManageLeaves</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="content">
          <div className="container">
            <div className="card">
              <div className="card-header buttoncolor ">
                <h3 className="card-title" style={{ color: "white" }}>
                  All Leaves Request
                </h3>
              </div>
              <div className="card-body">
                <div style={{ width: "100%", height: "600px" }}>
                  <DataGrid columns={columns} rows={rows} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Applicant's Information</h5>
          <hr></hr>
          <Row>
            <Col>
              <Form>
                <Form.Label>Employee ID</Form.Label>
                <Form.Control disabled value={modaldata.Emp_id}></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  disabled
                  value={modaldata.employeename}
                ></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Department</Form.Label>
                <Form.Control
                  disabled
                  value={modaldata.department}
                ></Form.Control>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Label>Leave Type</Form.Label>
                <Form.Control
                  disabled
                  value={modaldata.leavetype}
                ></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Leave Status</Form.Label>
                <Form.Control disabled value={modaldata.status}></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Reason</Form.Label>
                <Form.Control disabled value={modaldata.reason}></Form.Control>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Label>From</Form.Label>
                <Form.Control disabled value={modaldata.from}></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>to</Form.Label>
                <Form.Control disabled value={modaldata.to}></Form.Control>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Label>Total Days</Form.Label>
                <Form.Control
                  disabled
                  value={modaldata.totaldays}
                ></Form.Control>
              </Form>
            </Col>
          </Row>
          <Row>
            <Form>
              {console.log(
                "modaldata",
                modaldata.attachment && modaldata.attachment.file
              )}
              <Form.Label>Attachment</Form.Label>
              <Row>
                <Col sm={9}>
                  <Form.Control
                    disabled
                    value={modaldata.attachment && modaldata.attachment.name}
                  ></Form.Control>
                </Col>

                <Col sm={3}>
                  <Button
                    style={{ width: "100%" }}
                    onClick={() => {
                      var extension = modaldata.attachment.name.substring(
                        modaldata.attachment.name.lastIndexOf(".")
                      );
                      var mimetype = getMimetype(extension);

                      const linkSource = `data:${mimetype};base64,${modaldata.attachment &&
                        modaldata.attachment.file}`;
                      const downloadLink = document.createElement("a");
                      const fileName = `attachment${extension}`;

                      downloadLink.href = linkSource;
                      downloadLink.download = fileName;
                      downloadLink.click();
                    }}
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </Form>
          </Row>

          <Row> &nbsp; &nbsp;</Row>

          {!user.isAdmin && (
            <>
              <h5 className="my-3">Supervisor Approval</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form onSubmit={updateUserStatus}>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={supervisorApproval}
                      onChange={(e) => {
                        setSupervisorApproval(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        select...
                      </option>
                      <option>Pending Approval</option>
                      <option>Reject</option>
                      <option>Approved</option>
                    </Form.Select>
                    <div className="my-3">
                      <Button type="submit">Update Status</Button>
                    </div>
                  </Form>
                </Col>
              </Row>{" "}
            </>
          )}
          {user.isAdmin && (
            <>
              <h5 className="my-3">HR Approval</h5>
              <hr></hr>
              <Row>
                <Col>
                  <Form onSubmit={updateUserStatus}>
                    <Form.Label>Status</Form.Label>
                    <Form.Select
                      value={status}
                      onChange={(e) => {
                        setstatus(e.target.value);
                      }}
                    >
                      <option disabled selected>
                        select...
                      </option>
                      <option>Pending Approval</option>
                      <option>Reject</option>
                      <option>Approved</option>
                    </Form.Select>
                    <div
                      className="my-3 d-flex justify-content-between"
                      style={{ width: "35%" }}
                    >
                      <Button type="submit">Update Status</Button>
                      <Button
                        onClick={() => {
                          handlePrint();
                        }}
                      >
                        Generate PDF
                      </Button>
                    </div>
                  </Form>
                </Col>
              </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
      <div style={{ display: "none" }}>
        <div ref={componentRef} className=" content-wrapper">
          { <LeaveApplication modaldata={modaldata} />}
        </div>
      </div>
    </div>
  );
};

export default ManageLeaves;
