import style from "../styles/HeaderBtn.module.css";
import { useState } from "react";
import { Button } from "../../../common/Button";
import { IconBtn } from "../../../common/IconBtn";
import { AccountIcon } from "../../../../assets/assets";

export const DropdownMenu = ({ navigate }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className={style.dropdownContainer}>
      <IconBtn
        onClick={() => setShowDropdown(!showDropdown)}
        icon={AccountIcon}
        className={showDropdown ? style.iconShifted : ""}
      />
      {showDropdown && (
        <div className={style.dropdownMenu}>
          <Button onClick={() => navigate("/settings")} label="Settings" />
          <Button onClick={() => navigate("/logout")} label="Logout" />
        </div>
      )}
    </div>
  );
};
