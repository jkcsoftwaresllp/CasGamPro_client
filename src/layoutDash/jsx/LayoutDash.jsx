import { Outlet } from "react-router-dom";
import { HeaderMain } from "./HeaderMain";

export const LayoutDash = () => {
  return (
    <div>
      <HeaderMain />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
