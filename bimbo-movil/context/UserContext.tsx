import React, { createContext, useState, useContext } from "react";

type UserContextType = {
  employeeName: string;
  setEmployeeName: (name: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employeeName, setEmployeeName] = useState("");

  return (
    <UserContext.Provider value={{ employeeName, setEmployeeName }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
