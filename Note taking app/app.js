const key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpteXdkbmpjYXRld2VlcWRhd3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODc3MjUsImV4cCI6MjAxNjA2MzcyNX0.M1LTwSaKtryAjNnnvg1BUnx9orBCUjeMCz62rkJLUhE'

const customDomain ='https://zmywdnjcateweeqdawxs.supabase.co'


// Import the Supabase client library
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project URL and API key
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
});

async function addNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    const { data, error } = await supabase.from('notes').insert([{ text: noteText }]);
    
    if (error) {
      console.error('Error adding note:', error.message);
    } else {
      const newNote = data[0];
      appendNoteToContainer(newNote);
      noteInput.value = '';
    }
  }
}

async function loadNotes() {
  const { data, error } = await supabase.from('notes').select('*');
  
  if (error) {
    console.error('Error loading notes:', error.message);
  } else {
    data.forEach((note) => {
      appendNoteToContainer(note);
    });
  }
}

function appendNoteToContainer(note) {
  const notesContainer = document.getElementById('notes-container');

  const noteElement = document.createElement('div');
  noteElement.classList.add('note');
  noteElement.innerHTML = `
    <p>${note.text}</p>
    <button onclick="deleteNote(${note.id})">Delete</button>
  `;

  notesContainer.appendChild(noteElement);
}

async function deleteNote(noteId) {
  const { error } = await supabase.from('notes').delete().eq('id', noteId);
  
  if (error) {
    console.error('Error deleting note:', error.message);
  } else {
    const noteElement = document.querySelector(`.note[data-id="${noteId}"]`);
    if (noteElement) {
      noteElement.remove();
    }
  }
}
