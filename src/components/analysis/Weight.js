import React, {useState} from 'react';
import {useQuery} from 'react-query';
import fetchWithBaseUrl from '../Fetch.js'
import TimeChart from "./TimeChart.js";
import { Dropdown } from 'flowbite-react';

const fetchWeights = async (traineeId) => {
  const response = await fetchWithBaseUrl('/metric_logs/weight/'+traineeId);
  const data = await response.json();
  return data;
};

const weightAverage = (data) => {
    let sum = 0.0;
    let length = data.length
    console.log("data",data, sum, length)
    data.forEach((el) => sum += parseFloat(el.value))
    return (sum/length).toFixed(2) + " "+data[0].unit;
}

const dateRange = (data, days) => {
    var startDate = new Date(data[data.length - 1].created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    var endDate = new Date(data[0].created_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })
    return startDate +" - "+endDate;
}

function WeightDelta({data}) {
    var delta = data[data.length - 1].value - data[0].value
    console.log("delta",delta)
    if (delta === 0) {
        return
    }
    const getVal = () => {
        if (delta > 0) {
            return 'Gained ' + delta.toFixed(1) + ' ' + data[0].unit
        } else if (delta < 0) {
            return 'Lost ' + delta.toFixed(1) + ' ' + data[0].unit
        } else {
            return ''
        }
    }
    return <span class="ml-2 bg-gray-200 text-gray-600 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-sm">
    {getVal()}
    </span>
}

const dropdownRange = [
    ["Last 7 days", 7],
    ["Last 30 days", 30],
    ["Last 90 days", 90],
    ["Last 180 days", 180],
    ["Last 365 days", 365],
];

function Weight({trainee}) {
    const[selectedRange, setSelectedRange]=useState(dropdownRange[0]);
    const { data, isLoading, isError, error } = useQuery(['weights', trainee.id], () => fetchWeights(trainee.id));
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    console.log(data);
    if (data.length === 0) {
        return 
    }
    
    return (
        <div class="bg-white rounded-md shadow dark:bg-gray-800 p-4 md:p-6">
            <div class="flex justify-between mb-5">
                <div class="flex flex-col justify-start">
                    <p class="text-xs text-gray-500 font-bold uppercase">average weight</p>
                    <p class="text-2xl font-bold">
                    {weightAverage(data)}
                    </p>
                    <p class="inline-flex items-center text-md text-gray-500 font-bold">{dateRange(data, selectedRange[1])} <WeightDelta data={data} /></p>
                </div>
                <Dropdown label={selectedRange[0]} size="sm" class="border border-gray-200 rounded-md text-gray-700 h-fit">
                    {dropdownRange.map((range) => {
                        return <Dropdown.Item onClick={() => setSelectedRange(range)}>{range[0]}</Dropdown.Item>
                    })}
                </Dropdown>
            </div>
            <TimeChart data={data} days={selectedRange[1]}/>
        </div>
    );
  }
  
export default Weight;
  
