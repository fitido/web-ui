import React, {useState} from 'react';
import { useQuery, useMutation } from 'react-query';
import RichTextEditor from './RichTextEditor.js';
import SavedStatus from '../SavedStatus.js';
import fetchWithBaseUrl from '../Fetch.js'

const fetchNotes = async () => {
  const response = await fetchWithBaseUrl('/notes');
  const data = await response.json();
  return data;
};

// const createNotes = async (note) => {
//   const response = await fetch('/notes', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ note }),
//   });
//   const data = await response.json();
//   return data;
// };

const updateNotes = async (note) => {
    const response = await fetchWithBaseUrl('/notes/'+note.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ note }),
    });
    const data = await response.json();
    return data;
  };

function Note({note}) {
    const[lastSaved, setLastSaved]=useState(null);
    const updateItemMutation = useMutation(updateNotes);
    const handleUpdateNote = async (note) => {
        try {
            const updatedNote = await updateItemMutation.mutateAsync(note);
            setLastSaved(new Date());
            console.log('Note updated:', updatedNote);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    return (
        <div class="flex flex-col h-full w-full mb-4 items-center" key={note.id}>
            <div class="flex flex-col items-center w-full lg:w-9/12">
            <div class="flex w-full justify-between items-center p-2">
                <p class="text-xl text-gray-500 font-bold">Arvind Notes</p>
                <p><SavedStatus savedTime={lastSaved}/></p>
            </div>
            <div class="flex-1 items-center w-full">
                <RichTextEditor note={note} onChange={handleUpdateNote}/>
            </div>
            </div>
        </div>
    );
}

function Planner() {
    const { data, isLoading, isError, error } = useQuery('notes', fetchNotes);

    // const addItemMutation = useMutation(createNotes);

    // const handleAddNote = async (note) => {
    //     try {
    //     const newNote = await addItemMutation.mutateAsync(note);
    //     console.log('Note added:', newNote);
    //     } catch (err) {
    //     console.error('Error adding item:', err);
    //     }
    // };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
    <div class="flex flex-col h-full mx-4 lg:px-2 md:mx-8 lg:mx-8 pt-4">
    {data.map((note) => (
        <Note note={note} />
    ))}
    </div>
    );
  }
  
export default Planner;
  
