import React from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./style/Breadcrumbs.module.css";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className={style.breadcrumbs}>
      <Link to="/" className={style.breadcrumbLink}></Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return (
          <span key={to} className={style.breadcrumbItem}>
            <span className={style.separator}> / </span>
            {!isLast ? (
              <Link to={to} className={style.breadcrumbLink}>
                {decodeURIComponent(value).replace(/-/g, " ").toUpperCase()}
              </Link>
            ) : (
              <span className={style.currentBreadcrumb}>
                {decodeURIComponent(value).replace(/-/g, " ").toUpperCase()}
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
