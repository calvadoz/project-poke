import React from "react";
import classes from "./Pokeball.module.css";
import { motion, AnimatePresence } from "framer-motion";

const Pokeball = (props) => {
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;
  const { rarity, onOpenSingle, index } = props;

  const onOpenSingleHandler = () => {
    onOpenSingle(index);
  };

  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.1 },
    },
    exit: { scale: 0, opacity: 0 },
  };

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        {rarity === "UR" && (
          <motion.div
            {...animations}
            className={classes["pokeball-wrapper-UR"]}
          >
            <motion.img
              onClick={onOpenSingleHandler}
              className="imageList"
              src={`${apiUrl}static/masterball.png`}
              alt="Masterball"
            />
          </motion.div>
        )}
        {rarity === "SSR" && (
          <motion.div
            {...animations}
            className={classes["pokeball-wrapper-SSR"]}
          >
            <motion.img
              onClick={onOpenSingleHandler}
              className="imageList"
              src={`${apiUrl}static/ultraball.png`}
              alt="UltraBall"
            />
          </motion.div>
        )}
        {rarity === "SR" && (
          <motion.div
            {...animations}
            className={classes["pokeball-wrapper-SR"]}
          >
            <motion.img
              onClick={onOpenSingleHandler}
              className="imageList"
              src={`${apiUrl}static/greatball.png`}
              alt="GreatBall"
            />
          </motion.div>
        )}
        {rarity === "R" && (
          <motion.div {...animations} className={classes["pokeball-wrapper-R"]}>
            <motion.img
              onClick={onOpenSingleHandler}
              className="imageList"
              src={`${apiUrl}static/pokeball.png`}
              alt="PokeBall"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Pokeball;
