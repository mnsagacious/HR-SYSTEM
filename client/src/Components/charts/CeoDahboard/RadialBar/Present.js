import React from 'react'
import Chart from 'react-apexcharts'
import {Context} from '../../../../Context/Context'
import axios from 'axios';
const Present = () => {
    const chartData = {
        series: [40],
      
        options: {
          chart: { type: "radialBar",},
          colors:['#00e396'],
          labels:['Present'],
        //   legend: { 
        //     show: true ,
        //     fontSize: '11px',
        //     fontFamily: 'Helvetica, Arial',
        //     fontWeight: 400,
        //     position:'bottom'
        //  },
         stroke: {
          lineCap: "round"
        },
          dataLabels: { enabled:false },
          tooltip: { enabled: true },
          plotOptions: {
            radialBar: {
                hollow: {
                  size: '65%',
                }
              },
             
          }
        }
      };
  return (
    <div style={{maxWidth:'100%'}}>
       <Chart options={chartData.options} series={chartData.series} type='radialBar' height={200}/>
    </div>
  )
}

export default Present
