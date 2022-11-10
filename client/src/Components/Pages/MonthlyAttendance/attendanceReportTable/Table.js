import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import "./table.css"
import { Link } from 'react-router-dom';
import ReactToPrint from "react-to-print";
import { useRef } from 'react'
// import logo from './../logo3.jpg';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import TextField from '@mui/material/TextField';
import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import axios from "axios";
import {
    NotificationContainer,
    NotificationManager,
} from "react-notifications";



const Table = ({ data, setTableData }) => {

    // data = []

    // setTableData(data)


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [Employee_ID, setEmployee_ID] = useState("");
    const [Name, setName] = useState("");
    const [In, setIn] = useState("");
    const [Out, setOut] = useState("");

    const [idOfEmployee, setIdOfEmployee] = useState("");





    const [tableSearch, setTableSearch] = useState("");






    const updateAttendance = async () => {
        try {


            const updateUser = await axios.put(`/updateuserattendance/${idOfEmployee}`, { in: In, out: Out, date: "2022-09-27T00:00:00.000+00:00" });





            console.log("savedata", updateUser)
            NotificationManager.success("successfully posted");
        } catch (error) {
            console.log("eror", error);
            NotificationManager.error("Error Saving DATA");
        }
    };

    const columns = [

        // { field: "id", headerName: "", width: 0 },

        { field: "Empid", headerName: "Employee_ID", width: 150 },

        { field: "Name", headerName: "Name", width: 300 },
        { field: "Department", headerName: "Department", width: 200 },

        { field: "Date", headerName: "Date", width: 100 },
        {
            field: "In", headerName: "In", width: 100, renderCell: (params) => {
                // const isLate = (params.value.split(":")[0]*1)+ (params.value.split(":")[1]*0.01)

                console.log("params", params.value.split(".")[0])
                return (<>
                    <div style={{ color: params.value > 9.15 ? "red" : "green" }}>
                        {params.value.split(".")[0] != "NaN" ?

                            `${params.value.toString().split(".")[0]}`
                            : "NaN"}
                    </div>
                </>)
            }
        },
        { field: "Out", headerName: "Out", width: 100 },
        {
            field: "Status", headerName: "Status", width: 150, renderCell: (params) => {

                return (<>
                    <div style={{ color: params.value == "Absent" ? "red" : "green" }}>
                        {params.value}

                    </div>
                </>)
            }
        },
        {
            field: "Action", headerName: "Action", width: 100, renderCell: (params) => {

                return (<Button variant="primary" onClick={() => {
                    console.log("paramsValue", params.value.employee._id)
                    setEmployee_ID(params.value.Employee_ID)
                    setName(params.value.Name)
                    console.log("req.params.value", params.value.in)
                    setIn(params.value.in)
                    setOut(params.value.out)
                    setIdOfEmployee(params.value.employee._id)
                    setTableData(data)
                    handleShow()
                }}>
                    Edit
                </Button>)
            }
        },



    ]

    const rows = data.filter((d) => d.Name.toLowerCase().includes(tableSearch.toLowerCase())).map((row) => ({

        id: row._id,

        Empid: row.Employee_ID,
        Name: row.Name,
        Date: row.Date,
        Department: row.department,
        In: row.in,//((row.in.split(":")[0] * 1) + (row.in.split(":")[1] * 0.01)).toFixed(2),
        Out: row.out,
        Status: row.in.split(":")[0] != "NaN" ? "Present" : "Absent",
        Action: row


    }))




    return (
        <div>



            <Modal style={{ marginTop: "30vh" }} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Employee Id:
                        <input value={Employee_ID} onChange={(e) => {


                            setEmployee_ID(e.target.value)

                        }}></input> </div>
                    Name:
                    <input value={Name} onChange={(e) => { setName(e.target.value) }}></input><br />
                    In:
                    <input type="time" value={In} onChange={(e) => { setIn(e.target.value) }}></input><br />
                    Out:


                    <input type="time" value={Out} onChange={(e) => { setOut(e.target.value) }}></input>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {

                        data.filter((d) => d.Employee_ID == Employee_ID)[0].Name = Name
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].in = In
                        data.filter((d) => d.Employee_ID == Employee_ID)[0].out = Out


                        updateAttendance()



                        setShow(false)

                    }}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* 
            <div className='userList' style={{ margin: "50px", marginBottom: "80px", width: "95%", height: "800px" }} ref={(el) => (componentRef = el)}>

                <DataGrid
                    rows={rows}
                    columns={columns}

                />

            </div> */}

            <div className="d-flex justify-content-center"  >

                <div >
                    <div className="d-flex justify-content-between">
                        {/* <img src={logo} alt="Sagacious" width={170} height={100} /> */}
                        <div className='mb-4'>
                            {/* <div className="d-flex justify-content-center">
                                <div style={{ fontSize: "26px", paddingTop: "10px" }}>Monthly Attendance: <span style={{ fontSize: "20px" }}>{rows[0] && rows[0].Date}</span></div>

                            </div> */}
                        </div>
                        <div style={{ width: 170 }}></div>
                    </div>


                    Search Employee: <input style={{ width: "50vw" }} value={tableSearch} onChange={(e) => { setTableSearch(e.target.value) }}></input>
                    <br />           
                    
                             <br />

                    <DataGrid
                        style={{ height: "55vh", width: "75vw" }}
                        rows={rows}
                        columns={columns}
                        pageSize={40}
                        disableSelectionOnClick
                        experimentalFeatures={{ newEditingApi: true }}
                    />

                </div>

            </div>

        </div>
    )
}

export default Table