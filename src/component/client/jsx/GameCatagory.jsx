import React from "react";
import styles from "../style/Home.module.css";
import { Button } from "../../common/Button";
import { gameCatagoryButtonDetails as btnDetails } from "../helper/gameCatagoryButtonDetails";
import { useButtonNavigation } from "../../../hooks/useButtonNavigation";

export const GameCatagory = ({}) => {
  const handleNavigation = useButtonNavigation();
  return (
    <div className={styles.home}>
      <div className={styles.homeBtn}>
        {btnDetails.map((button, index) => (
          <Button
            key={index}
            label={button.label}
            onClick={() => handleNavigation(button.path)}
          />
        ))}
      </div>
    </div>
  );
};
