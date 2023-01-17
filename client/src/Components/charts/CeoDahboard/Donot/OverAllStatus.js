import React from 'react'
import Chart from 'react-apexcharts'
const OverAllStatus = () => {
    const chartData = {
        series: [14,1,3],
      
        options: {
          
          labels:['Present', 'Absent','On Leave'],
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
      <Chart type='donut' options ={chartData.options} series={chartData.series}/>
   
    </div>
  )
}

export default OverAllStatus
