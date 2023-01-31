import { useState, useMemo } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  useNavigate,
  Routes,
} from "react-router-dom";
import NoteList from "./pages/NoteList";
import Create from "./pages/Create";
import ViewNote from "./pages/ViewNote";
import Container from "@mui/material/Container";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NoteLayout from "./layout/NoteLayout";
import EditNote from "./pages/EditNote";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
  tags?: Tag[];
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

function App() {
  const navigate = useNavigate();
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(
    () =>
      notes.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev) => [
      ...prev,
      {
        ...data,
        id: Math.random().toString(),
        tagsIds: tags.map((tag) => tag.id),
      },
    ]);
    navigate("..");
  };

  const onAddTag = (data: Tag) => {
    setTags((prev) => [...prev, data]);
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prev) =>
      prev.map((note) => {
        if (note.id === id) {
          return {
            ...note,
            ...data,
            tagsIds: tags.map((tag) => tag.id),
          };
        } else {
          return note;
        }
      })
    );
    navigate("..");
  };

  const onDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    navigate("..");
  };

  return (
    <Container maxWidth="lg">
      <Routes>
        <Route>
          <Route
            path="/"
            element={<NoteList notes={notesWithTags} availableTags={tags} />}
          />
          <Route
            path="/create"
            element={
              <Create
                onAddTag={onAddTag}
                availableTags={tags}
                onSubmit={onCreateNote}
              />
            }
          />
          <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
            <Route index element={<ViewNote onDeleteNote={onDeleteNote} />} />
            <Route
              path="edit"
              element={
                <EditNote
                  onSubmit={onUpdateNote}
                  availableTags={tags}
                  onAddTag={onAddTag}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
