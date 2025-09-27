import { useEffect, useState } from "react";
import GetNotes from "../middleware/getNotes";
import { useNotes, useDispatch } from "../contexts/notesContext";
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
  const [selectedNote, setSelectedNote] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  const notes = useNotes();
  const notesDispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await GetNotes();
      // ترتيب حسب آخر تحديث أو إنشاء
      const sortedNotes = [...data.notes].sort((a, b) => {
        const dateA = new Date(a.updatedAt || a.createdAt);
        const dateB = new Date(b.updatedAt || b.createdAt);
        return dateB - dateA;
      });
      notesDispatch({ type: "Get", payload: sortedNotes });
    };
    fetchNotes();
  }, [notesDispatch]);

  const username =
    notes.length > 0 ? notes[0].user?.name || user?.userName : "No User";

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 5, mb: 5, height: "100vh", overflowY: "auto", pb: 20 }}
    >
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
          onClick={() => setOpenAddDialog(true)}
        >
          Add Note
        </Button>

        <AddNoteDialog
          open={openAddDialog}
          onClose={() => setOpenAddDialog(false)}
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
        <Grid container spacing={3} justifyContent="center">
          {notes.map((note) => (
            <Grid
              item
              key={note._id}
              xs={12}
              sm={6}
              md={4}
              sx={{ display: "flex", justifyContent: "center" }}
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
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  maxWidth: { xs: "100%", sm: "350px", md: "100%" },
                  cursor: "pointer",
                }}
                onClick={() => setSelectedNote(note)}
              >
                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      pb: 1,
                      mb: 2,
                      wordBreak: "break-word",
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      lineHeight: 1.5,
                      wordBreak: "break-word",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
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
                    }}
                  >
                    {new Date(
                      note.updatedAt || note.createdAt
                    ).toLocaleString()}
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
