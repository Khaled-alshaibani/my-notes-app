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
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import sign_in from "../middleware/login";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "../contexts/userContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validate() {
    let valid = true;
    const newErrors = { email: "", password: "" };

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

  async function login() {
    if (!validate()) return;
    console.log("Login success:", userInfo);

    if (!validate()) return;

    try {
      const user = await sign_in(userInfo.email, userInfo.password);

      setUserInfo({ email: "", password: "" });
      setErrors({ email: "", password: "" });

      dispatch({ type: "Set User", payload: user });

      navigator("/");
    } catch (error) {
      console.error("Sign in failed:", error);
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
            Login
          </Typography>

          <Stack spacing={3} sx={{ width: "100%" }}>
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShow(!show)}
                      edge="end"
                      sx={{
                        color: "white",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              onClick={login}
              sx={{
                mt: 2,
                bgcolor: "#18a0fb",
                "&:hover": { bgcolor: "#0d8ddc" },
                fontWeight: "bold",
              }}
            >
              Login
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
          Don't Have an Account yet?{" "}
          <Link
            to="/sign_up"
            style={{
              color: "#189cf5",
              fontWeight: "bold",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
          >
            Sign Up Here
          </Link>
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default Login;
