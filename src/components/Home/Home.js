import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { fadeInAnimations } from "./../Animations/fadeIn";
import { motion } from "framer-motion";

const banners = ["gen-1", "gen-2", "gen-3", "all-gen"];

const Home = () => {
  return (
    <motion.div
      className={classes["summon-banner-wrapper"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Link to="/summon">
        <motion.div className={classes["summon-banner-container"]}></motion.div>
      </Link>
      <Link to="/summon">
        <motion.div className={classes["summon-banner-container"]}></motion.div>
      </Link>
      <Link to="/summon">
        <motion.div className={classes["summon-banner-container"]}></motion.div>
      </Link>
      <Link to="/summon">
        <motion.div className={classes["summon-banner-container"]}></motion.div>
      </Link>
      {/* <h2>Home</h2>
      <Link to="/summon">
        <FontAwesomeIcon className="test" icon={faCoffee} />
        <button>Summon</button>
      </Link> */}
    </motion.div>
  );
};

export default Home;
