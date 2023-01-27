import React from "react";
import NoteEditor from "../components/NoteEditor";
import { NoteData, Tag } from "../App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Create = ({ onSubmit, onAddTag, availableTags }: NewNoteProps) => {
  return (
    <div>
      <h1>Create note</h1>
      <NoteEditor
        availableTags={availableTags}
        onAddTag={onAddTag}
        onSubmit={onSubmit}
      />
    </div>
  );
};

export default Create;
