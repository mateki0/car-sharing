import * as React from "react";

interface ContextProps {
  user: object;
  handleUserChange: (e: { email: string; id: string }) => void;
}

export const UserContext = React.createContext<ContextProps>({
  user: {},
  handleUserChange: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({});
  const handleUserChange = (e: { email: string; id: string }) => {
    setUser(e);
  };

  const value: ContextProps = { user, handleUserChange };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
