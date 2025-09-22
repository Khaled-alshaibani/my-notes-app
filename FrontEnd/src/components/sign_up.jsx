import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import validator from "validator";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import sign_up from "../middleware/sign_up";
import { useDispatch } from "../contexts/userContext";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  function validate() {
    let valid = true;
    const newErrors = { userName: "", email: "", password: "" };

    if (!userInfo.userName.trim()) {
      newErrors.userName = "Username is required";
      valid = false;
    }

    if (!validator.isEmail(userInfo.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!validator.isStrongPassword(userInfo.password)) {
      newErrors.password =
        "Password must be at least 8 chars, include uppercase, lowercase, number, and symbol";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  }

  async function handleSubmit() {
    if (!validate()) return;

    try {
      sign_up(userInfo.userName, userInfo.email, userInfo.password);

      setUserInfo({ userName: "", email: "", password: "" });
      setErrors({ userName: "", email: "", password: "" });

      dispatch({ type: "Get current User" });

      navigator("/");
    } catch (error) {
      console.error("Sign up failed:", error);
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "rgba(33, 47, 59, 0.95)",
            width: "100%",
            p: 4,
            color: "white",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #3a4a58",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          <Typography
            variant="h4"
            sx={{ mb: 3, fontWeight: "bold", color: "#18a0fb" }}
          >
            Sign Up
          </Typography>

          <Stack spacing={3} sx={{ width: "100%" }}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={userInfo.userName}
              onChange={(e) =>
                setUserInfo({ ...userInfo, userName: e.target.value })
              }
              error={!!errors.userName}
              helperText={errors.userName}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#18a0fb" },
                  "&.Mui-focused fieldset": { borderColor: "#18a0fb" },
                },
                "& label.Mui-focused": { color: "#18a0fb" },
              }}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo({ ...userInfo, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#18a0fb" },
                  "&.Mui-focused fieldset": { borderColor: "#18a0fb" },
                },
                "& label.Mui-focused": { color: "#18a0fb" },
              }}
            />

            <TextField
              label="Password"
              type={show ? "text" : "password"}
              variant="outlined"
              fullWidth
              value={userInfo.password}
              onChange={(e) =>
                setUserInfo({ ...userInfo, password: e.target.value })
              }
              error={!!errors.password}
              helperText={errors.password}
              sx={{
                input: { color: "white" },
                label: { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "white" },
                  "&:hover fieldset": { borderColor: "#18a0fb" },
                  "&.Mui-focused fieldset": { borderColor: "#18a0fb" },
                },
                "& label.Mui-focused": { color: "#18a0fb" },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <Button
                      onClick={() => setShow(!show)}
                      disableRipple
                      disableFocusRipple
                      sx={{
                        color: "white",
                        maxWidth: "40px",
                        p: 0,
                        backgroundColor: "transparent",
                        "&:hover": { backgroundColor: "transparent" },
                        "&:active": { backgroundColor: "transparent" },
                        "&:focus": { outline: "none" },
                        "&:focusVisible": { outline: "none" },
                      }}
                    >
                      {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </Button>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{
                mt: 2,
                bgcolor: "#18a0fb",
                "&:hover": { bgcolor: "#0d8ddc" },
                fontWeight: "bold",
              }}
            >
              Register
            </Button>
          </Stack>
        </Box>
        <Typography
          sx={{
            color: "#b0b0b0", // رمادي فاتح
            mt: 3,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          Do You Already Have an Account?{" "}
          <Link
            to="/login"
            style={{
              color: "#189cf5",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Login Here.
          </Link>
        </Typography>
      </Container>
    </React.Fragment>
  );
}
