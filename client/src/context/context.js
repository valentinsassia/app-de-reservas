import { useState, createContext, useContext } from "react";

export const Contextos = createContext();

export const Contexto = ({ children }) => {
  const [infoReservas, setInfoReservas] = useState({reservas: []})
  return <Contextos.Provider value={{infoReservas, setInfoReservas}}>{children}</Contextos.Provider>;
};
