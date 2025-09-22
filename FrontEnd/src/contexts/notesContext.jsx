/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from "react";
import NotesReducer from "../reducers/noteReducer";

export const NotesContext = createContext([]);
export const DispatchContext = createContext(null);

export const NotesProvider = ({ children }) => {
  const [notes, notesDispatch] = useReducer(NotesReducer, []);

  return (
    <NotesContext.Provider value={notes}>
      <DispatchContext.Provider value={notesDispatch}>
        {children}
      </DispatchContext.Provider>
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
export const useDispatch = () => useContext(DispatchContext);
