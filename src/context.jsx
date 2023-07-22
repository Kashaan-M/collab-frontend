import React, { useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(
    sessionStorage.getItem('signedIn' || false),
  );
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]); // topics
  const [proj, setProj] = useState(sessionStorage.getItem('proj') || 0);
  const [detail, setDetail] = useState({});
  const [agly, setAgly] = useState(1);
  return (
    <AppContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
        user,
        setUser,
        proj,
        setProj,
        projects,
        setProjects,
        detail,
        setDetail,
        agly,
        setAgly,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(AppContext);
};
export { AppContext, AppProvider };
