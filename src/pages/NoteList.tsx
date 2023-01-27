import { Box, Grid, FormGroup, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import ReactSelect from "react-select";
import { useState } from "react";
import { Tag } from "../App";

type NoteListProps = {
  availableTags: Tag[];
};

const NoteList = ({ availableTags }: NoteListProps) => {
  const [title, setTitle] = useState("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  return (
    <Box p={4}>
      <Stack justifyContent="space-between" direction="row">
        <Typography variant="h4">Notes</Typography>{" "}
        <Stack direction="row" gap={1}>
          <Button variant="contained">Create</Button>
          <Button variant="outlined">Edit Tags</Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
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
    </Box>
  );
};

export default NoteList;
