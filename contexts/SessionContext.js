import { createContext } from "react";

const SessionContext = createContext({
  token: "",
  setToken: () => {},
});

export default SessionContext;
