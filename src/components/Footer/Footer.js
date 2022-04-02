import React from "react";
import classes from "./Footer.module.css";

const Footer = ({ clientVersion, serverVersion }) => {
  return (
    <footer className={classes.footer}>
      <span>Version: {serverVersion}</span>
    </footer>
  );
};

export default Footer;
