import React, { useEffect, useRef } from "react";
import styles from "../style/HorizontalScrollBox.module.css";

export const HorizontalScrollBox = ({ children }) => {
  const scrollBoxRef = useRef(null);

  // Automatically scroll to the end when content changes
  useEffect(() => {
    if (scrollBoxRef.current) {
      scrollBoxRef.current.scrollLeft = scrollBoxRef.current.scrollWidth;
    }
  }, [children]);

  // Handle horizontal scrolling on mouse wheel events
  useEffect(() => {
    const handleWheel = (event) => {
      if (scrollBoxRef.current) {
        if (event.deltaY !== 0) {
          scrollBoxRef.current.scrollLeft += event.deltaY;
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
  }, []);

  return (
    <div className={styles.scrollBox} ref={scrollBoxRef}>
      {children}
    </div>
  );
};
