
const key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c3RxaHZiZWRxdHpuZXp2bHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMjE1NjAsImV4cCI6MjAxNjc5NzU2MH0.kWV1RY12sppWe8jibUEBs6f9_EiF4jbUCaApGL8BdaI'
const customDomain ='https://ctstqhvbedqtznezvluf.supabase.co'
import { createClient} from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

document.addEventListener('DOMContentLoaded', () => {
  // You can perform some initialization here if needed
});

async function addNote() {
  const noteInput = document.getElementById('note-input');
  const noteText = noteInput.value.trim();

  if (noteText !== '') {
    // Insert a new note into the 'notes' table
    const { data, error } = await supabase.from('notes').insert([{ text: noteText }]);

    if (error) {
      console.error('Error adding note:', error.message);
    } else {
      // Show all notes including the newly added one
      showNotes();

      noteInput.value = ''; // Clear the input field

      // Display a message
      const messageElement = document.getElementById('message');
      messageElement.innerText = 'Note added successfully!';
      setTimeout(() => {
        messageElement.innerText = '';
      }, 3000); // Clear the message after 3 seconds
    }
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
