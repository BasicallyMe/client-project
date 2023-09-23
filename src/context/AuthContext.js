// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../backend/firebase";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const renderContent = () => {
    if (loading) {
      // Return a loading indicator here (e.g., a spinner or a loading message).
      return <div>Loading...</div>;
    } else {
      // Return the actual content once Firebase initialization is complete.
      return children;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {renderContent()}
    </AuthContext.Provider>
  );
};
