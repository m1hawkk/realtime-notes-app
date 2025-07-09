const addNoteBtn = document.getElementById('addNoteBtn');
const noteInput = document.getElementById('noteInput');
const noteList = document.getElementById('noteList');
const searchInput = document.getElementById('search');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function renderNotes(filter = '') {
  noteList.innerHTML = '';

  notes
    .filter(note => note.toLowerCase().includes(filter.toLowerCase()))
    .forEach((note, index) => {
      const li = document.createElement('li');
      li.className = 'note-item';
      li.textContent = note;

      const delBtn = document.createElement('button');
      delBtn.textContent = 'X';
      delBtn.className = 'delete-btn';
      delBtn.onclick = () => {
        notes.splice(index, 1);
        saveNotes();
        renderNotes(searchInput.value);
      };

      li.appendChild(delBtn);
      noteList.appendChild(li);
    });
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

addNoteBtn.onclick = () => {
  const note = noteInput.value.trim();
  if (note !== '') {
    notes.push(note);
    saveNotes();
    renderNotes(searchInput.value);
    noteInput.value = '';
  }
};

searchInput.oninput = () => {
  renderNotes(searchInput.value);
};

// Initial render
renderNotes();
