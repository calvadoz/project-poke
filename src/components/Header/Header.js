import React from "react";
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={classes.header}>
      <FontAwesomeIcon
        className="button-icon fa-spin"
        icon={["fas", "spinner"]}
      />
    </header>
  );
};

export default Header;
