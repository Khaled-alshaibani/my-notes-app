import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNotes } from "../contexts/notesContext";
import { useEffect } from "react";
import { useDispatch } from "../contexts/userContext";
import GetNotes from "../middleware/getNotes";
import NoteCard from "./noteCard";

export default function NoteAbriviated() {
  const notesDispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await GetNotes();
      notesDispatch({ type: "Get", payload: { data: data } });
    };
    fetchNotes();
  }, []);

  let notes = useNotes();

  notes = Array.isArray(notes)
    ? notes
    : Array.isArray(notes?.notes)
    ? notes.notes
    : [];

  const latestNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  return (
    <React.Fragment>
      <CssBaseline />
      <Typography
        sx={{
          textAlign: "center",
          color: "white",
          fontWeight: "bolder",
          fontSize: 50,
        }}
      >
        Latest Notes
      </Typography>
      <hr style={{ width: "40%", fontWeight: "bolder" }} />

      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          alignItems: "stretch",
          marginY: 5,
          flexWrap: "wrap",
        }}
      >
        {latestNotes.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "gray",
              fontStyle: "italic",
              fontSize: 18,
            }}
          >
            No notes available yet
          </Typography>
        ) : (
          latestNotes.map((note, index) => (
            <NoteCard
              key={index}
              title={note.title}
              content={note.content}
              createdAt={note.createdAt}
            />
          ))
        )}
      </Container>
    </React.Fragment>
  );
}
