import React, {useState} from 'react';
import { useQuery, useMutation } from 'react-query';
import RichTextEditor from './RichTextEditor.js';
import ReadOnlyEditor from './ReadOnlyEditor.js';
import SavedStatus from '../SavedStatus.js';
import fetchWithBaseUrl from '../Fetch.js'
import { VscEdit, VscSave } from 'react-icons/vsc';

const fetchNotes = async () => {
  const response = await fetchWithBaseUrl('/notes');
  const data = await response.json();
  return data;
};

const createNotes = async (note) => {
  const response = await fetch('/notes', {
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

function Note({note}) {
    console.log(note)
    const [editable, setEditable] = useState(note.editable); 
    const[lastSaved, setLastSaved]=useState(null);
    const updateItemMutation = useMutation(updateNotes);
    const created_at = new Date(note.created_at);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = created_at.toLocaleDateString('en-US', options);
    const handleUpdateNote = async (note) => {
        try {
            const updatedNote = await updateItemMutation.mutateAsync(note);
            setLastSaved(new Date());
            console.log('Note updated:', updatedNote);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    const handleSave = async () => {
        try {
            const updatedNote = await updateItemMutation.mutateAsync(note);
            setLastSaved(new Date());
            setEditable(false);
            console.log('Note updated:', updatedNote);
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    return (
        <div class="flex flex-col h-full w-full mb-4 items-center" key={note.id}>
            <div class="flex flex-col items-center w-full">
            <div class="flex w-full justify-between items-center p-2">
                <div class="flex flex-row items-center">
                <p class="text-xl text-gray-700 font-bold">{formattedDate}</p>
                <VscEdit class="flex items-center justify-center text-bold h-4 w-4 ml-4" 
                    onClick={() => setEditable(true)}/>
                {editable && <VscSave class="flex items-center justify-center text-bold text-green-500 h-4 w-4 ml-4" 
                    onClick={handleSave}/>}
                </div>
                <p><SavedStatus savedTime={lastSaved}/></p>
            </div>
            <div class="flex-1 items-center w-full mceNonEditable">
                {editable && <RichTextEditor note={note} onChange={handleUpdateNote}/>}
                {!editable && <ReadOnlyEditor note={note}/>}
            </div>
            </div>
        </div>
    );
}

function Planner() {
    const { data, isLoading, isError, error } = useQuery('notes', fetchNotes);
    const [notes, setNotes] = useState([]);     
    const addItemMutation = useMutation(createNotes);

    const handleAddNote = async () => {
        try {
        const newNote = await addItemMutation.mutateAsync({content:'<p>New Note 1</p>'});
        var notesCopy = [...notes];
        newNote.editable = true;
        notesCopy.push(newNote);
        setNotes(notesCopy);
        console.log('Note added:', newNote);
        } catch (err) {
        console.error('Error adding item:', err);
        }
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;
    return (
    <div class="flex flex-col h-full mx-4 lg:px-2 md:mx-8 lg:mx-8">
        <div class="flex flex-row justify-between md:justify-start lg:justify-start my-4">
        <p class="flex text-xl text-gray-700 font-bold p-1 mr-4">Trainer notes</p>
        <button class="flex text-white text-xs item-center justify-center rounded-md border bg-green-600 hover:bg-green-500 p-2 px-4"
            onClick={handleAddNote}>
            Add Note
        </button>
        </div>
    
    {notes.concat(data).map((note) => (
        <div class="mb-4">
        <Note note={note} />
        </div>
    ))}
    </div>
    );
  }
  
export default Planner;
  
