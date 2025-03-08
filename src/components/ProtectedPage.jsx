import React from "react";
import { useNavigate } from "react-router-dom";

const ProtectedPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Welcome to the protected page!</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProtectedPage;
