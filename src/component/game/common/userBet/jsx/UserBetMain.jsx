import UserBetHeader from "../jsx/UserBetHeader";
import UserBetSection from "../jsx/UserBetSection";
import style from "../style/UserBetMain.module.css";

const UserBetMain = () => {
  return (
    <div className={style.main}>
      <UserBetHeader />
      <UserBetSection />
    </div>
  );
};
export default UserBetMain;
