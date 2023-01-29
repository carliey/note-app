import { Box, Grid, TextField, Chip, Paper } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import ReactSelect from "react-select";
import { useState, useMemo } from "react";
import { RawNote, Tag } from "../App";
import { useNavigate } from "react-router-dom";

type NoteListProps = {
  availableTags: Tag[];
  notes: RawNote[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredNotes = useMemo(
    () =>
      notes.filter(
        (note) =>
          note.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()) &&
          selectedTags.every((tag) =>
            note.tagsIds.some((noteTag) => noteTag === tag.id)
          )
      ),
    [title, notes, selectedTags]
  );

  console.log(filteredNotes);
  return (
    <Box p={4}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h4">Notes</Typography>{" "}
        <Stack direction="row" gap={1}>
          <Button variant="contained">Create</Button>
          <Button variant="outlined">Edit Tags</Button>
        </Stack>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Typography>Title</Typography>
          <TextField
            required
            size="small"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography>Tags</Typography>
          <ReactSelect
            isMulti
            options={availableTags.map((tag) => ({
              label: tag.label,
              value: tag.id,
            }))}
            value={selectedTags.map((t) => ({ label: t.label, value: t.id }))}
            onChange={(tags) => {
              setSelectedTags(
                tags.map((t) => ({ label: t.label, id: t.value }))
              );
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={3} alignItems="stretch">
        {filteredNotes.map((note) => (
          <Grid item xs={12} sm={3} md={4} lg={3} key={note.id}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                textAlign: "center",
                cursor: "pointer",
                height: "100%",
                "&:hover": {
                  boxShadow: "0.5px 0.5px 8px 0.2px grey",
                },
              }}
              onClick={() => navigate(`${note.id}`)}
            >
              <Typography>{note.title}</Typography>
              {note?.tags?.map((tag) => (
                <Chip label={tag?.label} color="primary" size="small" />
              ))}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NoteList;
