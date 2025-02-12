import style from "../styles/HeaderBtn.module.css";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../common/Button";
import { routesPathClient as path } from "../../../routing/helper/routesPathClient";

export const HeaderBtnAgent = () => {
  const navigate = useNavigate();

  const agentTabs = [
    { label: "Reports", path: `${path.agentHome}${path.collectionReport}` },
  ];

  return (
    <div className={style.headerContainer}>
      <div className={style.buttonRow}>
        {agentTabs.map((tab) => (
          <Button
            onClick={() => navigate(tab.path)}
            label={tab.label}
            key={tab.label}
          />
        ))}
      </div>
    </div>
  );
};
