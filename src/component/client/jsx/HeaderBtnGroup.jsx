import style from "../style/HeaderBtnGroup.module.css";
import { routesPathClient } from "../../routing/helper/routesPathClient";
import { useNavigate } from "react-router-dom";

export const HeaderBtnGroup = () => {
  const navigate = useNavigate();

  const tabs = [
    { label: "Home", path: routesPathClient.client },
    {
      label: "Rules",
      path: `${routesPathClient.client}${routesPathClient.rules}`,
    },
    {
      label: "Games",
      path: `${routesPathClient.client}${routesPathClient.gameCatagory}`,
    },
    {
      label: "Casino",
      path: `${routesPathClient.client}${routesPathClient.gameCatagory}${routesPathClient.catagory1}`,
    },
  ];

  const tabList = tabs.map((tab, index) => (
    <button
      key={index}
      onClick={() => navigate(tab.path)}
      className={style.button}
    >
      {tab.label}
    </button>
  ));

  return <div className={style.buttonContainer}>{tabList}</div>;
};
