import React from "react";
import { Loader } from "../../component/common/Loader";
import styles from "../styles/Routing.module.css";

const LoadingState = () => (
  <div className={styles.loaderContainer}>
    <Loader />
  </div>
);

export default LoadingState;
