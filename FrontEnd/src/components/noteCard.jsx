import { Box, Typography } from "@mui/material";

export default function NoteCard({ title, content, createdAt }) {
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
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
        maxWidth: 450,
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
            fontSize: "1.3rem",
            borderBottom: "2px solid rgba(255,255,255,0.2)",
            pb: 1,
            mb: 2,
            maxHeight: 120,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "rgba(255,255,255,0.9)",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}
        >
          {content}
        </Typography>
      </Box>

      <Typography
        sx={{
          color: "rgba(200,200,200,0.7)",
          fontSize: "0.85rem",
          textAlign: "right",
          mt: 3,
          fontStyle: "italic",
        }}
      >
        {formattedDate}
      </Typography>
    </Box>
  );
}
