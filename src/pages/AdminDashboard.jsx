import { Header } from "../components/AdminDashboard/Header";
import { SideBar } from "../components/AdminDashboard/Sidebar";
import styles from "../styles/AdminDashboard.module.css";

const AdminDashboard = () => {
  return (
    <>
      <div className={styles.casGamPro}>
        <Header />
        <div className={styles.mainContent}>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
