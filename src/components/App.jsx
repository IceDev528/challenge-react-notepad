import React, { useState, useEffect } from "react";
import { NotesList } from "./NotesList";
import { NoteForm } from "./NoteForm";

export const App = ({ service }) => {
  const [notes, setNotes] = useState([]);
  const [selected, setSelected] = useState(null);

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const notesList = await service.getNotes();
    setNotes(notesList);
  };

  // Select new empty note
  const newNote = () =>
    setSelected({
      id: null, // Add explicit null id for new notes
      title: "",
      text: "",
    });

  // Set note as selected
  const onSelect = (note) => setSelected(note);

  // Save note to service and refresh notes list
  const onSubmit = async (note) => {
    await service.saveNote(note);
    await fetchNotes(); // Ensure the notes list is refreshed
    setSelected(null);
  };

  // Unselect note
  const onCancel = () => setSelected(null);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h1>React Notes</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <NotesList notes={notes} onSelect={onSelect} selected={selected} />
        </div>
        <div className="col-md-8">
          <NoteForm
            note={selected}
            onChange={setSelected}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
          {!selected && (
            <button
              id="new-note"
              data-testid="new-note" // Added data-testid for test compatibility
              onClick={newNote}
              className="btn btn-primary mt-2"
            >
              New Note
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
