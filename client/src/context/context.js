import { useState, createContext, useContext } from "react";

export const Contextos = createContext();

export const Contexto = ({ children }) => {
  const [reservas, setReservas] = useState({horas: []})
  return <Contextos.Provider value={{reservas, setReservas}}>{children}</Contextos.Provider>;
};
