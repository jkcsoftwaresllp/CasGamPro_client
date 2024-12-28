import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import style from "../styles/ContentPage.module.css";
import Button from "../../../common/Button"; // Import Button component

const ManageClients = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    // Navigate to the desired route
    navigate("/agent/manageClient/adduser");
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
