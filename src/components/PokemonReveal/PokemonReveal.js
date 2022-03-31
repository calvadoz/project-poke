import React from "react";
import PokeImage from "../PokeImage/PokeImage";

const PokemonReveal = (props) => {
  const { pokemon, onViewPokemonDetails } = props;
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;

  const onViewPokemonDetailsHandler = () => {
    onViewPokemonDetails(pokemon.name);
  };

  return (
    <React.Fragment>
      <PokeImage
        onClick={onViewPokemonDetailsHandler}
        classes="imageList"
        imageUrl={`${apiUrl}static/${pokemon.name}.png`}
        alt="PokemonImage"
      />
      <div>
        <span
          style={{ textTransform: "capitalize" }}
          className={`pokemon-name pokemon-rarity-${pokemon.rarity.toLowerCase()}`}
        >
          {pokemon.name}
        </span>
        {/* <span
          className={`pokemon-rarity pokemon-rarity-${pokemon.rarity.toLowerCase()}`}
        >
          {pokemon.rarity}
        </span> */}
      </div>
    </React.Fragment>
  );
};

export default PokemonReveal;
