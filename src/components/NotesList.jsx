import React from "react";

export const NotesList = ({ notes, onSelect, selected }) => (
  <ul>
    {notes.map((note) => (
      <li
        key={note.id}
        data-testid="note-item"
        onClick={() => onSelect(note)}
        className={`list-group-item ${
          selected && selected.id === note.id ? "active" : ""
        }`}
      >
        <h3>{note.title}</h3>
        <p>{note.text}</p>
      </li>
    ))}
  </ul>
);
