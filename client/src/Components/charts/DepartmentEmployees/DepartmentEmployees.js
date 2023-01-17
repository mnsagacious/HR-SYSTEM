import Chart from 'react-apexcharts'
import React, { Component, useEffect,useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import {Context} from '../../../Context/Context'
const DepartmentEmployees = () => {
  // const [options,setOptions] = useState({
  //   legend: {
  //     show: true,
  //     position: 'right',
  //     horizontalAlign: 'center'
  //   },
  // })
  
  const {user} = useContext(Context);
  const [Labels,setLabels] = useState([])
  const [Series,setSeries] = useState([])
  
   const getData = async() =>{
    try{
           const noofemployees = await axios.get(`/departments/get/info/${user.company}`);
           console.log(noofemployees);
           const Labels = []
           const Series=[];
           noofemployees.data.depwiseemployees.map((d)=>{
                
                Labels.push(d.departmentname);
                Series.push(d.employees)
           })
           setLabels(Labels);
           setSeries(Series)
           console.log("series",Labels);
           console.log("data",Series);
    }catch(error){
      console.log(error)
    }
   }
   useEffect(()=>{
     getData()
   },[])
   console.log("UseState Data",Labels,Series)
  
   const options = {
   
   
    fill: {
      colors: ["#008FFB","#00E396","#F9C80E","#FF4560","#662E9B","#2B908F","#F86624"]
    },
    labels:Labels,
    dataLabels: {
      style: {
        colors: ['#fff']
      }
    },
    colors:["#008FFB","#00E396","#F9C80E","#FF4560","#662E9B","#2B908F","#F86624"],
   
  
   
  }
  
  const [department,setDepartment] = useState([])
  // const [labels,setlabels] = useState()
  const fetch = async() =>{
    try{
      const res =  await axios.get("departments")
      const data = res.data.departments
      console.log(data);
      setDepartment(data)

    }catch(error){
      console.log(error)
    }

  }
  useEffect(()=>{
    fetch();
 },[])
  const labels = []
  department.map((d)=>{
     labels.push({
      departments:d.departmentname
     })
  })
 console.log(labels)
 const series = labels.map((d)=>{
  return d.departments
 })
 console.log("series",series)
const data = [44, 55, 41, 17, 15]

 
  return (
    <div className="donut">
    <Chart options={options}  series={Series} type="pie" width="400" />
  </div>
  )
}

export default DepartmentEmployees