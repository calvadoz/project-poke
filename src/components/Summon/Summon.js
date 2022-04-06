import React, { useState, useEffect, useCallback } from "react";
import classes from "./Summon.module.css";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import PokeballCatch from "../PokeballCatch/PokeballCatch";
import PokemonList from "../PokemonList/PokemonList";
import AsyncImage from "../AsyncImage/AsyncImage";
import { fadeInAnimations } from "./../Animations/fadeIn";

function Summon() {
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;
  const [allPokemons, setAllPokemons] = useState([]);
  const [summoningState, setSummoningState] = useState("preparing");
  const [sparks, setSparks] = useState("");
  const [enableButtonClick, setEnableButtonClick] = useState(true);

  const catchButtonHandler = async () => {
    setSummoningState("summoning");
    const catchPokemonReq = await fetch(`${apiUrl}api/catchem-all-multi`);
    const result = await catchPokemonReq.json();
    setSummoningState("done");
    setOverlay(result);
    setTimeout(() => {
      setAllPokemons(result);
      setSummoningState("clear");
      setEnableButtonClick(true);
    }, 4000);
  };

  const setOverlay = (result) => {
    if (result.filter((r) => r.rarity === "SP").length > 0) {
      setSparks("hasSP");
    } else if (result.filter((r) => r.rarity === "UR").length > 0) {
      setSparks("hasUR");
    } else if (result.filter((r) => r.rarity === "SSR").length > 0) {
      setSparks("hasSSR");
    } else if (result.filter((r) => r.rarity === "SR").length > 0) {
      setSparks("hasSR");
    } else {
      setSparks("");
    }
  };

  const onOpenAllHandler = () => {
    setAllPokemons((prevState) => {
      const showPokemons = [...prevState];
      showPokemons.forEach((p) => (p.isShow = true));
      return showPokemons;
    });
  };

  const onOpenSingleHandler = (index) => {
    setAllPokemons((prevState) => {
      const showPokemons = [...prevState];
      showPokemons[index].isShow = true;
      return showPokemons;
    });
  };

  const onViewPokemonDetailsHandler = (pokemonName) => {
    console.log("Selected Pokemon Name: ", pokemonName);
  };

  const onBeforeClickHandler = () => {
    setAllPokemons([]);
    setSummoningState("preparing");
    setEnableButtonClick(false);
  };

  return (
    <motion.div
      variants={fadeInAnimations}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`${classes.wrapper} ${
        summoningState === "clear" ? classes.clear : classes.preparing
      }`}
    >
      <PokeballCatch
        onClick={catchButtonHandler}
        onOpenAll={onOpenAllHandler}
        onBeforeClick={onBeforeClickHandler}
        summoningState={summoningState}
        pokemons={allPokemons}
        sparks={sparks}
        flag={enableButtonClick}
      />

      {allPokemons.length > 0 && (
        <ul>
          {allPokemons.length > 0 &&
            allPokemons.map((pokemon, index) => (
              <PokemonList
                key={uuidv4()}
                pokemon={pokemon}
                index={index}
                onOpenSingle={onOpenSingleHandler}
                onViewPokemonDetails={onViewPokemonDetailsHandler}
              />
            ))}
        </ul>
      )}
    </motion.div>
  );
}

export default Summon;
