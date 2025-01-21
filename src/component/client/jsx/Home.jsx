import React from "react";
import styles from "../style/Home.module.css";
import { Button } from "../../common/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { homeButtonDetails as btnDetails } from "../helper/homeButtonDetails";

export const Home = ({}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handler for button clicks
  const handleButtonClick = (relativePath) => {
    const basePath = location.pathname.replace(/\/$/, "");
    navigate(`${basePath}${relativePath}`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.homeBtn}>
        {btnDetails.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            onClick={() => handleButtonClick(button.path)}
          />
        ))}
      </div>
    </div>
  );
};
