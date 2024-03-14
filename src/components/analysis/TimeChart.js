import React from 'react';
import Chart from "react-apexcharts";

function getOptions() {
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
      type: 'datetime',
      format: 'dd MMM',
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        datetimeFormatter: {
            year: 'yyyy',
            month: "MMM 'yy",
            day: 'dd MMM',
            hour: 'HH:mm',
        }
      }
    },
    yaxis: {
        show: true,
        tickAmount: 4,
        labels: {
            align: 'right',
            formatter: function(val, index) {
                return Math.floor(val);
            }
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
                    tickAmount: 4,
                    labels: {
                        show: false,
                    }
                }
            }
        }
    ]
  };
}

function getSeries(data, days) {
    var endDate = new Date(data[0].created_at);
    var startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - days);
    var filteredData = data.filter(data => {
        var date = new Date(data.created_at)
        return date > startDate && date <=endDate
    })
    var dateDict = {}
    filteredData.forEach(data => {
        var date = new Date(data.created_at).toLocaleDateString()
        
        if (date in dateDict) {
            dateDict[date].push(parseFloat(data.value))
        } else {
            dateDict[date] = [parseFloat(data.value)]
        }
    });
    var vals = [];
    for (const key in dateDict) {
        let sum = 0.0;
        let length = dateDict[key].length
        dateDict[key].forEach((el) => sum += el)
        console.log(sum, length)
        vals.push({'x':key,'y':(sum/length).toFixed(2)})
    }

    return [
        {
          name: data[0].name+" ("+data[0].unit+")",
          data: vals
        }
      ];

}

function TimeChart({data, days}) {
    if (!data || data.length === 0) { return }
        
    return (
        <Chart
            options={getOptions(data, days)}
            series={getSeries(data, days)}
            type="area"
        />
    );
  }
  
export default TimeChart;
  
