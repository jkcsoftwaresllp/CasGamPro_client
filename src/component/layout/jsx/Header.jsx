import { useNavigate } from "react-router-dom";
import style from "../style/Header.module.css";
import { HeaderHelper } from "../helper/HeaderHelper";
import { HeaderToggle } from "../helper/HeaderToggle";
import { HeaderAuth } from "../helper/HeaderAuth";
import { useAuth } from "../../../context/jsx/AuthContext";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  let userId, username;

  if (user) {
    userId = user.userId;
    username = user.username;
  }

  // Navigation handlers
  const handleHomeClick = () => navigate("/");

  return (
    <header className={style.headerWrapper}>
      <div className={style.header}>
        <h1 className={style.header__title} onClick={handleHomeClick}>
          CasGamPro
        </h1>
        <div className={style.fullSection}>
          <HeaderHelper />
        </div>

        <div className={style.rightSection}>
          {user && <p>{username} </p>}
          {user && <p>{userId} </p>}
          <HeaderAuth />
          <HeaderToggle />
        </div>
      </div>
    </header>
  );
};
