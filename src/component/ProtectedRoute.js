import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/AuthProvider";

function ProtectedRoute({ component }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, [user]);
  return <div>{user && component}</div>;
}

export default ProtectedRoute;
