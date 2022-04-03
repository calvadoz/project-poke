import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/summon">
        <FontAwesomeIcon className="test" icon={faCoffee} />
        <button>Summon</button>
      </Link>
    </div>
  );
};

export default Home;
