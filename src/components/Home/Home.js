import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { fadeInAnimations } from "./../Animations/fadeIn";
import { motion } from "framer-motion";

const Home = ({ banners }) => {
  return (
    <motion.div
      className={classes["summon-banner-wrapper"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {banners.length > 0 &&
        banners.map((banner) => (
          <Link to="/summon">
            <motion.div className={classes["summon-banner-container"]}>
              {banner}
            </motion.div>
          </Link>
        ))}
    </motion.div>
  );
};

export default Home;
