import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Typography, Stack, Button } from "@mui/material";
import CreatableReactSelect from "react-select/creatable";
import { Note, NoteData, Tag } from "../App";

type Props = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteEditor = ({
  onSubmit,
  onAddTag,
  availableTags,
  title: defaultTitle,
  markdown: defaultMarkdown,
  tags: defaultTags,
}: Props) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(defaultTitle || "");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);
  const [markdown, setMarkdown] = useState(defaultMarkdown || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      title,
      markdown: markdown,
      tags: selectedTags,
    });
  };

  return (
    <Grid
      component="form"
      onSubmit={(e) => handleSubmit(e)}
      container
      spacing={2}
    >
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
        <CreatableReactSelect
          isMulti
          onCreateOption={(label) => {
            const newTag = { id: Math.random().toString(), label };
            onAddTag(newTag);
            setSelectedTags((prev) => [...prev, newTag]);
          }}
          options={availableTags.map((tag) => ({
            label: tag.label,
            value: tag.id,
          }))}
          value={selectedTags.map((t) => ({ label: t.label, value: t.id }))}
          onChange={(tags) => {
            setSelectedTags(tags.map((t) => ({ label: t.label, id: t.value })));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>markdown</Typography>
        <TextField
          fullWidth
          required
          size="small"
          multiline
          minRows={15}
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Stack direction="row" gap={1} justifyContent="flex-end">
          <Button variant="contained" type="submit">
            Save
          </Button>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default NoteEditor;
