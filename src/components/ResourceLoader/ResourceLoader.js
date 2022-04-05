import React, { useState, useEffect } from "react";
import classes from "./ResourceLoader.module.css";
import { AnimatePresence, motion } from "framer-motion";
import ProgressBar from "../ProgressBar/ProgressBar";

const ResourceLoader = ({ progress }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
        exit={{ opacity: 0, x: "-100vw", transition: { duration: 2 } }}
        className={classes["loader-wrapper"]}
      >
        <motion.div
          initial={{ opacity: 0, y: "100vh" }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.4 } }}
          exit={{ opacity: 0, x: "-100vw", transition: { duration: 2 } }}
          className={classes["loader-container"]}
        >
          <p>Loading resources for the first time, it may take some time...</p>
          {progress > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <ProgressBar progress={progress} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ResourceLoader;
