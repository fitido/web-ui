import React, {useState} from 'react';

function Exercise({exercise}) {
  const[startOrStop, setStartOrStop]=useState(false);

  function handleStartStop() {
  	setStartOrStop(!startOrStop);
  }

  return (
	<tr class="bg-white border-b">
		<td class="px-6 py-4 items-center">
            {!startOrStop && <button href="#" class="font-medium border p-2 rounded-md text-green-600 dark:text-green-500 hover:bg-green-500 hover:text-white" onClick={handleStartStop}>Start</button>}
            {startOrStop && <button href="#" class="font-medium border p-2 rounded-md text-red-600 dark:text-red-500 hover:bg-red-500 hover:text-white" onClick={handleStartStop}>Stop</button>}
        </td>
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {exercise.name}
        </th>
        <td class="px-6 py-4">
            {exercise.exercise_type}
        </td>
        <td class="px-6 py-4">
            {exercise.weight_in_kgs ? exercise.weight_in_kgs + " kgs" : exercise.load}
        </td>
        <td class="px-6 py-4">
            {exercise.rep_count}
        </td>
        <td class="px-6 py-4">
            {exercise.set_count}
        </td>
        <td class="px-6 py-4">
            {exercise.video_urls}
        </td>
        <td class="px-6 py-4">
            {exercise.notes}
        </td>
    </tr>
 );
}

export default Exercise;