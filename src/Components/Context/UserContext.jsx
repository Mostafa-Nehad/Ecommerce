import { useState, createContext, useEffect } from "react";

export const UserContext = createContext({
  userLogin: null,
  setuserLogin: () => {},
});

export default function UserContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      setuserLogin(token);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin }}>
      {children}
    </UserContext.Provider>
  );
}
