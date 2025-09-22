import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { NavLink, useNavigate } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { useEffect, useState } from "react";
import { useUser, useDispatch } from "../contexts/userContext";
import ValidateToken from "../middleware/validateToken";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const drawerWidth = 240;
const navItems = [
  { label: "Home", path: "/" },
  { label: "My Notes", path: "/UserNotes" },
  { label: "New Note", path: "/new_note" },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NavBar(props) {
  const user = useUser();
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "Get current user" });
  }, []);

  useEffect(() => {
    if (user?.token) {
      const isLoggedIn = ValidateToken(user.token);
      if (isLoggedIn) setCurrentUser(user);
      else setCurrentUser(null);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogoutClick = (e) => {
    e.preventDefault();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch({ type: "Log Out" });
    setOpenDialog(false);
    navigate("/");
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Notiva
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgb(24,156,245)" : "white",
                  width: "100%",
                })}
              >
                <ListItemText primary={item.label} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          background:
            "linear-gradient(to bottom, rgba(10, 9, 10, 1), rgba(50, 41, 58, 0))",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSSSMQX61OnCmRHul_kI-981aLFNmQ5rnG0Q&s"
              alt="my_photo"
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: 2,
              }}
            />
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              Notiva
            </Typography>
            {currentUser ? (
              <>
                <Typography
                  sx={{ mr: 3, fontSize: 17, fontWeight: "bold", mt: 0.4 }}
                >
                  {currentUser.userName}
                </Typography>
                <NavLink
                  to="#"
                  onClick={handleLogoutClick}
                  style={{
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  Log Out
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/sign_up"
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "rgb(24,156,245)" : "white",
                    marginRight: "10px",
                  })}
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  style={({ isActive }) => ({
                    textDecoration: "none",
                    color: isActive ? "rgb(24,156,245)" : "white",
                  })}
                >
                  Log In
                </NavLink>
              </>
            )}
          </Box>

          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                style={({ isActive }) => ({
                  textDecoration: "none",
                  color: isActive ? "rgb(24,156,245)" : "white",
                  marginLeft: "20px",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </Box>

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#121212",
              color: "white",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />

      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="logout-dialog-description"
        PaperProps={{
          sx: {
            backgroundColor: "#1e1e1e",
            color: "white",
            borderRadius: 2,
            minWidth: 300,
          },
        }}
      >
        <DialogTitle>{"Log out"}</DialogTitle>
        <DialogContent>
          <DialogContentText
            id="logout-dialog-description"
            sx={{ color: "#bbb" }}
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: "gray" }}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirmLogout}
            sx={{ color: "rgb(24,156,245)" }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default NavBar;
