// Contexto del usuario que esta realizando el conteo.
import React, { createContext, useState, useContext } from "react";

type UserContextType = {
  employeeName: string;
  setEmployeeName: (name: string) => void;
  employeeNumber: string;
  setEmployeeNumber: (number: string) => void;
};

// Creación del contexto
const UserContext = createContext<UserContextType | undefined>(undefined);

// Proveedor del contexto
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");

  return (
    <UserContext.Provider
      value={{
        employeeName,
        setEmployeeName,
        employeeNumber,
        setEmployeeNumber(number) {},
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
