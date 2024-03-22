import React, {useState} from 'react';
import {useQuery} from 'react-query';
import fetchWithBaseUrl from '../Fetch.js'
import TimeChart from "./TimeChart.js";
import { Dropdown } from 'flowbite-react';
import {VscArrowUp, VscArrowDown} from 'react-icons/vsc';

const fetchMetric = async (metric, traineeId) => {
  const response = await fetchWithBaseUrl('/metric_logs/'+ metric +'/'+traineeId);
  const data = await response.json();
  return data;
};

const dedupe = (data, days) => {
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
    console.log(Object.keys(dateDict).sort(), dateDict, "sort");
    var vals = [];
    Object.keys(dateDict).sort().forEach(key => {
        console.log(key, dateDict[key], "sort");
        let sum = 0.0;
        let length = dateDict[key].length
        dateDict[key].forEach((el) => sum += el)
        console.log(sum, length)
        vals.push({'x':key,'y':(sum/length).toFixed(2)})
    })
    return vals
}

const average = (data, days) => {
    var dedupe_data = dedupe(data, days)
    console.log(dedupe_data,"ded", data, days)
    let sum = 0.0;
    let length = dedupe_data.length
    dedupe_data.forEach((el) => sum += parseFloat(el.y))
    return (sum/length).toFixed(2) + " "+data[0].unit;
}

const dateRange = (data, days) => {
    var startDate = new Date(data[data.length - 1].created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    var endDate = new Date(data[0].created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    return startDate +" - "+endDate;
}

function Delta({data, days}) {
    var dedupe_data = dedupe(data, days)
    var delta = dedupe_data[dedupe_data.length - 1].y - dedupe_data[0].y
    console.log("delta",delta)
    if (delta === 0) {
        return
    }
    const getVal = () => {
        if (delta > 0) {
            return <span class="flex items-center flex-grid-1 gap-1">
                <VscArrowUp /> 
                <span>{Math.abs(delta).toFixed(1) + ' ' + data[0].unit}</span>
                </span>
        } else if (delta < 0) {
            return <span class="flex items-center flex-grid-1 gap-1">
            <VscArrowDown /> 
            <span>{Math.abs(delta).toFixed(1) + ' ' + data[0].unit}</span>
            </span>
        } else {
            return ''
        }
    }
    return <span class="ml-2 bg-gray-200 text-gray-600 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-sm">
    {getVal()}
    </span>
}

const dropdownRange = [
    ["7d", 7],
    ["30d", 30],
    ["90d", 90],
    ["180d", 180],
    ["365d", 365],
];

function Metric({trainee, metric}) {
    const[selectedRange, setSelectedRange]=useState(dropdownRange[0]);
    const { data, isLoading, isError, error } = useQuery([metric, trainee.id], () => fetchMetric(metric, trainee.id));
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    console.log(data);
    if (data.length === 0) {
        return 
    }
    
    return (
        <div class="bg-white h-fit rounded-md shadow dark:bg-gray-800 p-4 md:p-6">
            <div class="flex justify-between mb-5">
                <div class="flex flex-col justify-start">
                    <p class="text-xs text-gray-500 font-bold uppercase">average {data[0].label}</p>
                    <p class="text-2xl font-bold">
                    {average(data, selectedRange[1])}
                    </p>
                    <p class="inline-flex items-center text-md text-gray-500 font-bold">{dateRange(data, selectedRange[1])} <Delta data={data} days={selectedRange[1]}/></p>
                </div>
                <Dropdown label={selectedRange[0]} size="sm" class="border border-gray-200 rounded-md text-gray-700 h-fit w-fit">
                    {dropdownRange.map((range) => {
                        return <Dropdown.Item onClick={() => setSelectedRange(range)}>{range[0]}</Dropdown.Item>
                    })}
                </Dropdown>
            </div>
            <TimeChart data={data} days={selectedRange[1]}/>
        </div>
    );
  }
  
export default Metric;
  
