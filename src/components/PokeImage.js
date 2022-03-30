import React, { useState } from "react";

const PokeImage = ({ onClick, imageUrl, alt, classes }) => {
  return <img onClick={onClick} className={classes} src={imageUrl} alt={alt} />;
};

export default PokeImage;
