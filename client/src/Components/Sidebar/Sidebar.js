
import React from 'react';
// import '../../dist/css/adminlte.min.css'
import logo from '../../Assets/img/AdminLTELogo.png'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Context } from "./../../Context/Context";
import { useContext } from "react";
import companyLogo from '../../Assets/company logo/Sagacious-Systems-Logo.png'
const Sidebar = () => {
  const context = useContext(Context);

  const [toggleLeaves, settoggle] = useState(false)
  const [toggleAttendance, settoggleAttendance] = useState(false)



  return (
    <>
      {/* <!-- Main Sidebar Container --> */}
      {/* <aside className="main-sidebar sidebar-dark-primary elevation-4  " style={{position:"fixed"}}> */}
      <aside className="main-sidebar  elevation-4  " style={{ position: "fixed", backgroundColor: "#00695c", color: "#fff" }}>
        {/* <!-- Brand Logo --> */}
        <Link to="/dashboard" className="brand-link">
          <div className='d-flex align-items-center justify-content-center  elevation-1 rounded  p-2 ' style={{background:"#ffff"}}>
              <img src={companyLogo} className='brand-image' style={{width:'10vw'}}/>
          </div>
        
          {/* <img src={companyLogo} alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: .8 }} />
          <span className="brand-text font-weight-light text-white">Sagacious Systems</span> */}
        </Link>
        {/* <!-- Sidebar --> */}
        <div className="sidebar">
          {/* <!-- Sidebar user (optional) --> */}
          <div className="user-panel mt-3 pb-1 mb-2 d-flex">

            <div className="info text-decoration-none border-bottom-0 w-100">
              <Link to="/dashboard" className="d-block text-white w-100 text-center   font-weight-bold text-lg">Human Resource</Link>
            </div>
          </div>
          {/* <!-- SidebarSearch Form --> */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw"></i>
                </button>
              </div>
            </div>
          </div>
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-2" style={{ color: "#fff" }}>
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* <!-- Add icons to the links using the .nav-icon className
               with font-awesome or any other icon font library --> */}
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt iconColor" ></i>
                  <p className='iconColor'>
                    Dashboard
                  </p>
                </Link>
              </li>
              {context.user.isAdmin &&

                <li className="nav-item">
                  <Link to="/employees" className="nav-link">
                    <i className="nav-icon fa-solid fa-user iconColor"></i>

                    <p className='iconColor'>
                      Employees
                    </p>
                  </Link>

                </li>
              }

              {context.user.isAdmin &&
                <li className="nav-item">
                  <Link to="/departments" className="nav-link">
                    <i className="nav-icon fa-solid fa-user iconColor"></i>

                    <p className='iconColor'>
                      Departments
                    </p>
                  </Link>

                </li>
              }
              <li className="nav-item">
                <Link to="/leaves" className="nav-link">
                  <i className="nav-icon fa-solid fa-user iconColor"></i>

                  <p className='iconColor'>
                    Leave Types
                  </p>
                </Link>

              </li>



              <li className='nav-item' onClick={() => { settoggle(!toggleLeaves) }}>
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <i className='nav-icon fa-solid fa-user iconColor'></i>
                  <p className='iconColor'>Leave Management</p>
                  <i className='nav-icon fa-solid fa-chevron-down iconColor' style={{ fontSize: "13px" }}></i>
                  {
                    toggleLeaves && <>
                      <Link to={'/leaverequest'} className='nav-link '>
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                        <p className='iconColor'>Request Leave</p>
                      </Link>
                      <Link to={'/manageleaves'} className="nav-link">
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>
                        <p className='iconColor'>Manage Leaves </p>
                      </Link>

                    </>
                  }
                </a>

              </li>


              {/* <li className="nav-item"> */}
              {/* <a  className="nav-link"> */}
              {/* <Link to={"attendance"} style={{textDecoration:"none"}} className="nav-link">
                <i className="nav-icon fa-solid fa-user iconColor"></i>
                  
                
                  <p className='iconColor'>
                     Projects
                  </p>
                 
                   
                  </Link> */}
              {/* </a> */}

              {/* </li> */}

              {/* <li className="nav-item">
                <Link to="/calendar" className="nav-link">
                <i className=" nav-icon fa-solid fa-calendar-days iconColor"></i>
                 
                    <p className='iconColor'>
                     Calandar
                    </p>
                  </Link>
                
              </li> */}
              {/* <li className="nav-item">
                <Link to="/holidays" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>
                 
                    <p className='iconColor'>
                      Holidays
                    </p>
                  </Link>
                
              </li> */}
              <li className="nav-item">
                <Link to="/attendance" className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt iconColor" ></i>
                  <p className='iconColor'>
                    Attendance
                  </p>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link to="/datamanagement" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>

                  <p className='iconColor'>
                    Attendance Report
                  </p>
                </Link>

              </li> */}



              <li className='nav-item' onClick={() => { settoggleAttendance(!toggleAttendance) }}>
                <a className='nav-link' style={{ cursor: 'pointer' }}>
                  <div className='d-flex'>
                    <i className='nav-icon fa-solid fa-user iconColor my-3' ></i> &nbsp;

                    <p className='iconColor'> Attendance Management</p>
                    <i className='nav-icon fa-solid fa-chevron-down iconColor my-3' style={{ fontSize: "13px" }}></i>
                  </div>
                  {
                    toggleAttendance &&
                    <>
                      <Link to="/datamanagement" className="nav-link">
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>

                        <p className='iconColor'>
                          Reports
                        </p>
                      </Link>
                      <Link to="/monthlyattendance" className="nav-link">
                        <i class="fa-solid fa-angle-right iconColor nav-icon" style={{ fontSize: "13px" }}></i>

                        <p className='iconColor'>
                          History
                        </p>
                      </Link>
                    </>
                  }
                </a>

              </li>


              <li className="nav-item">
                <Link to="/monthlypayroll" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>

                  <p className='iconColor'>
                    Monthly Payroll
                  </p>
                </Link>

              </li>
              <li className="nav-item">
                <Link to="/payrollsetup" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>

                  <p className='iconColor'>
                    PayRoll Setup
                  </p>
                </Link>

              </li>


              {/* <li className="nav-item">
                <Link to="/monthlyattendance" className="nav-link">
                  <i className="nav-icon  fa-solid fa-user iconColor"></i>

                  <p className='iconColor'>
                    Monthly Attendance
                  </p>
                </Link>

              </li> */}




            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    </>
  )
}

export default Sidebar;