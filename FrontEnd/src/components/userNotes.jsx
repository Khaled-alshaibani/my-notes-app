import { useEffect } from "react";
import GetNotes from "../middleware/getNotes";
import { useNotes } from "../contexts/notesContext";
import { useDispatch } from "../contexts/notesContext";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";

const UserNotes = () => {
  const notesDispatch = useDispatch();

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
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          fontWeight: "bold",
          color: "white",
          mb: 4,
        }}
      >
        {username}'s Notes
      </Typography>

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
        <Grid container spacing={3}>
          {notes.map((note, index) => (
            <Grid
              item
              key={index}
              xs={12}  // هاتف: عنصر واحد
              sm={6}   // tablet: عنصرين
              md={4}   // desktop: ثلاثة
            >
              <Card
                sx={{
                  bgcolor: "#0e2130",
                  color: "white",
                  borderRadius: 3,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      borderBottom: "1px solid rgba(255,255,255,0.2)",
                      pb: 1,
                      mb: 2,
                    }}
                  >
                    {note.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.9)",
                      fontSize: "0.95rem",
                      mb: 2,
                    }}
                  >
                    {note.content}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.6)",
                      mt: "auto",
                      display: "block",
                      textAlign: "right",
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
    </Container>
  );
};

export default UserNotes;
