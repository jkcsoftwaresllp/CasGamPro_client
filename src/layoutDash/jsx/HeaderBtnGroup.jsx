import { HeaderBtn } from "./HeaderBtn";
import style from "../style/Header.module.css";
import Home from "../images/home.svg";
import Schedule from "../images/schedule.svg";
import Rules from "../images/rules.svg";
import LogOut from "../images/logout.svg";

export const HeaderBtnGroup = () => {
  return (
    <div className={style.buttonContainer}>
      <HeaderBtn
        icon={Rules}
        label="Rules"
        onClick={() => console.log("Rules clicked")}
      />
      <HeaderBtn
        icon={Home}
        label="Home"
        onClick={() => console.log("Home clicked")}
      />
      <HeaderBtn
        icon={Schedule}
        label="Schedule"
        onClick={() => console.log("Schedule clicked")}
      />
      <HeaderBtn
        icon={LogOut}
        label="LogOut"
        onClick={() => console.log("LogOut clicked")}
      />
    </div>
  );
};
