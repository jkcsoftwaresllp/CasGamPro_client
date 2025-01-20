import { IconBtn } from "../../component/common/IconBtn";
import { useNavigate } from "react-router-dom";
import style from "../style/Header.module.css";

import { scheduleIcon, rulesIcon, homeIcon } from "../../assets/assets";
export const HeaderBtnGroup = () => {
  const navigate = useNavigate();

  // Function to navigate to a specific path
  const navigateTo = (path) => {
    navigate(path);
  };
  return (
    <div className={style.buttonContainer}>
      <IconBtn
        icon={rulesIcon}
        label="Rules"
        onClick={() => navigateTo("/dash")}
      />
      <IconBtn
        icon={homeIcon}
        label="Home"
        onClick={() => navigateTo("/dash/home")}
      />
      <IconBtn
        icon={scheduleIcon}
        label="Schedule"
        onClick={() => navigateTo("/dash/schedule")}
      />
    </div>
  );
};
