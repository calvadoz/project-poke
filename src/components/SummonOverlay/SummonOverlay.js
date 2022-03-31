import React from "react";
import classes from "./SummonOverlay.module.css";
import { motion } from "framer-motion";

const SummonOverlay = (props) => {
  const { sparks } = props;
  const PARTICLE_NUMBERS = 200;
  const particles = [...Array(PARTICLE_NUMBERS)];
  let overlayClass = "";
  switch (sparks) {
    case "hasUR":
      overlayClass = classes["color-ur"];
      break;
    case "hasSSR":
      overlayClass = classes["color-ssr"];
      break;
    case "hasSR":
      overlayClass = classes["color-sr"];
      break;
    default:
      overlayClass = classes["zonk"];
      break;
  }

  return (
    <React.Fragment>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`${classes["ag-fireflies_box"]} classes.container`}
      >
        {particles.map((p, index) => (
          <div key={index} className={classes["ag-fireflies_item"]}>
            <div
              className={`${classes["ag-fireflies_inner"]} ${overlayClass}`}
            ></div>
          </div>
        ))}
      </motion.div>
    </React.Fragment>
  );
};

export default SummonOverlay;
