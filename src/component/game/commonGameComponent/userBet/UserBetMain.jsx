import UserBetHeader from "./UserBetHeader/UserBetHeader";
import UserBetSection from "./UserBetSection/UserBetSection";
import style from "./style/UserBetMain.module.css";
const UserBetMain = () => {
  return (
    <div className={style.main}>
      <UserBetHeader />
      <UserBetSection />
    </div>
  );
};
export default UserBetMain;
