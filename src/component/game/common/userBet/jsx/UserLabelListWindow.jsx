import {UserLabelList} from "../jsx/UserLabelList"; // Adjust the path based on your folder structure
import style from "../style/UserLabelListWindow.module.css";

export const UserLabelListWindow = () => {
  const lists = [
    { name: "A", odd: "1.5", stake: "100", profit: "150" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
    { name: "C", odd: "1.8", stake: "150", profit: "270" },
    { name: "A", odd: "1.5", stake: "500", profit: "130" },
    { name: "B", odd: "2.0", stake: "200", profit: "400" },
  ];

  return (
    <div className={style.window}>
      {lists.map((list, index) => (
        <UserLabelList
          key={index}
          name={list.name}
          odd={list.odd}
          stake={list.stake}
          profit={list.profit}
        />
      ))}
    </div>
  );
};
