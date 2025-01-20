import React from "react";
import PropTypes from "prop-types";

export const Icon = ({ type, size = 24, onClick, title }) => {
  switch (type) {
    case "login":
      return (
        <img
          src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px' fill='grey'><path d='M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z'/></svg>"
          alt="Login"
          width={size}
          height={size}
          onClick={onClick}
          title={title}
        />
      );

    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size}
          viewBox="0 -960 960 960"
          width={size}
          fill="grey"
        >
          <path d="M226-262q59-39.67 121-60.83Q409-344 480-344t133.33 21.17q62.34 21.16 121.34 60.83 41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM479.73-80q-83.1 0-156.18-31.5-73.09-31.5-127.15-85.83-54.07-54.34-85.23-127.23Q80-397.45 80-480.33q0-82.88 31.5-155.78Q143-709 197.33-763q54.34-54 127.23-85.5T480.33-880q82.88 0 155.78 31.5Q709-817 763-763t85.5 127Q880-563 880-480.18q0 82.83-31.5 155.67Q817-251.67 763-197.33 709-143 635.91-111.5 562.83-80 479.73-80Z" />
        </svg>
      );

    case "coin":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height={size}
          viewBox="0 -960 960 960"
          width={size}
          fill="grey"
        >
          <path d="M444-200h70v-50q50-9 86-39t36-89q0-42-24-77t-96-61q-60-20-83-35t-23-41q0-26 18.5-41t53.5-15q32 0 50 15.5t26 38.5l64-26q-11-35-40.5-61T516-710v-50h-70v50q-50 11-78 44t-28 74q0 47 27.5 76t86.5 50q63 23 87.5 41t24.5 47q0 33-23.5 48.5T486-314q-33 0-58.5-20.5T390-396l-66 26q14 48 43.5 77.5T444-252v52Zm36 120q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
        </svg>
      );

    default:
      return null;
  }
};

Icon.propTypes = {
  type: PropTypes.oneOf(["login", "user", "coin"]).isRequired,
  size: PropTypes.number,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

export default Icon;
