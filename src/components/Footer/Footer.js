import React from "react";
import classes from "./Footer.module.css";

const Footer = ({ serverVersion }) => {
  return (
    <footer className={classes.footer}>
      <span style={{ marginRight: 8 }}>Version: {serverVersion}</span>
    </footer>
  );
};

export default Footer;
