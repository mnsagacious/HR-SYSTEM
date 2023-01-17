import Chart from 'react-apexcharts'
import React, { Component, useEffect,useState,useContext } from 'react';
import {Context} from '../../../../Context/Context'
import axios from 'axios';
const Status = () => {
  
  const chartData = {
    series: [23,20],
  
    options: {
      chart: { type: "donut" },
      labels:['Permanent','Contracts'],
      legend: { 
        show: true ,
        fontSize: '11px',
        fontFamily: 'Helvetica, Arial',
        fontWeight: 400,
        position:'bottom'
     },
      dataLabels: { enabled: false },
      tooltip: { enabled: true },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: "67%",
           
          },
          total: {
            show: true,
            showAlways: true,}
        }
      }
    }
  };
  return (
    <div style={{maxWidth:'300px'}}>
      <Chart type='donut' options ={chartData.options} series={chartData.series}/>
    </div>
  )
}

export default Status
