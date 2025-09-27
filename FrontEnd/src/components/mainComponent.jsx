import Typography from "@mui/material/Typography";
import GetNotes from "../middleware/getNotes";
import NoteAbriviated from "./noteAbriviated";
import { useDispatch } from "../contexts/notesContext";
import NavBar from "./navBar";
import { useEffect } from "react";

const MainComponent = () => {
  const notesDispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await GetNotes();
      notesDispatch({ type: "Get", payload: data.notes });
      console.log(data.notes);
    };
    fetchNotes();
  }, [notesDispatch]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        height: "100vh",
      }}
    >
      <NavBar />
      <Typography
        sx={{
          fontFamily: "revert",
          display: "flex",
          justifyContent: "center",
          color: "white",
          fontSize: 25,
          fontWeight: "bolder",
          marginY: 10,
          textAlign: "center",
          p: 1,
        }}
      >
        Turn fleeting thoughts into lasting notes, treasures of the mind.
      </Typography>
      <NoteAbriviated />
    </div>
  );
};

export default MainComponent;
