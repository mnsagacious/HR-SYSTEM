import React, { useEffect } from "react";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import TextField from '@mui/material/TextField';
import EcxelImport from "./EcxelImport";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import Table from "./attendanceReportTable/Table";




const Attendance = () => {


  const [data, setData] = useState([]);
  const [employees, setEmployees] = useState();
  const [AttendanceToDB, setAttendanceToDB] = useState([]);


  const columns = [
    { field: "id", headerName: "EmployeeID", width: 90 },
    {
      field: "Name",
      headerName: "Name",
      width: 200,

    },
    {
      field: "In",
      headerName: "In",
      width: 200,

    },
    {
      field: "out",
      headerName: "out",
      width: 200,

    },

    {
      field: "status",
      headerName: "Full name",
      width: 200,

    },
    {
      field: "department",
      headerName: "department",
      width: 200

    }
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: "dd", age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];
  function NewToolbar() {
    return (<>
      <TextField />
    </>)
  }




  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tableData, setTableData] = useState([]);

  const url = "/postimport/attendance";
  const urlForEmployees = "/employees"
  let table = [];
  data.forEach((elem) => {
    table.push({
      Employee_ID: elem[0],
      Name: elem[1],
      Date: elem[2],
      in: elem[3],
      Out: elem[4],
      Duration: elem[5],
    });
  });

  let InTimes = [];

  // for in
  table.map((d) => {
    let fromExcel = d.in; //translates to 17:02:00
    let equivTimeIN = fromExcel * 24
    let hoursIN = Math.floor(equivTimeIN);

    // let hour = Math.floor(basenumber % 12 || 12).toString();
    // if (hour.length < 2) {
    //   hour = `0${hour}`
    // }

    var minutesIN = Math.round((equivTimeIN % 1) * 60)
    // if (minute.length < 2) {
    //   minute = `0${minute}`
    // }

    // console.log("hour",hoursIN,"minute",minutesIN)
    // const period1 = +basenumber < 12 ? 'AM' : 'PM';

    // console.log("processDate",d.Date.split('/'))

    let dayIN = d.Date.split('/')[0]
    let monthIN = d.Date.split('/')[1]
    let yearIN = d.Date.split('/')[2]

    // console.log("Dateeeeeee", new Date(yearIN,monthIN, dayIN, hoursIN, minutesIN, 0, 0))
    let InTime = hoursIN + ":" + minutesIN

    //for Out
    let outTime = d.Out;
    let equivTimeOUT = outTime * 24;
    let hoursOUT = Math.floor(equivTimeOUT);


    // if (hours.length < 2) {
    //   hours = `0${hours}`
    // }
    var minutesOUT = Math.round((equivTimeOUT % 1) * 60);
    // if (minutes.length < 2) {
    //   minutes = `0${minutes}`;
    // }
    // const period2 = +basenumber2 < 12 ? 'AM' : 'PM';


    let OutTime = hoursOUT + ":" + minutesOUT
    console.log("out", OutTime);

    let totalDuration = d.Out - d.in;
    let basenumber3 = totalDuration * 24;
    let hoursT = `${Math.floor(basenumber3).toString()} hours`
    if (hoursT.length < 2) {
      hoursT = `0${hoursT} hours`
    }
    var minutesT = `${Math.round((basenumber3 % 1) * 60).toString()} minutes`;

    if (minutesT.length < 2) {
      minutesT = `0${minutesT} minutes`

    }
    let DurationTime = `${hoursT} ${minutesT}`;
    console.log("duration", DurationTime)
    InTimes.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
      in: InTime,
      out: OutTime,
      duration: DurationTime
    });
  });

  // console.log("cONVERTED", InTimes);

  let converted = [];
  table.map((d) => {
    converted.push({
      Employee_ID: d.Employee_ID,
      Name: d.Name,
      Date: d.Date,
    });
  });
  console.log("table", table);
  // var finalData = JSON.stringify(table);
  // console.log(finalData);

  const postData = async () => {
    try {




      const tempAttendance = [];

      await tableData.map((i) => {

        const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0]

        const dateToAdd = new Date(`${i.Date.split("/")[2]}-${i.Date.split("/")[1]}-${i.Date.split("/")[0]}`)

        if (empData) {
          // delete i.Date

          tempAttendance.push({
            username: empData.username, month: month[dateToAdd.getMonth()], employee: empData._id, date: dateToAdd,
            status: i.in.split(':')[0] != "NaN" ? 'P' : 'A', ...i
          })
          i.department = "null"
          if (empData.departments.length > 0) {
            i.department = empData.departments[0].departmentname
          }
        }
      })




      const updateData = await setAttendanceToDB(tempAttendance)



      console.log("attendanceToDB", tempAttendance,"attendanceToDB", AttendanceToDB )




      //   const savedata = await axios.post(url,finalData)

      // const finalData = JSON.stringify(table)



      const savedata = await axios.post(url, tempAttendance);

      // console.log("savedata", savedata)
      NotificationManager.success("successfully posted");
    } catch (error) {
      console.log("eror",error);
      NotificationManager.error("Error Saving DATA");
    }
  };




  useEffect(() => {

    try {
      axios.get(urlForEmployees).then((res) => {

        setEmployees(res.data.employees)
        // console.log("ressssssssss",res.data.employees)
      });
      // const datas = res.data;
      // console.log("resssssss",datas)
      // setEmployees(datas)
    } catch (error) {
      console.log("error", error)
    }
  }, [])


  const createRequests = async () => {

    const tempAttendance = [];

    await InTimes.map((i) => {

      const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

      const empData = employees.filter((f) => f.emp_id == i.Employee_ID)[0]

      const dateToAdd = new Date(`${i.Date.split("/")[2]}-${i.Date.split("/")[1]}-${i.Date.split("/")[0]}`)

      if (empData) {
        // delete i.Date


        var formattedInTime = i.in

        if (i.in.split(":")[0].length == 1) {

          formattedInTime = `0${i.in.split(":")[0]}:${i.in.split(":")[1]}`

        }


        if (i.in.split(":")[1].length == 1) {

          formattedInTime = `${formattedInTime.split(":")[0]}:0${i.in.split(":")[1]}`

        }


        var formattedOutTime = i.out

        if (i.out.split(":")[0].length == 1) {

          formattedOutTime = `0${i.out.split(":")[0]}:${i.out.split(":")[1]}`

        }


        if (i.out.split(":")[1].length == 1) {

          formattedOutTime = `${formattedOutTime.split(":")[0]}:0${i.out.split(":")[1]}`

        }




        i.in = formattedInTime;
        i.out = formattedOutTime;


        tempAttendance.push({
          username: empData.username, month: month[dateToAdd.getMonth()], employee: empData._id, date: dateToAdd, in: formattedInTime, out: formattedOutTime,
          status: i.in.split(':')[0] != "NaN" ? 'P' : 'A', ...i
        })
        i.department = "null"
        if (empData.departments.length > 0) {
          i.department = empData.departments[0].departmentname
        }
      }
    })

    setTableData(InTimes)



    setAttendanceToDB(tempAttendance)

  };



  return (
    <>
      <div>

        {console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaa", tableData)}

        <div className="content-wrapper">
          {/* <section className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1>Attendance</h1>
                </div>
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="#" className="anch">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>
              </div>
            </div>
          </section> */}
          <section className="content mt-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header buttoncolor">
                      <h3 className="card-title" style={{ color: "white" }}>
                        Daily Attendance Uploader
                      </h3>
                    </div>
                    <div className="card-body">
                      <div style={{ height: '700px' }}>

                        <div className="d-flex" style={{ marginLeft: "20px", width: "75vw" }}>
                          <div style={{ width: "50vw" }}>
                            <EcxelImport uploadHandler={setData} />
                          </div>


                          {/* <div style={{marginTop:"15px"}}> */}
                          <button
                            onClick={createRequests}
                            style={{
                              border: "none",
                              backgroundColor: "#17a392",
                              color: "white",
                              margin: "10px",
                              marginLeft: "auto",

                              marginTop: "25px",
                              borderRadius: "5px",
                              width: "180px",
                              height: "40px",

                            }}
                          >
                            Fetch Data from Excel
                          </button>





                          <button
                            onClick={postData}
                            style={{
                              border: "none",
                              paddingTop: "100px",
                              backgroundColor: "#17a392",

                              color: "white",
                              padding: "8px",
                              borderRadius: "5px",
                              width: "180px",
                              height: "40px",
                              marginTop: "25px",
                            }}
                          >
                            Submit Attendance
                          </button>
                          {/* </div> */}
                        </div>
                        <Table data={tableData} setTableData={setTableData} />


                        {/* <DataGrid
                          rows={rows}
                          columns={columns}
                          pageSize={30}
                          disableSelectionOnClick
                          experimentalFeatures={{ newEditingApi: true }}
                          components={{
                            Toolbar: NewToolbar
                          }}
                        /> */}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <NotificationContainer />
      </div>
    </>
  )
}

export default Attendance




