import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeLeaves from "./Components/Pages/EmpLeaves/EmployeeLeaves";
import EmpAttendance from "./Components/Pages/EmpAttendance/EmpAttendance";
import EmpHolidays from "./Components/Pages/EmpHolidays/EmpHolidays";
import AllEmployees from "./Components/Employee Data/All Employees/AllEmployees";
import Calendar from "./Components/Calendar/Calendar";
import EmpDetails from "./Components/Employee Data/Emp Details 2/EmpDetails";
import CalendarDetails from "./Components/Calendar/CalendarDetails";
import { Context } from "./Context/Context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Leaves from './Components/Pages/Leaves/Leaves'
import "./index.css";
import DataManagement from "./Components/DATA Management/DataManagement";
import Login from "./Auth/Login/Login";
import Departments from "./Components/Pages/Departments/Departments";
import LeaveRequest from "./Components/Pages/Leave Management/leaveRequest/LeaveRequest";
import ManageLeaves from "./Components/Pages/Leave Management/All Leave Reuests/ManageLeaves";
import './index.css'
import Dashboard from "./Components/Dashboard/Dashboard";
import DashboardNonAdmin from "./Components/Dashboard/DashboardNonAdmin";
import MonthlyPayroll from "./Components/Pages/MonthlyPayroll/MonthlyPayroll";
import MonthlyAttendance from "./Components/Pages/MonthlyAttendance/MonthlyAttendance";
import SetupPayroll from "./Components/PayRoll/Setup Payroll/SetupPayroll.js";


function App() {
  const context = useContext(Context);
  return (
    <>
      <BrowserRouter>
        {context.user ? (
          <>
            <Sidebar />
            <Header />

            <Routes>
              {/* <Route path="/Leaves" element={<EmployeeLeaves />} /> */}
              <Route path="/" element={<Navigate to="/dashboard"/>}></Route>
              {context.user.isAdmin && <Route path="/dashboard" element={<Dashboard/>}/> }

              <Route path="/dashboard" element={<DashboardNonAdmin/>}/>
              <Route path="/attendance" element={<EmpAttendance />} />
              <Route path="/holidays" element={<EmpHolidays />} />
              <Route path="/employees" element={<AllEmployees />} />
              <Route path="/employees/:id" element={<EmpDetails />} />
              <Route path="/calendar" element={<Calendar />}></Route>
              <Route path="/calendar/:id" element={<CalendarDetails />}></Route>
              <Route path="/datamanagement" element={<DataManagement />} />
              <Route path ='/leaves' element={<Leaves/>}/>
              <Route path='/departments' element={<Departments/>}/>
              <Route path="/leaverequest" element={<LeaveRequest/>}/>
              <Route path="/manageleaves" element={<ManageLeaves/>}></Route>
              <Route path="/monthlypayroll" element={<MonthlyPayroll/>}></Route>
              <Route path="/monthlyattendance" element={<MonthlyAttendance/>}></Route>
              <Route path="/payrollsetup" element={<SetupPayroll/>}></Route>
             

            </Routes>

            <Footer />
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
               <Route exact path="/login" element={<Login />} /> 
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
