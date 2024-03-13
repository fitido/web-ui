import React from 'react';
import { useQuery, useMutation } from 'react-query';
import fetchWithBaseUrl from '../Fetch.js';

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

/* <Datepicker showTodayButton = {false} showClearButton = {false} theme={theme} value={data.trainee.dob} /> */
// const theme  = {
//     "root": {
//       "base": "relative",
//       "input" : {
//         "field":{
//             "input":{
//                 "colors" :{
//                     "gray":"bg-white border-gray-300 text-gray-900 focus-visible:ring-transparent focus-visible:border-green-500 focus:ring-transparent focus:border-green-500"
//                 },
//                 "withAddon":{
//                     "off":"rounded-md"
//                 }
//             }
//         }
//       }
//     },
//     "popup": {
//       "root": {
//         "base": "absolute top-10 z-50 block pt-2",
//         "inline": "relative top-0 z-auto",
//         "inner": "inline-block rounded-lg bg-white p-4 shadow-lg"
//       },
//       "header": {
//         "base": "",
//         "title": "px-2 py-3 text-center font-semibold text-gray-900",
//         "selectors": {
//           "base": "flex justify-between mb-2",
//           "button": {
//             "base": "text-sm rounded-lg text-gray-900 bg-white font-semibold py-2.5 px-5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
//             "prev": "",
//             "next": "",
//             "view": ""
//           }
//         }
//       },
//       "view": {
//         "base": "p-1"
//       },
//       "footer": {
//         "base": "flex mt-2 space-x-2",
//         "button": {
//           "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-transparent focus:border-green-500",
//           "today": "bg-green-600 text-white hover:bg-green-500",
//           "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600"
//         }
//       }
//     },
//     "views": {
//       "days": {
//         "header": {
//           "base": "grid grid-cols-7 mb-1",
//           "title": "dow h-6 text-center text-sm font-medium leading-6 text-gray-500"
//         },
//         "items": {
//           "base": "grid w-64 grid-cols-7",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ",
//             "selected": "bg-green-600 text-white hover:bg-green-500",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "months": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
//             "selected": "bg-green-600 text-white hover:bg-green-500",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "years": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 text-gray-900",
//             "selected": "bg-green-600 text-white hover:bg-green-500",
//             "disabled": "text-gray-500"
//           }
//         }
//       },
//       "decades": {
//         "items": {
//           "base": "grid w-64 grid-cols-4",
//           "item": {
//             "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 text-gray-900",
//             "selected": "bg-green-600 text-white hover:bg-green-500",
//             "disabled": "text-gray-500"
//           }
//         }
//       }
//     }
//   };

  
function Health({traineeId}) {
    const createMetricsMutation = useMutation(createMetrics);
    const { data, isLoading, isError, error } = useQuery(['metrics', traineeId], () => fetchTraineeMetrics(traineeId));
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    var updatedMetrics = {};
    const capitalized = (word) => {
     return word.charAt(0).toUpperCase() + word.slice(1)
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
        console.log('Metrics creation req:', req);
        try {
            const createdMetrics = await createMetricsMutation.mutateAsync(req);
            console.log('Metrics created:', createdMetrics);
            // refetch();
        } catch (err) {
            console.error('Error adding metrics:', err);
        }
    }
    
    return (
    <div class="flex flex-col h-full px-4 md:px-8 lg:px-10 mb-4 bg-gray-50">
        <div class="flex flex-row justify-between md:justify-start lg:justify-start my-4">
            <p class="flex text-xl text-gray-700 font-bold py-1 mr-4">{data.trainee.name}</p>
        </div>
    <div class="grid gap-6 mb-6 md:grid-cols-2 lg:w-8/12">
        {data.metrics.map((metric) => (
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900">{capitalized(metric.name)} ({metric.unit})</label>
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
  
export default Health;
  
