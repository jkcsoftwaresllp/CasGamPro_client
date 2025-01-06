import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/Home.module.css";
import { Loader } from "../../component/common/Loader";
import { Button } from "../../component/common/Button";

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // Simulates a delay
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleAgentClick = () => {
    navigate("/agent");
  };

  return (
    <div className={style.home}>
      {loading ? (
        <div className={style.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <>
          <div className={style.container}>
            <h1 className={style.title}>casGamPro</h1>

            <div className={style.buttonContainer}>
              <Button label="Agent Dashboard" onClick={handleAgentClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

