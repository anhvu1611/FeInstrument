import React from 'react';

const UserContext = React.createContext({ username: '', auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: '', auth: false });

  const loginContext = (username, token) => {
    setUser({
      username: username,
      auth: true
    });
    localStorage.setItem('token', token);
    console.log('Token:', token);
    
  };

  const logout = () => {
    localStorage.removeItem("token")
    setUser({
      username: '',
      auth: false
    });
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
