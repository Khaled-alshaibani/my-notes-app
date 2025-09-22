/* eslint-disable react-refresh/only-export-components */

import { createContext, useReducer } from "react";
import { useContext } from "react";
import UserReducer from "../reducers/userReducer";

export const UserContext = createContext({});
export const DispatchContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(UserReducer, { userName: null, token: null});

  return (
    <UserContext.Provider value={user}>
      <DispatchContext.Provider value={userDispatch}>
        {children}
      </DispatchContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useDispatch = () => useContext(DispatchContext);
