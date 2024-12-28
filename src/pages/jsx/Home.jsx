import { useState, useEffect } from "react";
import style from "../styles/Home.module.css";
import Loader from "../../component/common/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Simulate loading data
  useEffect(() => {
    // Set loading state to false after content is ready
    setLoading(false);
  }, []);

  return (
    <div className={style.home}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <h1 className={style.title}>casGamPro</h1>
      )}
    </div>
  );
};

export default Home;
