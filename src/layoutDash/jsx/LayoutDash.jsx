import { Outlet } from "react-router-dom";

export const LayoutDash = () => {
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
