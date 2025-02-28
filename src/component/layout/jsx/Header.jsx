import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import style from "../style/Header.module.css";
import { HeaderHelper } from "../helper/HeaderHelper";
import { HeaderToggle } from "../helper/HeaderToggle";
import { HeaderAuth } from "../helper/HeaderAuth";
import { useAuth } from "../../../context/jsx/AuthContext";
import { Wallet } from "../../client/jsx/Wallet";

export const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { username, clientName } = user || {};

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Toggle menu
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close menu when clicking outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  // Detect screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={style.headerWrapper} onClick={handleClickOutside}>
      <div className={style.header}>
        <h1 className={style.header__title} onClick={() => navigate("/")}>
          CasGamPro
        </h1>
        <div className={style.fullSection}>
          <HeaderHelper />
        </div>

        <div className={style.rightSection}>
          {/* Show all options directly on larger screens */}
          {!isMobile ? (
            <>
              {username && (
                <>
                  <p className={style.userId}>
                    {username?.toUpperCase()} : {clientName}
                  </p>
                  <Wallet />
                </>
              )}
              <HeaderAuth />
              <HeaderToggle />
            </>
          ) : (
            <>
              {/* Hamburger Menu Button for Small Screens */}
              <button className={style.hamburger} onClick={toggleMenu}>
                <FaBars />
              </button>

              {/* Dropdown Menu for Small Screens */}
              {menuOpen && (
                <div ref={menuRef} className={style.menuDropdown}>
                  {username && (
                    <p className={style.userId}>
                      {username?.toUpperCase()} : {clientName}
                    </p>
                  )}
                  {username && <Wallet />}
                  <HeaderAuth />
                  <HeaderToggle />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
