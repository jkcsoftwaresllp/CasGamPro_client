import { Routes, Route } from "react-router-dom";
import { routesPathClient as path } from "../helper/routesPathClient";
import { ErrorPage } from "../../../pages/jsx/Error";
import { Home } from "../../client/jsx/Home";

export const ClientRoutes = () => {
  return (
    <Routes>
      <Route path={path.home} element={<Home />} />
      <Route path={`${path.gameCatagory}/*`} element={<>Game Catagory</>} />
      <Route path={path.ledger} element={<>Ledger</>} />
      <Route path={path.password} element={<>Password</>} />
      <Route path={path.playHistory} element={<>Play History</>} />
      <Route path={path.rules} element={<>Rules</>} />
      <Route path={path.settings} element={<>Settings</>} />

      <Route
        path="*"
        element={
          <ErrorPage
            errorCode="ERR404"
            errorMessage="The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  );
};
