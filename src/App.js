import React, { useState } from "react";
import classes from "./App.module.css";
import PokeballCatch from "./components/PokeballCatch";
import PokemonList from "./components/PokemonList";
import { v4 as uuidv4 } from "uuid";

function App() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;

  const [allPokemons, setAllPokemons] = useState([]);
  const [summoningState, setSummoningState] = useState("preparing");

  const catchButtonHandler = async () => {
    const catchPokemonReq = await fetch(`${apiUrl}api/catchem-all-multi`);
    const result = await catchPokemonReq.json();
    setSummoningState("done");
    setTimeout(() => {
      setAllPokemons(result);
      setSummoningState("clear");
    }, 1000);
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

  return (
    <div className={classes.wrapper}>
      <PokeballCatch
        onClick={catchButtonHandler}
        onOpenAll={onOpenAllHandler}
        summoningState={summoningState}
        pokemons={allPokemons}
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
