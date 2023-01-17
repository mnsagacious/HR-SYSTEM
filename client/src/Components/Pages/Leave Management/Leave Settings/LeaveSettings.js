import axios from "axios";
import React, { useState } from "react";
import { Button,Form, Card, Container, Modal ,Row,Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "../../../../Context/Context";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import DeleteModel from "../../../Customized Modals/DeleteModel/DeleteModel";
import EditModal from "../../../Customized Modals/Edit Modal/EditModal";
import AddPosition from "../../../Customized Modals/Add/AddPosition";
const LeaveSettings = () => {
  const { user ,companydata} = useContext(Context);
  const [department,setdepartment] = useState(
    JSON.parse(localStorage.getItem("Selected Department")) || ""
  )
  const [positions, setpositions] = useState([]);
  const [selected,setselected] = useState("")
  const[filter,setfilter] = useState([])
  const [showdelete, setShowdelete] = useState();
  const [showedit, setShowedit] = useState();
  const handleedit = () => setShowedit(false);
  const handledelete =() => setShowdelete(false);
  const showEdit = () => setShowedit(true);
  const showDelete = () => setShowdelete(true);
  const [update,setupdate] = useState(false);
  const getdata = async () => {
    try {
      const response = await axios.get(`/company/positions/${user.company}`);
      console.log("response of company positions", response.data.positions);
      const data = response && response.data.positions;
      setpositions(data);
      console.log("getting data",data)
    } catch (error) {
      console.log("error from getting company positions",error);
    }
  };
  const depdata = async () => {
    try {
      const res = await axios.get(`/positions/query?department=${department && department}`);
      res && console.log(res.data);
      res && setfilter(res.data.positions);
      const depdata = res.data.positions;
      if (department.length != "") {
        localStorage.setItem("Selected Department", JSON.stringify(department));
        localStorage.setItem("departmentdata",JSON.stringify(depdata));
      }
      setupdate(!update)
    } catch (error) {
      console.log(error);
    }
  };
 
  useEffect(() => {
    if(department){
      console.log("filter is true")
      depdata();
      const lastselected = JSON.parse(
        localStorage.getItem("Selected Department") && localStorage.getItem("Selected Department") || null
      );
      setselected(lastselected);
    }else{
      getdata();
    }

    // department ? depdata() : getdata()
  
  }, [department]);
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
  const filterrows =[];

   
//  if (filter){
      filter.map((d,i)=>{
        filterrows.push({
          id:i+1,
          position:d.position,
          company:d.assignTo.title,
          department:d.department.departmentname
        })
      })
//  }
 console.log("filter",filterrows)
  // if(positions){
    positions && positions.map((d, i) => {
      rows.push({
        id: i + 1,
        position: d.position,
        company: d.assignTo.title,
        department: d.department.departmentname,
      });
    });
  // }
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
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Leaves Setting</h3>
                    <ul
                      className="breadcrumb"
                      style={{ backgroundColor: "#f7f7f7" }}
                    >
                      <li className="breadcrumb-item">
                        <Link to="/" style={{ color: "#1f1f1f" }}>
                          Dashboard
                        </Link>
                      </li>
                      <li className="breadcrumb-item active">
                        Leaves Settings
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                <Form>
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    name="department"
                    value={department}
                    onChange={(e) => { setdepartment(e.target.value); }}
                    required
                  >
                    <option disabled selected hidden value={""}>Please Select</option>
                    {companydata.departments.map((d, i) => {
                     
                      return (
                        <option value={d._id} key={i}>
                          {d.departmentname}
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form>
               
              </div>
             
            </div>
           {
            department &&  <div className="d-flex justify-content-end my-2">
            <p className="text-primary text-md font-weight-bold " style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>{setdepartment(""); localStorage.removeItem("Selected Department"); localStorage.removeItem("departmentdata"); setupdate(!update)}}>Clear Filters</p>
            </div>
           }
          </div>
        </section>
        <section>
          <Container fluid className="mx-2 ">
            <Card>
              <Box sx={{ height: 600, width: "100%" }} className="dashboard">
                <DataGrid
                  rows={department.length >1 ? filterrows :rows}
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
      </div>
      
    </>
  );
};

export default LeaveSettings;
