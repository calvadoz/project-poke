import "./App.css";
import React, { useEffect, useState } from "react";
import classes from "./App.module.css";
import Pokeball from "./components/Pokeball";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [summoningState, setSummoningState] = useState("preparing");

  const catchButtonHandler = async () => {
    const catchPokemonReq = await fetch(
      "http://localhost:8000/api/catchem-all-10"
    );
    const result = await catchPokemonReq.json();
    setSummoningState("done");
    setTimeout(() => {
      setAllPokemons(result);
      setSummoningState("clear");
    }, 1000);
  };

  return (
    <div className={classes.wrapper}>
      <Pokeball onClick={catchButtonHandler} summoningState={summoningState} />
      <ul>
        {allPokemons.length > 0 &&
          allPokemons.map((pokemon) => (
            <li key={pokemon.id}>
              <img
                src={`http://localhost:8000/static/gen-1/${pokemon.name}.png`}
                alt="pokemon-img"
              />
              <span className={classes["pokemon-name"]}>{pokemon.name}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
