import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  TextareaAutosize,
  TextField,
  DialogActions,
} from "@mui/material";

const ViewNote = ({ open, onClose, note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note?.title || "");
  const [editedContent, setEditedContent] = useState(note?.content || "");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
  };
  const handleDelete = () => setConfirmDelete(true);
  const handleConfirmDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            width: { xs: "80%", md: "60%" },
            minHeight: "auto",
            borderRadius: 3,
            bgcolor: "#0e2130",
            color: "white",
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#90caf9",
          }}
        >
          {isEditing ? (
            <TextField
              fullWidth
              variant="standard"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              InputProps={{
                style: {
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  color: "white",
                },
              }}
            />
          ) : (
            note?.title || "Untitled"
          )}
        </DialogTitle>

        <DialogContent
          dividers
          sx={{ borderColor: "rgba(255,255,255,0.2)", pb: 2 }}
        >
          {isEditing ? (
            <TextareaAutosize
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              style={{
                width: "100%",
                minHeight: "200px",
                fontSize: "1rem",
                padding: "12px",
                border: "none",
                outline: "none",
                resize: "vertical",
                backgroundColor: "#1b2a38",
                color: "white",
              }}
              autoFocus
            />
          ) : (
            <Typography
              variant="body1"
              sx={{
                whiteSpace: "pre-wrap",
                mb: 2,
                fontSize: "1rem",
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.95)",
              }}
            >
              {note?.content || ""}
            </Typography>
          )}

          <Typography
            variant="caption"
            sx={{
              display: "block",
              textAlign: "right",
              color: "rgba(144,202,249,0.8)",
              mt: 1,
            }}
          >
            {note?.createdAt ? new Date(note.createdAt).toLocaleString() : ""}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "space-between", px: 3, pb: 2 }}>
          <Box>
            {isEditing ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleSave}
                sx={{ mr: 1, bgcolor: "#1976d2" }}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="outlined"
                size="small"
                onClick={handleEdit}
                sx={{
                  mr: 1,
                  color: "#90caf9",
                  borderColor: "#90caf9",
                  "&:hover": { borderColor: "#42a5f5", color: "#42a5f5" },
                }}
              >
                Edit
              </Button>
            )}
            <Button
              variant="outlined"
              size="small"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>

          <Button
            variant="text"
            size="small"
            onClick={onClose}
            sx={{ color: "rgba(255,255,255,0.7)" }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirm delete dialog */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        PaperProps={{
          sx: { borderRadius: 2, bgcolor: "#0e2130", color: "white" },
        }}
      >
        <DialogTitle sx={{ fontWeight: "bold", color: "#f28b82" }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this note?</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDelete(false)}
            size="small"
            variant="outlined"
            sx={{ color: "#90caf9", borderColor: "#90caf9" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            size="small"
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ViewNote;
