import "./App.css";
import MainComponent from "./components/mainComponent";
import { NotesProvider } from "./contexts/notesContext";
import { Routes, Route, Link } from "react-router-dom";

import SignUp from "./components/sign_up";
import Login from "./components/login";
import UserNotes from "./components/userNotes";
import NavBar from "./components/navBar";
import { UserProvider } from "./contexts/userContext";
function App() {
  return (
    <div className="mainApp">
      <UserProvider>
        <NotesProvider>
          <NavBar />

          <Routes>
            <Route path="/" element={<MainComponent />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/UserNotes" element={<UserNotes />} />
          </Routes>
        </NotesProvider>
      </UserProvider>
    </div>
  );
}

export default App;
