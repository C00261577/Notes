const key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpteXdkbmpjYXRld2VlcWRhd3hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDA0ODc3MjUsImV4cCI6MjAxNjA2MzcyNX0.M1LTwSaKtryAjNnnvg1BUnx9orBCUjeMCz62rkJLUhE'

const customDomain ='https://zmywdnjcateweeqdawxs.supabase.co'


// Import the Supabase client library
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with your project URL and API key
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_SUPABASE_API_KEY');

document.addEventListener('DOMContentLoaded', () => {
  // Load existing notes on page load
  showNotes();
});

async function addNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    // Insert a new note into the 'notes' table
    await supabase.from('notes').insert([{ text: noteText }]);
    
    // Show all notes including the newly added one
    showNotes();

    noteInput.value = ''; // Clear the input field
  }
}

async function showNotes() {
  // Retrieve all notes from the 'notes' table
  const { data, error } = await supabase.from('notes').select('*');
  
  if (error) {
    console.error('Error loading notes:', error.message);
  } else {
    // Display notes in the notes container
    displayNotes(data);
  }
}

function displayNotes(notes) {
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = ''; // Clear previous notes

  notes.forEach((note) => {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
      <p>${note.text}</p>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    notesContainer.appendChild(noteElement);
  });
}

async function deleteNote(noteId) {
  // Delete a specific note by ID
  await supabase.from('notes').delete().eq('id', noteId);

  // Show the updated list of notes
  showNotes();
}

async function deleteAllNotes() {
  // Delete all notes from the 'notes' table
  await supabase.from('notes').delete();

  // Clear the notes container
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = 'All notes deleted.';
}
