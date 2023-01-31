import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useNote } from "../hooks/useContextLayout";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type ViewNoteProps = {
  onDeleteNote: (id: string) => void;
};

const ViewNote = ({ onDeleteNote }: ViewNoteProps) => {
  const note = useNote();

  return (
    <Box p={4}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box>
          <Typography variant="h4">{note.title}</Typography>
          {note?.tags?.map((tag) => (
            <Chip label={tag?.label} color="primary" size="small" />
          ))}
        </Box>
        <Stack direction="row" gap={1}>
          <Link to={`/${note.id}/edit`}>
            <Button size="small" variant="contained">
              Edit
            </Button>
          </Link>
          <Button
            color="error"
            size="small"
            variant="outlined"
            onClick={() => onDeleteNote(note.id)}
          >
            Delete
          </Button>
          <Link to="..">
            <Button size="small" variant="outlined">
              Back
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default ViewNote;
