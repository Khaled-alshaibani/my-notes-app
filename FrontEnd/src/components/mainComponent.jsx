import React from "react";
import Typography from "@mui/material/Typography";

import NoteAbriviated from "./noteAbriviated";
import GetNotes from "../middleware/getNotes";
import { useDispatch } from "../contexts/notesContext";
import { useEffect } from "react";
import NavBar from "./navBar";

const MainComponent = () => {
  const notesDispatch = useDispatch();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await GetNotes();
      notesDispatch({ type: "Get", payload: { data: data } });
    };
    fetchNotes();
  }, []);

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
          textAlign: "center"
        }}
      >
        Turn fleeting thoughts into lasting notes, treasures of the mind.
      </Typography>
      <NoteAbriviated />
    </div>
  );
};

export default MainComponent;
