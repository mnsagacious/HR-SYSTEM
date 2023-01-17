import React, { useEffect, useState } from "react";
// import '../../dist/css/adminlte.min.css'
// import 'font-awesome/css/font-awesome.min.css';
import { useContext } from "react";
import { Context } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Menu from './Menu'
const Header = () => {
    
  const { user, dispatch,companydata} = useContext(Context);
  const [selected,setselected] = useState("")
  const [loading,setloading] = useState(false)
  const [title,settitle] = useState(JSON.parse(localStorage.getItem("selected company")) || "")
  const [update,setupdate]= useState(false);
 
  console.log(title,"title");
  const getitem = () => {
   const lastselected = JSON.parse(localStorage.getItem("selected company") || null)
   console.log("last selected", lastselected)
   setselected(lastselected)
  }


  useEffect(()=>{
      title.length!="" && handleQuery();
      const lastselected = JSON.parse(localStorage.getItem("selected company")|| null);
      setselected(lastselected)
      
     
  },[title])
  const handleQuery = async() =>{    
     try{
          const query = await axios.get(`/companies/query?title=${title}`);
          console.log('query',query);
          await dispatch({type:"COMPANY_SWITCH",payload:query.data});
          navigate('/dashboard');
         if(title.length !=""){
          return localStorage.setItem('selected company',JSON.stringify(title));
         }
         
     }catch(error){
       console.log(error);
     }
  }
  // const handleCompany = async()=>{
  //    await dispatch({type:"COMPANY_SWITCH",payload:results && results});
  // }
  const navigate = useNavigate();
  console.log("headercompany",companydata)
  return (
    <>
      <div className="wrapper">
        {/* <!-- Navbar --> */}
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          {/* <!-- Left navbar links --> */}
          {/* <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item ">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="/"
                role="button"
              >
                <i className="fas fa-bars"></i>
              </a>
            </li> */}
            
             <li className="nav-item d-none d-sm-inline-block d-flex align-items-center justify-content-center">
              <a className="nav-link" style={{fontWeight:'600',fontSize:'20px',color:'black'}}>
                { companydata && companydata.title}
              </a>
             </li>
           
           
          {/* </ul> */}

          {/* <!-- Right navbar links --> */}
          <ul className="navbar-nav ml-auto">
            {/* <!-- Navbar Search --> */}

            {
              user.role == 'CEO' && <Form>
              <Form.Select onChange={async(e)=>{await settitle(e.target.value); setupdate(!update)}} name='title' value={title && title} required>
              <option disabled selected hidden value={""}>Select Company</option>
                {user.companies.map((d, i) => {
                  return (
                    <>
                      <option key={i}>{d.title}</option>
                    </>
                  );
                })}
              </Form.Select>
            </Form>
            }
            <li className="px-2">
               <Menu/>
              {/* <Button onClick={handleLogout}>Logout</Button> */}
            </li>
          </ul>
          {/* <div>
            <img src={spinner} alt="spinner"/>
          </div> */}
        </nav>
      </div>
     
    </>
  );
};

export default Header;
