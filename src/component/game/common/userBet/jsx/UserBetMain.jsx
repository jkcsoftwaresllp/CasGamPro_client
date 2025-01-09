import { UserBetHeader } from "../jsx/UserBetHeader";
import { UserBetSection } from "../jsx/UserBetSection";
import style from "../style/UserBetMain.module.css";

export const UserBetMain = () => {
  return (
    <div className={style.userBetMain}>
      <UserBetHeader />
      <UserBetSection />
    </div>
  );
};
