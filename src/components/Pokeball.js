import React from "react";
import classes from "./Pokeball.module.css";
import { motion, AnimatePresence } from "framer-motion";
import PokeImage from "./PokeImage";

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
          <div className={classes["pokeball-wrapper-UR"]}>
            <PokeImage
              onClick={onOpenSingleHandler}
              classes="imageList"
              imageUrl={`${apiUrl}static/masterball.png`}
              alt="Masterball"
            />
          </div>
        )}
        {rarity === "SSR" && (
          <div className={classes["pokeball-wrapper-SSR"]}>
            <PokeImage
              onClick={onOpenSingleHandler}
              classes="imageList"
              imageUrl={`${apiUrl}static/ultraball.png`}
              alt="Ultraball"
            />
          </div>
        )}
        {rarity === "SR" && (
          <div className={classes["pokeball-wrapper-SR"]}>
            <PokeImage
              onClick={onOpenSingleHandler}
              classes="imageList"
              imageUrl={`${apiUrl}static/greatball.png`}
              alt="Greatball"
            />
          </div>
        )}
        {rarity === "R" && (
          <div className={classes["pokeball-wrapper-R"]}>
            <PokeImage
              onClick={onOpenSingleHandler}
              classes="imageList"
              imageUrl={`${apiUrl}static/pokeball.png`}
              alt="Pokeball"
            />
          </div>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Pokeball;
