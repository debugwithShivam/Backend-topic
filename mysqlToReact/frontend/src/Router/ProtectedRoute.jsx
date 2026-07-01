import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import LoginPage from "../components/login/LoginPage";
import Setting from "../components/Setting/Setting";

export default function ProtectedRoute({children}) {
  const [authStatus, setAuthStatus] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    async function checkAuth(params) {
      try {
        const response = await axios.get("http://localhost:4876/auth/checkAuth",{ withCredentials: true },);

       setAuthStatus(response.data.authenticated);
      } catch (err) {
        setAuthStatus(false);
      }
    }
    checkAuth();
  }, []);

  if (authStatus == null) {
    return <h1>Loading...</h1>;
  }

    if (!authStatus) {
    return <Navigate to="/login" replace />;
  }
    return children;
}
