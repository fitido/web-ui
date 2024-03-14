import React from 'react';
import { useQuery } from 'react-query';
import Weight from './Weight.js';
import fetchWithBaseUrl from '../Fetch.js'

const fetchTrainee = async (traineeId) => {
  const response = await fetchWithBaseUrl('/trainees/'+traineeId);
  const data = await response.json();
  return data;
};

function Trends({traineeId}) {
    const { data, isLoading, isError, error } = useQuery(['trainee', traineeId], () => fetchTrainee(traineeId));

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
      <div class="p-4 md:p-6 grid gap-6 mb-6 md:grid-cols-2 h-full bg-gray-50">
        <Weight trainee={data}/>
        <Weight trainee={data}/>
        <Weight trainee={data}/>
        <Weight trainee={data}/>
      </div>
    );
  }
  
export default Trends;
  
