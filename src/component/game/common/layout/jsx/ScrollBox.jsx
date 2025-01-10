import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styles from "../style/ScrollBox.module.css";

export const ScrollBox = ({ children, direction = "vertical" }) => {
  const scrollBoxRef = useRef(null);

  useEffect(() => {
    if (scrollBoxRef.current) {
      if (direction === "horizontal") {
        scrollBoxRef.current.scrollLeft = scrollBoxRef.current.scrollWidth;
      } else if (direction === "vertical") {
        scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
      }
    }
  }, [children, direction]);

  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollBoxRef.current) {
        if (direction === "horizontal" && event.deltaY !== 0) {
          scrollBoxRef.current.scrollLeft += event.deltaY;
        } else if (direction === "vertical" && event.deltaY !== 0) {
          scrollBoxRef.current.scrollTop += event.deltaY;
        }
      }
    };

    const currentRef = scrollBoxRef.current;
    if (currentRef) {
      currentRef.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("wheel", handleWheel);
      }
    };
  }, [direction]);

  return (
    <div
      className={`${styles.scrollBox} ${
        direction === "vertical" ? styles.vertical : styles.horizontal
      }`}
      ref={scrollBoxRef}
    >
      {children}
    </div>
  );
};

ScrollBox.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["horizontal", "vertical"]),
};
