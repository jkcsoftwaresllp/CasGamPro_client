import { Outlet, useOutletContext } from "react-router-dom";

export const ClientOutlet = () => {
  const context = useOutletContext() || {};
  const { data = [], loading = false } = context;

  return <Outlet context={{ data, loading }} />;
};
