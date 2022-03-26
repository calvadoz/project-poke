import React from "react";
import classes from "./PokemonReveal.module.css";

const PokemonReveal = (props) => {
  const { pokemon } = props;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;

  return (
    <React.Fragment>
      <img
        className="imageList"
        src={`${apiUrl}static/${pokemon.name}.png`}
        alt="pokemon-img"
      />
      <div>
        <span
          style={{ textTransform: "capitalize" }}
          className={classes["pokemon-name"]}
        >
          {pokemon.name}
        </span>
        <span className={classes["pokemon-rarity"]}>{pokemon.rarity}</span>
      </div>
    </React.Fragment>
  );
};

export default PokemonReveal;
