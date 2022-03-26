import "./App.css";
import React, { useState } from "react";
import classes from "./App.module.css";
import Pokeball from "./components/Pokeball";
import { v4 as uuidv4 } from "uuid";

function App() {
  // const apiUrl = process.env.REACT_APP_HEROKU_PROJECT_URL;
  const apiUrl = process.env.REACT_APP_LOCAL_PROJECT_URL;
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

  return (
    <div className={classes.wrapper}>
      <Pokeball onClick={catchButtonHandler} summoningState={summoningState} />
      <ul>
        {allPokemons.length > 0 &&
          allPokemons.map((pokemon) => (
            <li key={uuidv4()}>
              <img
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
                <span className={classes["pokemon-rarity"]}>
                  {pokemon.rarity}
                </span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
