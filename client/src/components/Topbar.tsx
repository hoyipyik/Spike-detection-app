import React from "react";
import { APP_NAME } from "../tools/variable";
import styles from "./topbar.module.css";

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <h3>
        {APP_NAME}
      </h3>
    </div>
  );
};

export default Topbar;
