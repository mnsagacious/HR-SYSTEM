import React from 'react'
import Chart from 'react-apexcharts'
import {Context} from '../../../../Context/Context'
import axios from 'axios';
const Absents = () => {
    const chartData = {
        series: [60],
        options:{
            colors: ["#e90627"],
            labels:['Absents'],
            // legend: { 
            //     show: true ,
            //     fontSize: '11px',
            //     fontFamily: 'Helvetica, Arial',
            //     fontWeight: 400,
            //     position:'bottom'
            //  },
             stroke: {
                lineCap: "round",
              },
            plotOptions: {
                radialBar: {
                hollow: {
                    margin: 0,
                    size: "65%",
                    background: "#fff"
                },
               
                
                dataLabels: {
                    name: {
                    offsetY: -10,
                    color: "#e90627",
                    fontSize: "13px"
                    },
                    value: {
                    color: "#111",
                    fontSize: "20px",
                    show: true,
                    textAlign:'center'
                    }
                }
                }
            },
            },
           
           
           labels: ["Absents"]
        }
        
    
    //     options: {
    //       chart: { type: "radialBar",},
    //       labels:['Absents'],
    //       legend: { 
    //         show: true ,
    //         fontSize: '11px',
    //         fontFamily: 'Helvetica, Arial',
    //         fontWeight: 400,
    //         position:'bottom'
    //      },
        
    //       dataLabels: { enabled:false },
    //       tooltip: { enabled: true },
    //       plotOptions: {
    //         radialBar: {
    //             hollow: {
    //               size: '50%',
    //             },
    //             fill:{
    //                 // color:'black',
    //                 type: "gradient",
    //                 gradient: {
    //                   shade: "dark",
    //                   type: "vertical",
    //                   gradientToColors: ["#87D4F9"],
    //                   stops: [0, 100]
    //                 }
                    
    //             }
    //           },
                
              
              
    //       }
    //     }
    //   };
  return (
    <div style={{maxWidth:'100%'}}>
       <Chart options={chartData.options} series={chartData.series} type='radialBar' height={200}/>
    </div>
  )
  }

export default Absents
