import React from "react";
import classes from "./PokemonReveal.module.css";

const PokemonReveal = (props) => {
  const { pokemon, onViewPokemonDetails } = props;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;

  const onViewPokemonDetailsHandler = () => {
    onViewPokemonDetails(pokemon.name);
  };

  return (
    <React.Fragment>
      <img
        onClick={onViewPokemonDetailsHandler}
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
        <span
          className={`pokemon-rarity pokemon-rarity-${pokemon.rarity.toLowerCase()}`}
        >
          {pokemon.rarity}
        </span>
      </div>
    </React.Fragment>
  );
};

export default PokemonReveal;
