// src/pages/ManageClient.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router

const ManageClients = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    navigate("/admin/newUser"); // Redirect to the new user creation page
  };

  return (
    <div>
      <h2>Manage Clients</h2>
      {/* Button to create a new user */}
      <button onClick={handleCreateUserClick}>Create New User</button>
      {/* Add more content related to managing clients here */}
    </div>
  );
};

export default ManageClients;
