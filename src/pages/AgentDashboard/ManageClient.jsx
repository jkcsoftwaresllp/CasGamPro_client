import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import style from "../../styles/ManageClient.module.css"; // Import CSS Module
import Button from "../../components/Common/Button"; // Import Button component

const ManageClients = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    navigate("/user"); // Redirect to the new user creation page
  };

  return (
    <div>
      <h2>Manage Clients</h2>
      {/* Button to create a new user */}

      <Button label="+ New User" onClick={handleCreateUserClick} />
      {/* Add more content related to managing clients here */}
    </div>
  );
};

export default ManageClients;
