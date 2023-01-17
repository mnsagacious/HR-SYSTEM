import React from 'react'
import { Card,Row,Col, Container } from 'react-bootstrap'
import Present from '../../../charts/CeoDahboard/RadialBar/Present';
import Absents from '../../../charts/CeoDahboard/RadialBar/Absents';
import OverAllStatus from '../../../charts/CeoDahboard/Donot/OverAllStatus';
import CurrentDayStatus from '../../../charts/CeoDahboard/Donot/CurrentDayStatus';
const Attendance = () => {
  return (
    <div>
       
               <Row>
               <Card>
                    <Card.Header style={{backgroundColor:'white'}}><h4 className='mb-0'>Attendance</h4></Card.Header>
                    <Card.Body>
                        <Row>
                        <Col xxl='3'>                     
                      <Card className='dashboard'>
                        <Card.Header><h6 className='mb-0 font-weight-bold'>Today's Present</h6></Card.Header>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                        <Present/>
                       </div>
                    </Card>
                 </Col>
                 <Col xxl='3'>
                    <Card className='dashboard'>
                        <Card.Header><h6 className='mb-0 font-weight-bold'>Today's Absent</h6></Card.Header>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                        <Absents/>
                       </div>
                    </Card>
                 </Col>
                 <Col xxl='3'>
                    <Card className='dashboard'>
                        <Card.Header><h6 className='mb-0 font-weight-bold'>Overall Attendance</h6></Card.Header>
                       {/* <div style={{width:'100%'}}>
                       <div className='d-flex flex-row justify-items-center align-items-center'>
                          <div>
                          <OverAllStatus/>
                          </div>
                        </div>
                       </div> */}
                       <div className='d-flex justify-content-center align-items-center h-100'>
                        <OverAllStatus/>
                       </div>
                    </Card>
                 </Col>
                 <Col xxl='3'>
                    <Card className='dashboard'>
                        <Card.Header clas><h6 className='mb-0 font-weight-bold'>Current Day Status</h6></Card.Header>
                        <div className='d-flex justify-content-center align-items-center h-100'>
                        <CurrentDayStatus/>
                       </div>
                    </Card>
                 </Col>
                        </Row>
                    </Card.Body>
                </Card>
               </Row>
           
           
        
        
    </div>
  )
}

export default Attendance
