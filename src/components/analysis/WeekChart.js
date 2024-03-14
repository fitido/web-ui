import React from 'react';
import Chart from "react-apexcharts";

function getOptions(data) {
    var endDate = new Date(data[0].created_at);
    var startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);
    var xaxis_labels = []
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        xaxis_labels.push(date.toLocaleString('en-US', { weekday: 'short' })); 
    }
return {
    chart: {

        id: "basic-bar",
        height: "100%",
        maxWidth: "100%",
        type: "area",
        foreColor: '#6B7280',
        fontFamily: "Inter, sans-serif",
        dropShadow: {
            enabled: false,
        },
        toolbar: {
            show: false,
        },
    },
    colors: ['#FDBA8C'],
    tooltip: {
        enabled: true,
        x: {
          show: false,
        },
    },
    fill: {
        type: 'gradient',
        gradient: {
            enabled: true,
            opacityFrom: 0.45,
            opacityTo: 0
        }
    },
    dataLabels: {
        enabled: false,
    },
    markers: {
        size: 5,
        strokeColors: '#ffffff',
        hover: {
            size: undefined,
            sizeOffset: 3
        }
    },
    grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
            left: 15,
            right: 2,
            top: -20
        },
    },
    legend: {
        show: false
    },
    stroke: {
        width: 3,
        curve: 'smooth'
    },
    xaxis: {
      categories: xaxis_labels,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
      }
    },
    yaxis: {
        show: true,
        stepSize: 30,
        labels: {
            align: 'right',
        }
    },
    responsive: [
        {
            breakpoint: 1024,
            options: {
                grid: {
                    show: true,
                    strokeDashArray: 4,
                    padding: {
                        left: 2,
                        right: 2,
                        top: -20
                    },
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                }
            }
        }
    ]
  };
}

function getSeries(data) {
    var endDate = new Date(data[0].created_at);
    var startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 6);

    var filteredData = data.filter(data => {
        var date = new Date(data.created_at)
        return date > startDate && date <=endDate
    })

    var vals = filteredData.map(data => {
        return data.value;
    });

    console.log(vals.slice(0,7));
    return [
        {
          name: data[0].name+" ("+data[0].unit+")",
          data: vals.slice(0,7)
        }
      ];

}

function WeekChart({data, days}) {
    if (!data && data.length === 0) { return }
        
    return (
        <Chart
            options={getOptions(data, days)}
            series={getSeries(data, days)}
            type="area"
        />
    );
  }
  
export default WeekChart;
  
