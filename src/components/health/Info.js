import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import fetchWithBaseUrl from '../Fetch.js'
import MessageBanner from '../common/MessageBanner.js';

const fetchTraineeMetrics = async (traineeId) => {
  const response = await fetchWithBaseUrl('/metric_logs/'+traineeId);
  const data = await response.json();
  return data;
};

const createMetrics = async (req) => {
    const response = await fetchWithBaseUrl('/metric_logs/bulk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });
    const data = await response.json();
    return data;
  };

function BMI(data) {
    var weight = data.metrics.filter(metric => metric.name === "weight")[0]
    var height = data.metrics.filter(metric => metric.name === "height")[0]

    return (parseFloat(weight.value) / Math.pow((parseFloat(height.value)/100),2)).toFixed(1);
}
  
function Info({traineeId}) {
    const[message, setMessage]=useState("");
    const createMetricsMutation = useMutation(createMetrics);
    const { data,refetch, isLoading, isError, error } = useQuery(['metrics', traineeId], () => fetchTraineeMetrics(traineeId));
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    var updatedMetrics = {};
    const capitalized = (word) => {
        console.log("word", word)
     return word.charAt(0).toUpperCase() + word.slice(1)
    }

    const showMsg = (msg, timeout = 2000) => {
        setMessage(msg);
        setTimeout(function () {
          setMessage("");
        }, timeout);
      };

    const age = (dob) => {
        return (new Date()).getFullYear() - (new Date(dob)).getFullYear();
       }
    const handleMetricChange = (metric, value) => {
        var copy = {...metric};
        copy.value = value;
        updatedMetrics[metric.name] = copy
        console.log(updatedMetrics)
    }

    const handleMetricsSave = async () => {
        var req = {}
        req["trainee_id"] = data.trainee.id
        req["metrics"] = Object.values(updatedMetrics);
        try {
            await createMetricsMutation.mutateAsync(req);
            showMsg("Saved");
            refetch();
        } catch (err) {
            showMsg("Error");
            console.error('Error adding metrics:', err);
        }
    }
    
    return (
    <div class="flex flex-col h-full px-4 md:px-6 mb-4 bg-gray-50">
        <MessageBanner data={message} />
        <div class="flex flex-row justify-start mt-4">
            <p class="flex text-xl text-gray-700 font-bold py-1 mr-2">{data.trainee.name}</p>
            <p class="flex text-xl text-gray-500 py-1 mr-2">/</p>
            <p class="flex text-xl text-gray-700 font-semibold py-1 mr-2">{data.trainee.gender}</p>
        </div>


    <div class="relative overflow-x-auto rounded-md mb-6 w-full sm:w-1/3">
        <table class="w-full text-sm text-left rtl:text-right">
            <tbody>
                <tr class="border-b">
                    <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap">
                        Age
                    </th>
                    <td class="px-6 py-4 text-gray-900">
                    {age(data.trainee.dob)} yrs
                    </td>
                </tr>
                <tr class="border-b">
                    <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap">
                    BMI
                    </th>
                    <td class="px-6  py-4 text-gray-900">
                    {BMI(data)}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2 lg:w-8/12">
        {data.metrics.map((metric) => (
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900">{capitalized(metric.label)} ({metric.unit})</label>
            <input 
            type="number" step="0.1"
            defaultValue={metric.value}
            onChange={(e) => handleMetricChange(metric, e.target.value)}
            class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5"/>
        </div>
        ))}
    </div>
    <button onClick={handleMetricsSave} class="flex w-fit shadow-sm hover:shadow-md text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-transparent font-medium rounded-md text-sm px-4 py-2 text-center">Save</button>
    </div>
    );
  }
  
export default Info;
  
