import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNotes } from "../contexts/notesContext";
import GetNotes from "../middleware/getNotes";

import NoteCard from "./noteCard";

export default function NoteAbriviated() {
  const notesData = useNotes();
  const notes = Array.isArray(notesData) ? notesData : notesData?.notes || [];
  console.log(notes);

  const latestNotes = [...notes]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 2);

  console.log(latestNotes);

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
        maxWidth="lg"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: 4,
          marginY: 5,
          justifyItems: "center",
          
        }}
      >
        {latestNotes.length === 0 ? (
          <Typography
            sx={{
              textAlign: "center",
              color: "gray",
              fontStyle: "italic",
              fontSize: 18,
              gridColumn: "1 / -1",
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
