import React, { useState } from "react";
import { motion } from "framer-motion";

const PokeImage = ({ onClick, imageUrl, alt, classes }) => {
  const fadeInAnimations = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.3 },
    },
    exit: { scale: 0, opacity: 0 },
  };

  return (
    <motion.img
      {...fadeInAnimations}
      onClick={onClick}
      className={classes}
      src={imageUrl}
      alt={alt}
    />
  );
};

export default PokeImage;
