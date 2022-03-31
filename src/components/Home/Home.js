import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <Link to="/summon">
        <button>Summon</button>
      </Link>
    </div>
  );
};

export default Home;
