import React from "react";
import NoteEditor from "../components/NoteEditor";
import { Note, NoteData, Tag } from "../App";
import { useNote } from "../hooks/useContextLayout";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const EditNote = ({ onSubmit, onAddTag, availableTags }: EditNoteProps) => {
  const note = useNote();
  return (
    <div>
      <h1>Edit note</h1>
      <NoteEditor
        availableTags={availableTags}
        onAddTag={onAddTag}
        onSubmit={(data) => onSubmit(note.id, data)}
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
      />
    </div>
  );
};

export default EditNote;
