import React from "react";

export const NoteForm = ({
  note = { title: "", text: "" },
  onChange,
  onSubmit,
  onCancel,
}) => {
  // Add safety check at the start of component
  const safeNote = note || { title: "", text: "" };

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...safeNote, [name]: value });
  };

  // Use safeNote instead of note
  const handleSave = (e) => {
    e.preventDefault();
    onSubmit(safeNote);
  };

  return (
    <form onSubmit={handleSave}>
      <div className="form-group">
        <label>Title:</label>
        <input
          className="form-control"
          data-testid="input-title"
          name="title"
          value={safeNote.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Note:</label>
        <textarea
          className="form-control"
          data-testid="input-text"
          name="text"
          value={safeNote.text}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button
          type="button"
          data-testid="cancel-note"
          className="btn btn-default pull-right"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          data-testid="save-note"
          className="btn btn-primary pull-right"
        >
          Save
        </button>
      </div>
    </form>
  );
};
