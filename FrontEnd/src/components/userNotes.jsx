import { useEffect, useState } from "react";
import GetNotes from "../middleware/getNotes";
import { useNotes } from "../contexts/notesContext";
import { useDispatch } from "../contexts/notesContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ViewNote from "./veiwNote";
import AddNoteDialog from "./addNote";

const UserNotes = () => {
  const [selectedNote, setSelectedNote] = useState();
  const [open, setOpen] = useState(false);

  const notesDispatch = useDispatch();

  const handleAddNote = () => {
    // Todo: do this later.
  };

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await GetNotes();
      notesDispatch({ type: "Get", payload: { data: data } });
    };
    fetchNotes();
  }, []);

  let notes = useNotes();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  notes = Array.isArray(notes)
    ? notes
    : Array.isArray(notes?.notes)
    ? notes.notes
    : [];

  const username =
    notes.length > 0 ? notes[0].user?.name || user.userName : "No User";

  return (
    <Container maxWidth="lg" sx={{ mt: 5, mb: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "white",
            order: { xs: 2, sm: 1 },
          }}
        >
          {username}'s Notes
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            bgcolor: "#1976d2",
            borderRadius: 3,
            px: 3,
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
            minWidth: { xs: "120px", sm: "auto" },
            "&:hover": { bgcolor: "#1565c0" },
            order: { xs: 1, sm: 2 },
          }}
          onClick={() => setOpen(true)}
        >
          Add Note
        </Button>
        <AddNoteDialog
          open={open}
          onClose={() => setOpen(false)}
          onSave={handleAddNote}
        />
      </Box>

      {notes.length === 0 ? (
        <Typography
          sx={{
            textAlign: "center",
            color: "gray",
            fontStyle: "italic",
            mt: 5,
          }}
        >
          No notes available yet.
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ width: "100%", margin: 0 }}
        >
          {notes.map((note, index) => (
            <Grid
              onClick={() => setSelectedNote(note)}
              item
              key={index}
              size={4}
              xs={12}
              sm={6}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                sx={{
                  bgcolor: "#0e2130",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 6px 15px rgba(0,0,0,0.4)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "350px", md: "100%" },
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    p: { xs: 2, sm: 2.5 },
                    "&:last-child": { pb: { xs: 2, sm: 2.5 } },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      pb: 1,
                      mb: 2,
                      fontSize: { xs: "1.1rem", sm: "1.2rem" },
                      wordBreak: "break-word",
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      mb: 2,
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {note.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      display: "block",
                      textAlign: "right",
                      fontSize: { xs: "0.75rem", sm: "0.8rem" },
                    }}
                  >
                    {new Date(note.createdAt).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <ViewNote
        open={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        note={selectedNote}
      />
    </Container>
  );
};

export default UserNotes;
