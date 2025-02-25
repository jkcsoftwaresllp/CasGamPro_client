import React, { useEffect, useRef } from "react";
import styles from "../style/ScrollBox.module.css";

export const ScrollBox = ({
  children,
  direction = "vertical",
  gap = "5px",
}) => {
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

  const cssVariable = {
    "--gap": gap,
  };

  return (
    <div
      className={`${styles.scrollBox} ${
        direction === "vertical" ? styles.vertical : styles.horizontal
      }`}
      ref={scrollBoxRef}
      style={cssVariable}
    >
      {children}
    </div>
  );
};
