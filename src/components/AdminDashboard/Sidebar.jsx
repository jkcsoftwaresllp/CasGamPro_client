import { SideTab } from "./SideTab";
import style from "./styles/SideBar.module.css";

export const SideBar = () => {
  return (
    <div className={style.sideBar}>
      {/* <div className={style.label}>Navigation Bar</div> */}
      <div className={style.sideTabList}>
        <SideTab onClick={() => console.log("Home Clicked")} title={"Home"} />
        <SideTab
          onClick={() => console.log("Add Client Clicked")}
          title={"Add Client"}
        />
        <SideTab
          onClick={() => console.log("All Client Clicked")}
          title={"All Clients"}
        />
      </div>
    </div>
  );
};
