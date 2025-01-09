import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import style from "../styles/ErrorPage.module.css"; // Import the CSS file
import { Button } from "../../component/common/Button";

export const ErrorPage = ({ errorCode, errorMessage }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleGoHome = () => {
    navigate("/"); // Navigate to home page
  };

  return (
    <div className={style.notFound}>
      <div className={style.errorCode}>{errorCode}</div>
      <div className={style.errorMessage}>
        <strong>{errorCode}</strong>: {errorMessage}
      </div>
      <Button label="Go to Home" onClick={handleGoHome} />
    </div>
  );
};
