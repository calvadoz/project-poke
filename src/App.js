import React, { useState } from "react";
import classes from "./App.module.css";
import PokeballCatch from "./components/PokeballCatch";
import PokemonList from "./components/PokemonList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;
  console.log(process.env.REACT_APP_ENVIRONMENT);

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
    const showAllPokemons = [...allPokemons];
    showAllPokemons.forEach((p) => (p.isShow = true));
    setAllPokemons(showAllPokemons);
  };

  const onOpenSingleHandler = (index) => {
    const showPokemons = [...allPokemons];
    showPokemons[index].isShow = true;
    setAllPokemons(showPokemons);
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
      <PokeballCatch
        onClick={catchButtonHandler}
        onOpenAll={onOpenAllHandler}
        onBeforeClick={onBeforeClickHandler}
        summoningState={summoningState}
        pokemons={allPokemons}
        sparks={sparks}
        flag={enableButtonClick}
      />
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
    </div>
  );
}

export default App;
