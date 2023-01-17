import React from 'react'
import Chart from 'react-apexcharts'
const CurrentDayStatus = () => {
    const chartData = {
        series: [4,7,9],
      
        options: {
         
          labels:['In Time', 'Tardy','Late'],
          legend: { 
            show: true ,
            fontSize: '11px',
            fontFamily: 'Helvetica, Arial',
            fontWeight: 400,
            position:'bottom'
         },
          dataLabels: { enabled:false },
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
      <Chart type='pie' options ={chartData.options} series={chartData.series}/>
   
    </div>
  )
}

export default CurrentDayStatus
