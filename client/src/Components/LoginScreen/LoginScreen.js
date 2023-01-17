import React from "react";
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap";
import mainlogo from "../../Assets/company logo/main.png";
import { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import {Context} from '../../Context/Context'
import { NotificationContainer,NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
const LoginScreen = () => {
  const owners ='/owners/auth/login';
  const users='/auth/login';
  
    const [orgurl,seturl] = useState("")
    console.log("valueurl",orgurl);
    const navigate = useNavigate();
    var url;
    const [auth,setauth] = useState({
      username:"",
      password:""
    })
    const handleChange = async(e) =>{
       e.preventDefault()
      let name,value;
      name= e.target.name;
      value = e.target.value;
       setauth({
        ...auth,
        [name]:value
      })

    }
    const {user ,dispatch } = useContext(Context)
  const handleApi = async() =>{
      try{ 
           if(orgurl === 'CEO'){
            url=owners
           }
           else if(orgurl === 'HR' || 'Employee'){
            url=users
           }
           else{
            url=""
           }
           console.log(url,'urls')
      }catch(error){
        console.log(error)
      }
      dispatch({type:"LOGIN_START"});
      try{
        const response =  await axios.post(orgurl && url,{
          username:auth.username,
          password:auth.password
        });
        dispatch({type:"LOGIN_SUCCESS",payload:response.data});
        response && navigate("/dashboard")
        return response;
        NotificationManager.success("Successfully LogedIn")
      }catch(error){
         dispatch({type:"LOGIN_FAILURE",payload:error});
         NotificationManager.error("Failed to login")
      }
  }
  

  return (
    <>
      <Container style={{ height: "100vh" }}>
      <div className="d-flex justify-content-center my-5">
        {/* <div>
        <Form.Label>Role Type</Form.Label>
        <Form.Select>
            <option>HR</option>
            <option>Owner</option>
            <option>Employee</option>
        </Form.Select>
        </div> */}
        <div className="d-flex align-items-center ">
          <div>
            <img src={mainlogo} style={{ width: "200px" }} />
          </div>
        </div>
      </div>
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "50%" }}
      >
        <Col xxl="6">
          <Card>
            <Card.Title>
              <h3>HR Portal</h3>
            </Card.Title>
            <hr></hr>
            <Card.Body>
              <div className="d-flex justify-content-end " >
                <div >
                  <Form.Label>Role</Form.Label>
                  <Form.Select  name='role' required onChange={(e)=>{seturl(e.target.value)}}>
                    <option disabled selected hidden>Please Select</option>
                    <option>CEO</option>
                    <option>HR</option>
                    <option>Employee</option>
                  </Form.Select>
                </div>
              </div>
              <Form.Label>username</Form.Label>
              <Form.Control type="text" name='username'  value={auth.username} onChange={(e)=>{handleChange(e)}}></Form.Control>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name='password'  value={auth.password} onChange={(e)=>{handleChange(e)}}></Form.Control>
              <div className="my-3 d-flex justify-content-center">
                <Button onClick={handleApi}>Login</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <NotificationContainer/>
    </Container>
   
    </>
  );
};

export default LoginScreen;
