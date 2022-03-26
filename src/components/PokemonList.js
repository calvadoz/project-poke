import React from "react";
import { v4 as uuidv4 } from "uuid";
import Pokeball from "./Pokeball";
import classes from "./PokemonList.module.css";
import PokemonReveal from "./PokemonReveal";

const PokemonList = (props) => {
  const { pokemon, onOpenSingle, index, onViewPokemonDetails } = props;

  return (
    <li key={uuidv4()}>
      {pokemon.isShow && (
        <PokemonReveal
          pokemon={pokemon}
          onViewPokemonDetails={onViewPokemonDetails}
        />
      )}
      {!pokemon.isShow && (
        <Pokeball
          rarity={pokemon.rarity}
          index={index}
          onOpenSingle={onOpenSingle}
        />
      )}
    </li>
  );
};

export default PokemonList;
