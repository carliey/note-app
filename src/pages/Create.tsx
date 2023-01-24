import React from "react";
import NoteEditor from "../components/NoteEditor";
import { NoteData } from "../App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

const Create = ({ onSubmit }: NewNoteProps) => {
  return (
    <div>
      <h1>Create note</h1>
      <NoteEditor onSubmit={onSubmit} />
    </div>
  );
};

export default Create;
