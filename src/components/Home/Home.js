import React, { useState, useEffect, useCallback } from "react";
import classes from "./Home.module.css";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import PokeballCatch from "../PokeballCatch";
import PokemonList from "../PokemonList";

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = useState(null);
  useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);
  if (loadedSrc === props.src) {
    return <img {...props} alt="prefetch-img" />;
  }
  return null;
};

function Home() {
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;
  const [fetchedPokemons, setFetchedPokemons] = useState([]);
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
    if (result.filter((r) => r.rarity === "UR").length > 0) {
      setSparks("hasUR");
    } else if (result.filter((r) => r.rarity === "SSR").length > 0) {
      setSparks("hasSSR");
    } else if (result.filter((r) => r.rarity === "SR").length > 0) {
      setSparks("hasSR");
    } else {
      setSparks(null);
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
    setEnableButtonClick(false);
  };

  return (
    <div className={classes.wrapper}>
      <div style={{ display: "none" }}>
        <AsyncImage src={`${apiUrl}static/pokeball.png`} width="0" height="0" />
        <AsyncImage
          src={`${apiUrl}static/greatball.png`}
          width="0"
          height="0"
        />
        <AsyncImage
          src={`${apiUrl}static/ultraball.png`}
          width="0"
          height="0"
        />
        <AsyncImage
          src={`${apiUrl}static/masterball.png`}
          width="0"
          height="0"
        />
      </div>
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
        <motion.ul initial="hidden" animate="visible">
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
        </motion.ul>
      )}
    </div>
  );
}

export default Home;
