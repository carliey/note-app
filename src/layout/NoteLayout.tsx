import React from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note, RawNote } from "../App";

type NoteLayoutProps = {
  notes: Note[];
};

function NoteLayout({ notes }: NoteLayoutProps) {
  const { id } = useParams();

  const note = notes.find((note) => note.id === id);

  if (note == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet context={note} />;
}

export default NoteLayout;
