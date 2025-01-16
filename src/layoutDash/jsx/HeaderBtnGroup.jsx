import { IconBtn } from "../../component/common/IconBtn";
import { useNavigate } from "react-router-dom";
import style from "../style/Header.module.css";
import Home from "../images/home.svg";
import Schedule from "../images/schedule.svg";
import Rules from "../images/rules.svg";
import LogOut from "../images/logout.svg";

export const HeaderBtnGroup = () => {
  const navigate = useNavigate();

  // Function to navigate to a specific path
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className={style.buttonContainer}>
      <IconBtn icon={Rules} label="Rules" onClick={() => navigateTo("/dash")} />
      <IconBtn
        icon={Home}
        label="Home"
        onClick={() => navigateTo("/dash/home")}
      />
      <IconBtn
        icon={Schedule}
        label="Schedule"
        onClick={() => navigateTo("/dash/schedule")}
      />
    </div>
  );
};
