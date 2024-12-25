import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import style from "../../styles/ManageClient.module.css"; // Import CSS Module

const ManageClients = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateUserClick = () => {
    navigate("/user"); // Redirect to the new user creation page
  };

  return (
    <div>
      <h2>Manage Clients</h2>
      {/* Button to create a new user */}
      <button className={style.newUserBtn} onClick={handleCreateUserClick}>
        + New User
      </button>
      {/* Add more content related to managing clients here */}
    </div>
  );
};

export default ManageClients;
