import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { motion } from "framer-motion";
import PokeImage from "./../PokeImage/PokeImage";
import { fadeInAnimations } from "../Animations/Animation";

const apiUrl =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? process.env.REACT_APP_HEROKU_PROJECT_URL
    : process.env.REACT_APP_LOCAL_PROJECT_URL;

const Home = ({ banners }) => {
  return (
    <motion.div
      className={classes["summon-banner-wrapper"]}
      variants={fadeInAnimations}
      initial="hidden"
      animate="visible"
    >
      {banners.length > 0 &&
        banners.map((banner, index) => (
          <Link key={banner} to="/summon">
            <motion.div
              initial={{
                opacity: 0,
                y: "-100vh",
                x: index % 2 === 0 ? "-100vw" : "100vw",
              }}
              animate={{
                opacity: 1,
                y: 0,
                x: 0,
                transition: {
                  delay: index * 0.3,
                  ease: "easeInOut",
                },
              }}
              className={classes["summon-banner-container"]}
            >
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
