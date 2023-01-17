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
import Leaves from './Components/Pages/Leave Management/Leaves/Leaves'
import "./index.css";
import DataManagement from "./Components/DATA Management/DataManagement";
import Login from "./Auth/Login/Login";
import Departments from "./Components/Pages/Departments/Departments";
import LeaveRequest1 from "./Components/Pages/Leave Management/leaveRequest/LeaveRequest1";
import ManageLeaves from "./Components/Pages/Leave Management/All Leave Reuests/ManageLeaves";
import './index.css'
import Dashboard from "./Components/Dashboard/Hr Dashboard/Dashboard";
import DashboardNonAdmin from "./Components/Dashboard/Non Admin/DashboardNonAdmin";
import MonthlyPayroll from "./Components/Pages/MonthlyPayroll/MonthlyPayroll";
import MonthlyAttendance from "./Components/Pages/MonthlyAttendance/MonthlyAttendance";
import SetupPayroll from "./Components/PayRoll/Setup Payroll/SetupPayroll.js";
import LoginScreen from "./Components/LoginScreen/LoginScreen";
import Companies from "./Components/Companies/Companies";
import DashboardCeo from './Components/Dashboard/Ceo Dashboard/DashboardCeo'
import EmployeeData from "./Components/Employee Data/All Employees/EmployeeData";
import {Redirect} from 'react-router-dom';
import LeaveSettings from './Components/Pages/Leave Management/Leave Settings/LeaveSettings'
import Positions from "./Components/Positions/Positions";
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
              {context.user.role==='HR' && <Route path="/dashboard" element={<Dashboard/>}/> }
              {context.user.role ==='CEO' && <Route path='/companies' element={<Companies/>}/> }
              {context.user.role === 'CEO' && <Route path="/dashboard" element={<DashboardCeo/>}></Route>}
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
              <Route path="/leaverequest" element={<LeaveRequest1 />}/>
              <Route path="/manageleaves" element={<ManageLeaves/>}></Route>
              <Route path="/monthlypayroll" element={<MonthlyPayroll/>}></Route>
              <Route path="/monthlyattendance" element={<MonthlyAttendance/>}></Route>
              <Route path="/payrollsetup" element={<SetupPayroll/>}></Route>
              <Route path="/positions" element={<Positions/>}></Route>
             <Route path="/employeeData" element={<EmployeeData/>}></Route>
             <Route path="/leavesettings" element={<LeaveSettings/>}></Route>

            </Routes>

            <Footer />
          </>
        ) : (
          <>
           
            <Routes>
               
              <Route path="/" element={<Navigate to="/login" />} />
               <Route exact path="/login" element={<LoginScreen />} /> 
            </Routes>
          </>
        )}
      </BrowserRouter>
    </>
  );
}

export default App;
