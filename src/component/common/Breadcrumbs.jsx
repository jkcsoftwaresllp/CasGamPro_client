import React from "react";
import { useLocation, Link } from "react-router-dom";
import style from "./style/Breadcrumbs.module.css";
import { useNavigate } from "react-router-dom";

export const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const handleEllipsisClick = () => {
    if (pathnames.length > 1) {
      const parentPath = `/${pathnames.slice(0, -1).join("/")}`;
      navigate(parentPath);
    }
  };

  return (
    <div className={style.breadcrumbs}>
      <Link to="/" className={style.breadcrumbLink}></Link>
      <div className={style.desktopBreadcrumbs}>
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
      <div className={style.mobileBreadcrumbs}>
        <span className={style.separator}>/</span>
        <span
          className={style.ellipsis}
          onClick={handleEllipsisClick}
          role="button"
          tabIndex={0}
        >
          ...
        </span>
        <span className={style.separator}>/</span>
        <span className={style.currentBreadcrumb}>
          {pathnames.length > 0 &&
            decodeURIComponent(pathnames[pathnames.length - 1])
              .replace(/-/g, " ")
              .toUpperCase()}
        </span>
      </div>
    </div>
  );
};
