import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { fadeInAnimations } from "./../Animations/fadeIn";
import { motion } from "framer-motion";
import PokeImage from "./../PokeImage/PokeImage";

const apiUrl =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? process.env.REACT_APP_HEROKU_PROJECT_URL
    : process.env.REACT_APP_LOCAL_PROJECT_URL;

const Home = ({ banners }) => {
  return (
    <motion.div
      className={classes["summon-banner-wrapper"]}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {banners.length > 0 &&
        banners.map((banner) => (
          <Link key={banner} to="/summon">
            <motion.div className={classes["summon-banner-container"]}>
              <PokeImage
                onClick={() => null}
                imageUrl={`${apiUrl}static/${banner}.png`}
              />
            </motion.div>
          </Link>
        ))}
    </motion.div>
  );
};

export default Home;
