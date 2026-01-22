import { Backdrop, CircularProgress } from "@mui/material";

const LoadingOverlay = ({ open }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 10,
        backgroundColor: "rgba(0,0,0,0.6)",
      }}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default LoadingOverlay;
