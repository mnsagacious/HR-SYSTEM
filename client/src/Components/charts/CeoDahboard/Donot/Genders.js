import Chart from 'react-apexcharts'
import React, { Component, useEffect,useState,useContext } from 'react';
import {Context} from '../../../../Context/Context'
import axios from 'axios';
const Genders = () => {
  
  const chartData = {
    series: [15,5],
  
    options: {
      chart: { type: "donut" },
      labels:['Males', 'Females'],
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
    <div style={{maxWidth:'270px'}}>
      <Chart type='donut' options ={chartData.options} series={chartData.series}/>
    </div>
  )
}

export default Genders
