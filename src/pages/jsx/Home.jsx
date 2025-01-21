import { useNavigate } from "react-router-dom";
import style from "../styles/Home.module.css";
import { Loader } from "../../component/common/Loader";
import { Button } from "../../component/common/Button";
import { routesPathClient } from "../../component/routing/helper/routesPathClient";
import { useAuth } from "../../context/jsx/AuthContext";

export const Home = () => {
  const { loading } = useAuth();
  const navigate = useNavigate();

  const handleAgentClick = () => {
    navigate(routesPathClient.client);
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
            <h1 className={style.title}>CasGamPro</h1>

            <div className={style.buttonContainer}>
              <Button label="Let's Play Game" onClick={handleAgentClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
