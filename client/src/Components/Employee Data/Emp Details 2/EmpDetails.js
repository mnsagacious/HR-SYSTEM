import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import Cards from './Card'
import pp from '../All Employees/avatar.png'
import Moment from 'react-moment';
import "./card.css"
const EmpDetails = () => {
   
    const location = useLocation()
    const path = location.pathname.split("/")[2]
    console.log(path)
    const [emp, setEmp] = useState({})
    
    useEffect(() => {
        
        const fetchEmp = async () => {
            const res = await axios.get('/employees/'+ path)
            console.log(res)
            setEmp(res.data)               
        }
        fetchEmp();

    }, [path])

    const cardDetail = {
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        fontSize:"17px",
       
    }
    const cardImg = {
        marginTop:"3px",
        display: "flex",
        flexDirection:"column",
        justifyContent: "start",
        alignItems:"start"
    
      }
      const applyImgStyle = {
       
        borderRadius: "50%",
        width: "160px",
        height: "160px",
        marginTop: "2px",
    
      }
    

    return (
        <>
            <div className='content-wrapper my-2' style={{ backgroundColor: '#f7f7f7' }}>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className='row align-items-center'>
                            <div className='col'>
                                <h3 className='page-title'>Employee Details</h3>
                                <ul className='breadcrumb' style={{ backgroundColor: '#f7f7f7' }}>
                                    <li className="breadcrumb-item">
                                        <Link to='/' style={{ color: '#1f1f1f' }}>Dashboard</Link>
                                    </li>
                                    <li className='breadcrumb-item '>
                                        <Link to='/employees' style={{ color: "#1f1f1f" }}>Employees</Link>
                                    </li>
                                    <li className='breadcrumb-item active'>
                                        Employee Detail
                                    </li>

                                </ul>

                            </div>
                        </div>
                    </div>
                </section>
                <section className='content'>
                    <div className='content-fluid'>
                        <div className='row gy-3 justify-content-center'>
                            <div className="col-md-10 col-sm-10 col-12 col-lg-10 col-xl-10 " >
                                <Cards data={emp}/>                               
                            <div />
                        </div>
                    </div>
                
                    </div>
                </section>
              

            </div>

        </>
    )
}

export default EmpDetails;