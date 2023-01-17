import axios from "axios";
import React, { useState } from "react";
import { Button, Card, Container, Modal ,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../Context/Context";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModel from "../Customized Modals/DeleteModel/DeleteModel";
import EditModal from "../Customized Modals/Edit Modal/EditModal";
import AddPosition from "../Customized Modals/Add/AddPosition";
const Positions = () => {
  const { user ,companydata} = useContext(Context);
  const [positions, setpositions] = useState([]);
  const [showdelete, setShowdelete] = useState();
  const [showedit, setShowedit] = useState();
  const [showAdd, setShowadd] = useState();
  const handleedit = () => setShowedit(false);
  const handleAdd = () => setShowadd(false);
  const handledelete =() => setShowdelete(false)

  const showEdit = () => setShowedit(true);
  const showDelete = () => setShowdelete(true);
  const showadd = () => setShowadd(true);

  const getdata = async () => {
    try {
      const response = await axios.get(`/company/positions/${user.company}`);
      console.log("response of company positions", response.data.positions);
      const data = response && response.data.positions;
      setpositions(data);
    } catch (error) {
      console.log("error from getting company positions",error);
    }
  };
  
  useEffect(() => {
    getdata();
  }, []);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "position",
      headerName: "Position Title",
      width: 250,
    },
    {
      field: "company",
      headerName: "Company",
      width: 250,
    },
    {
      field: "department",
      headerName: "Department",
      width: 250,
    },
    {
      field: "action",
      headerName: "Action",
      type: "text",
      width: 150,
      headerAlign: "center",
      renderCell: (params) => {
        console.log(params, "params");
        return (
          <>
            <div className="d-flex justify-content-center w-100">
              {
                <div className="d-flex w-25 justify-content-between">
                  <div className="p-1 px-2 edit" onClick={showEdit}>
                    <i
                      className="fa-regular  fa-pen-to-square edit1"
                      style={{ color: "#14A44D" }}
                    ></i>
                  </div>
                  <div className="p-1 px-2 delete"  onClick={showDelete}>
                    <i
                      className="fa-solid fa-trash delete"
                      style={{ color: "#DC4C64" }}
                    ></i>
                  </div>
                </div>
              }
            </div>
          </>
        );
      },
    },
  ];

  const rows = [];

  positions &&
    positions.map((d, i) => {
      rows.push({
        id: i + 1,
        position: d.position,
        company: d.assignTo.title,
        department: d.department.departmentname,
      });
    });
  console.log("rows", rows);
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
                      onClick={showadd}
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
        <section>
          <Container fluid className="mx-2 ">
            <Card>
              <Box sx={{ height: 600, width: "100%" }} className="dashboard">
                <DataGrid
                  rows={rows && rows}
                  columns={columns}
                  pageSize={10}
                  rowsPerPageOptions={[5]}
                />
              </Box>
            </Card>
          </Container>
        </section>
		<DeleteModel show={showdelete} close={handledelete}/>
		<EditModal show={showedit} close={handleedit}/>
		<AddPosition show={showAdd} close={handleAdd} data={companydata}/>
      </div>
      
    </>
  );
};

export default Positions;



