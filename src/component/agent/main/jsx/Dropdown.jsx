import style from "../styles/HeaderBtn.module.css";

import { useNavigate } from "react-router-dom";
import { IconBtn } from "../../../common/IconBtn";
import { SettingsIcon } from "../../../../assets/assets";

export const DropdownMenu = () => {
  const navigate = useNavigate();

  return (
    <div className={style.dropdownContainer}>
      <IconBtn icon={SettingsIcon} onClick={() => navigate("/settings")} />
    </div>
  );
};
