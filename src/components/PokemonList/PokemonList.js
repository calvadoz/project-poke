import React from "react";
import { v4 as uuidv4 } from "uuid";
import PokemonReveal from "./../PokemonReveal/PokemonReveal";
import classes from "./PokemonList.module.css";
import { motion } from "framer-motion";
import Pokeball from "./../Pokeball/Pokeball";

const PokemonList = (props) => {
  const { pokemon, onOpenSingle, index, onViewPokemonDetails } = props;

  return (
    <React.Fragment>
      {pokemon.isShow && (
        <motion.li
          whileHover={{ scale: 1.1 }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.9,
            transition: { duration: 1.5, delay: index * 0.15 },
          }}
          key={uuidv4()}
        >
          {pokemon.isShow && (
            <PokemonReveal
              pokemon={pokemon}
              onViewPokemonDetails={onViewPokemonDetails}
            />
          )}
        </motion.li>
      )}
      {!pokemon.isShow && (
        <motion.li
          key={uuidv4()}
          initial={{ opacity: 0, translateX: -50, translateY: -50 }}
          animate={{ opacity: 1, translateX: 0, translateY: 0 }}
          transition={{ duration: 1.5, delay: index * 0.15 }}
        >
          <Pokeball
            onOpenSingle={onOpenSingle}
            rarity={pokemon.rarity}
            index={index}
          />
        </motion.li>
      )}
    </React.Fragment>
  );
};

export default PokemonList;
