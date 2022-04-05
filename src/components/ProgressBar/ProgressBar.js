import React, { useEffect, useState } from "react";
import classes from "./ProgressBar.module.css";
import { motion } from "framer-motion";

const ProgressBar = ({ progress }) => {
  //   const [style, setStyle] = useState({});

  //   useEffect(() => {
  //     const newStyle = {
  //       opacity: 1,
  //       width: `${progress}%`,
  //     };

  //     setStyle(newStyle);
  //   }, [progress]);

  return (
    <div className={classes.progress}>
      <motion.div
        className={classes["progress-done"]}
        style={{
          width: `${progress < 7 ? 7 : progress.toFixed(1)}%`,
          opacity: 1,
        }}
      >
        <span>{progress.toFixed(1)} %</span>
      </motion.div>
    </div>
  );
};

export default ProgressBar;
