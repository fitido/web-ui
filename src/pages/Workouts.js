import React, {useState} from 'react';
import { useQuery, useMutation } from 'react-query';
import Exercise from "../components/Exercise";

const fetchWorkouts = async () => {
  const response = await fetch('/workouts');
  const data = await response.json();
  return data;
};

const createWorkout = async (workout) => {
  const response = await fetch('/workouts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ workout }),
  });
  const data = await response.json();
  return data;
};

function Workouts() {
  const { data, isLoading, isError, error } = useQuery('workouts', fetchWorkouts);

  const addItemMutation = useMutation(createWorkout);

  const handleAddWorkout = async (workout) => {
    try {
      const newWorkout = await addItemMutation.mutateAsync(workout);
      console.log('Workout added:', newWorkout);
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;
  console.log(data);
  return (
    <div class="max-w-screen-xl mx-auto px-5 bg-white min-h-sceen mt-8">
	<div class="flex justify-between items-center py-2">
		<span class="text-bold text-lg">Workouts</span>
	</div>
	<div class="grid divide-y divide-neutral-200  mx-auto border px-5 overflow-y-scroll">
		{data.map((workout, index) => (
		<div class="py-5">
			<details class="group">
				<summary class="flex justify-between items-center font-medium cursor-pointer list-none">
					<span><span>{workout.name}</span><span class="ml-2 select-all text-sm text-gray-800 bg-gray-200 rounded-md p-1">{workout.id}</span></span>
					<span class="transition group-open:rotate-180">
                <svg fill="none" height="24" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
</svg>
              </span>
				</summary>
				<div class="text-neutral-600 p-1 group-open:animate-fadeIn">
					<div class="relative overflow-x-auto">
					    <table class="w-full text-sm text-left text-gray-500 border">
					        <caption class="py-4 text-lg font-semibold text-left text-gray-900 bg-white">
					            <p class="text-sm font-normal text-gray-500">{workout.description}</p>
					        </caption>
					        <thead class="text-xs text-gray-700 uppercase bg-gray-50 border">
					            <tr>
					            	<th scope="col" class="px-6 py-3">
					                    <span class="sr-only">Action</span>
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Exercise
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Type
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Load
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Reps
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Sets
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Videos
					                </th>
					                <th scope="col" class="px-6 py-3">
					                    Notes
					                </th>
					            </tr>
					        </thead>
					        <tbody>
					        {workout.exercises.map((exercise, index) => (
					        	<Exercise exercise={exercise} />
							 ))}					            
					        </tbody>
					    </table>
					</div>
				</div>
			</details>
		</div>
		))}
	</div>
</div>
  );
}

export default Workouts;