import style from "../style/HeaderBtnGroup.module.css";
import { routesPathClient as path } from "../../routing/helper/routesPathClient";
import { useNavigate } from "react-router-dom";

export const HeaderBtnGroup = () => {
  const navigate = useNavigate();

  const tabs = [
    { label: "Home", path: path.client },
    {
      label: "Rules",
      path: `${path.client}${path.rules}`,
    },
    {
      label: "Games",
      path: `${path.client}${path.gameCatagory}`,
    },
    {
      label: "Casino",
      path: `${path.client}${path.gameCatagory}${path.catagory1}`,
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
