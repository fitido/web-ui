import React, {useState} from 'react';
import { useQuery, useMutation } from 'react-query';
import RichTextEditor from '../planner/RichTextEditor.js';
import ReadOnlyEditor from '../planner/ReadOnlyEditor.js';
import fetchWithBaseUrl from '../Fetch.js'
import { VscEdit, VscSave, VscTrash } from 'react-icons/vsc';

const DEFAULT_CONTENT = '<p>New Note 1</p>';

const fetchNotes = async (traineeId) => {
  const response = await fetchWithBaseUrl('/trainees/'+traineeId);
  const data = await response.json();
  return data;
};

const createNotes = async (note) => {
  const response = await fetchWithBaseUrl('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ note }),
  });
  const data = await response.json();
  return data;
};

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

  const deleteNotes = async (note) => {
    const response = await fetchWithBaseUrl('/notes/'+note.id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  };

  function Note({note}) {
    const [deleted, setDeleted] = useState(false);
    const [editable, setEditable] = useState(note.content === DEFAULT_CONTENT);
    const updateItemMutation = useMutation(updateNotes);
    const deleteItemMutation = useMutation(deleteNotes);
    
    const created_at = new Date(note.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = created_at.toLocaleDateString('en-US', options);
    const handleUpdateNote = async (note) => {
        try {
            const updatedNote = await updateItemMutation.mutateAsync(note);
            console.log('Note updated:', updatedNote);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    const handleSave = async () => {
        try {
            const updatedNote = await updateItemMutation.mutateAsync(note);
            setEditable(false);
            console.log('Note updated:', updatedNote);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    const handleDelete = async () => {
        try {
            setDeleted(true);
            await deleteItemMutation.mutateAsync(note);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };
    if (deleted) return;
    return (
        <div class="flex flex-col h-full w-full mb-4 items-center">
            <div class="flex flex-col items-center w-full">
            <div class="flex w-full justify-between items-center p-2">
                <div class="flex flex-row items-center">
                <p class="text-xl text-gray-700 font-bold">{formattedDate}</p>
                <VscEdit class="flex items-center justify-center text-gray-500 text-bold h-4 w-4 ml-4 hover:text-gray-700" 
                    onClick={() => setEditable(true)}/>
                <VscTrash class="flex items-center justify-center text-red-500 text-bold h-4 w-4 ml-4 hover:text-red-700" 
                    onClick={handleDelete}/>
                {editable && <VscSave class="flex items-center justify-center text-bold text-green-500 h-4 w-4 ml-4 hover:text-green-700" 
                    onClick={handleSave}/>}
                </div>
            </div>
            <div class="flex-1 items-center w-full mceNonEditable">
                {editable ? <RichTextEditor note={note} onChange={handleUpdateNote}/> : <ReadOnlyEditor note={note}/>}
            </div>
            </div>
        </div>
    );
}

function Trends({traineeId}) {
    console.log("Trends",traineeId)
    const addItemMutation = useMutation(createNotes);
    const { data, refetch, isLoading, isError, error } = useQuery(['notes', traineeId], () => fetchNotes(traineeId));

    const handleAddNote = async () => {
        try {
        await addItemMutation.mutateAsync({trainee_id:traineeId, content: DEFAULT_CONTENT});
        refetch();
        } catch (err) {
        console.error('Error adding item:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
    <div class="flex flex-col h-full px-4 md:px-8 lg:px-10 mb-4 bg-gray-50">
        <div class="flex flex-row justify-between md:justify-start lg:justify-start my-4">
        <p class="flex text-xl text-gray-700 font-bold p-1 mr-4">Trainer notes</p>
        <button class="flex text-white text-xs item-center justify-center rounded-md border bg-green-600 hover:bg-green-500 p-2 px-4"
            onClick={handleAddNote}>
            Add Note
        </button>
        </div>
    {data.notes.map((note) => (
        <Note note={note} key={note.id}/>
    ))}
    </div>
    );
  }
  
export default Trends;
  