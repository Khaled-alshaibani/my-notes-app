import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
} from "@mui/material";

import addNote from "../middleware/addNote";
import { useUser } from "../contexts/userContext";
import { useDispatch } from "../contexts/notesContext";

export default function AddNoteDialog({ open, onClose }) {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const user = useUser();
  const dispatch = useDispatch();

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return;

    try {
      const res = await addNote({ user, title, content });
      console.log("addNote response", res);

      const newNote = {
        _id: res.id || Date.now().toString(),
        title,
        content,
        creator: user?.id || user?.userName,
        createdAt: new Date().toISOString(),
      };

      dispatch({ type: "add", payload: newNote });
      setTitle("");
      setContent("");
      onClose();
    } catch (e) {
      console.log("Failed adding note: ", e);
    }
  };

  console.log(user);

  return (
    <>
      {user ? (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            sx: {
              backgroundColor: "#121212",
              color: "#ffffff",
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", color: "#80a2ffff" }}>
            Add New Note
          </DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputLabelProps={{ style: { color: "#80a2ffff" } }}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "#1e1e1e" },
                }}
              />
              <TextField
                label="content"
                variant="outlined"
                fullWidth
                multiline
                minRows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                InputLabelProps={{ style: { color: "#80a2ffff" } }}
                InputProps={{
                  style: { color: "#fff", backgroundColor: "#1e1e1e" },
                }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} sx={{ color: "#80a2ffff" }}>
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              sx={{
                backgroundColor: "#80a2ffff5",
                "&:hover": { backgroundColor: "#80a2ffff" },
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={onClose}
          fullWidth
          maxWidth="xs"
          PaperProps={{
            sx: {
              backgroundColor: "#121212",
              color: "#ffffff",
              borderRadius: "16px",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", color: "#f28b82" }}>
            Login Required
          </DialogTitle>
          <DialogContent>
            <Typography>
              You must be logged in to create a new note. Please log in first.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} sx={{ color: "#80a2ffff" }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}
