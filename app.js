import {createClient} from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const key ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0c3RxaHZiZWRxdHpuZXp2bHVmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEyMjE1NjAsImV4cCI6MjAxNjc5NzU2MH0.kWV1RY12sppWe8jibUEBs6f9_EiF4jbUCaApGL8BdaI'

const customDomain ='https://ctstqhvbedqtznezvluf.supabase.co';


// Initialize Supabase client with your project URL and API key
const supabase = createClient(customDomain, key);

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

document.addEventListener('DOMContentLoaded', () => {
  // Check the current page and execute the corresponding function
  const currentPage = window.location.pathname;
  if (currentPage.includes('show_notes.html')) {
    showNotes();
  } else if (currentPage.includes('delete_notes.html')) {
    deleteAllNotes();
  }
});

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

function displayNotes(data){
  console.log(data);
}

async function deleteAllNotes() {
  // Delete all notes from the 'notes' table
  await supabase.from('notes').delete();

  // Clear the notes container
  const notesContainer = document.getElementById('notes-container');
  notesContainer.innerHTML = 'All notes deleted.';
}
  async function addNote() {
      // Your existing addNote function logic
      // ...

      // Example: Log a message to the console when the button is clicked
      console.log('Add Note button clicked');
    }

    // Attach the addNote function to the "Add Note" button click event
    const addNoteButton = document.querySelector('button[onclick="addNote()"]');
    if (addNoteButton) {
      addNoteButton.addEventListener('click', addNote);
    }

/*const { user, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password',
});
const { user, error } = await supabase.auth.signIn({
  email: 'user@example.com',
  password: 'secure_password',
});*/

// ... (other functions remain unchanged)
