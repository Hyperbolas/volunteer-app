import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
//references: chatgpt, https://www.youtube.com/watch?v=b43uPnSM2Ow

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show while Firebase checks auth
  }

  if (!user) {
    return <Navigate to="/login" />; // Redirect if not logged in
  }

  return children; // Show the protected page if logged in
};

export default PrivateRoute;
