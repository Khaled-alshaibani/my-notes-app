import { Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import ViewNote from "./veiwNote";

export default function NoteCard({ title, content, createdAt }) {
  const formattedDate = new Date(createdAt).toLocaleString();
  const [open, setOpen] = useState(false);

  const maxChars = 150;
  const isLong = content.length > maxChars;
  const displayContent = content.slice(0, maxChars);

  return (
    <>
      <Box
        sx={{
          flex: 1,
          bgcolor: "#162c3b",
          borderRadius: 4,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
          transition: "all 0.3s ease",
          width: 320,
          height: 280,
          "&:hover": {
            transform: "translateY(-8px) scale(1.02)",
            boxShadow: "0 10px 25px rgba(0,0,0,0.45)",
            cursor: "pointer",
          },
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              borderBottom: "2px solid rgba(255,255,255,0.2)",
              pb: 1,
              mb: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              overflow: "hidden",
            }}
          >
            {isLong ? displayContent + "..." : content}
          </Typography>

          {isLong && (
            <Button
              size="small"
              sx={{ mt: 1, color: "#4dabf7", textTransform: "none" }}
              onClick={() => setOpen(true)}
            >
              Read more
            </Button>
          )}
        </Box>

        <Typography
          sx={{
            color: "rgba(200,200,200,0.7)",
            fontSize: "0.8rem",
            textAlign: "right",
            mt: 2,
            fontStyle: "italic",
          }}
        >
          {formattedDate}
        </Typography>
      </Box>

      <ViewNote
        open={open}
        onClose={() => setOpen(false)}
        note={{ title, content, createdAt }}
      />
    </>
  );
}
