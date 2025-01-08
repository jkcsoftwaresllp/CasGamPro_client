import { useEffect, useRef, useState } from "react";
import styles from "../style/VedioSection.module.css";
import { setupSocket, playFrames } from "../helper/vedioHelper";
import { CircleButton } from "./CircleBtn";

import homeIcon from "../images/home.svg";
import infoIcon from "../images/info.svg";

export const VideoSection = () => {
  const canvasRef = useRef(null);
  const [frameQueue, setFrameQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    if (!isPlaying) {
      setIsPlaying(true);
      playFrames(canvas, context, frameQueue, setFrameQueue, isPlaying);
    }

    const cleanupSocket = setupSocket(setFrameQueue, setIsPlaying);

    return () => {
      cleanupSocket();
      setIsPlaying(false);
    };
  }, [frameQueue, isPlaying]);

  return (
    <div className={styles.videoSectionContainer}>
      <div className={styles.buttonContainer}>
        <CircleButton label="Home" svg={homeIcon} />
        <CircleButton label="Info" svg={infoIcon} />
      </div>
      <canvas ref={canvasRef} className={styles.videoCanvas} />
    </div>
  );
};
