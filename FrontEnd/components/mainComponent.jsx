import React from "react";
import NavBar from "./navBar";
import Typography from "@mui/material/Typography";

const mainComponent = () => {
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
          fontWeight: "bolder"
        }}
      >
        Turn fleeting thoughts into lasting notes, treasures of the mind.
      </Typography>
    </div>
  );
};

export default mainComponent;
