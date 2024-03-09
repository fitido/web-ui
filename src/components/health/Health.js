import React from 'react';
import { useQuery } from 'react-query';
import fetchWithBaseUrl from '../Fetch.js'
import {Datepicker} from 'flowbite-react';

const fetchTrainee = async (traineeId) => {
  const response = await fetchWithBaseUrl('/trainees/'+traineeId);
  const data = await response.json();
  return data;
};

const theme  = {
    "root": {
      "base": "relative",
      "input" : {
        "field":{
            "input":{
                "colors" :{
                    "gray":"bg-white border-gray-300 text-gray-900 focus-visible:ring-transparent focus-visible:border-green-500 focus:ring-transparent focus:border-green-500"
                },
                "withAddon":{
                    "off":"rounded-md"
                }
            }
        }
      }
    },
    "popup": {
      "root": {
        "base": "absolute top-10 z-50 block pt-2",
        "inline": "relative top-0 z-auto",
        "inner": "inline-block rounded-lg bg-white p-4 shadow-lg"
      },
      "header": {
        "base": "",
        "title": "px-2 py-3 text-center font-semibold text-gray-900",
        "selectors": {
          "base": "flex justify-between mb-2",
          "button": {
            "base": "text-sm rounded-lg text-gray-900 bg-white font-semibold py-2.5 px-5 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 view-switch",
            "prev": "",
            "next": "",
            "view": ""
          }
        }
      },
      "view": {
        "base": "p-1"
      },
      "footer": {
        "base": "flex mt-2 space-x-2",
        "button": {
          "base": "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-transparent focus:border-green-500",
          "today": "bg-green-600 text-white hover:bg-green-500",
          "clear": "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600"
        }
      }
    },
    "views": {
      "days": {
        "header": {
          "base": "grid grid-cols-7 mb-1",
          "title": "dow h-6 text-center text-sm font-medium leading-6 text-gray-500"
        },
        "items": {
          "base": "grid w-64 grid-cols-7",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 ",
            "selected": "bg-green-600 text-white hover:bg-green-500",
            "disabled": "text-gray-500"
          }
        }
      },
      "months": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
            "selected": "bg-green-600 text-white hover:bg-green-500",
            "disabled": "text-gray-500"
          }
        }
      },
      "years": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 hover:bg-gray-100 text-gray-900",
            "selected": "bg-green-600 text-white hover:bg-green-500",
            "disabled": "text-gray-500"
          }
        }
      },
      "decades": {
        "items": {
          "base": "grid w-64 grid-cols-4",
          "item": {
            "base": "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9  hover:bg-gray-100 text-gray-900",
            "selected": "bg-green-600 text-white hover:bg-green-500",
            "disabled": "text-gray-500"
          }
        }
      }
    }
  };

function Health({traineeId}) {
    const { data, isLoading, isError, error } = useQuery(['notes', traineeId], () => fetchTrainee(traineeId));
    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    data.height = 175
    data.weight = 117.4
    data.restingHeartRate = 71
    data.glucoseFasting = 139
    data.glucosePostMeal = 156
    return (
    <div class="flex flex-col h-full px-4 md:px-8 lg:px-10 mb-4 bg-gray-50">
        <div class="flex flex-row justify-between md:justify-start lg:justify-start my-4">
            <p class="flex text-xl text-gray-700 font-bold p-1 mr-4">{data.name}</p>
        </div>
        
    <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2 lg:w-8/12">
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Date of birth</label>
            <Datepicker showTodayButton = {false} showClearButton = {false} theme={theme}
            />
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Height (cms)</label>
            <input 
            type="number" step="0.1"
            defaultValue={data.height}
            id="company" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5"/>
        </div>
        <div>
            <label for="company" class="block mb-2 text-sm font-medium text-gray-900">Weight (kgs)</label>
            <input 
            type="number" step="0.1"
            defaultValue={data.weight}
            id="company" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5"/>
        </div>  
        <div>
            <label for="phone" class="block mb-2 text-sm font-medium text-gray-900">Resting heart rate (bpm)</label>
            <input type="number" 
            defaultValue={data.restingHeartRate}
            class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5" pattern="[0-9]{3}"/>
        </div>
        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900">Glucose fasting (mg/dL)</label>
            <input type="number" step="0.1"
            defaultValue={data.glucoseFasting}
            id="website" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5"/>
        </div>
        <div>
            <label for="website" class="block mb-2 text-sm font-medium text-gray-900">Glucose post meal (mg/dL)</label>
            <input type="number" step="0.1"
            defaultValue={data.glucosePostMeal}
            id="website" class=" border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-transparent focus:border-green-500 block w-full p-2.5"/>
        </div>
    </div>
    <button type="submit" class="text-white bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-transparent font-medium rounded-md text-sm w-full sm:w-auto px-4 py-2 text-center">Save</button>
</form>

    </div>
    );
  }
  
export default Health;
  
