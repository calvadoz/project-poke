import "./App.css";
import React, { useState } from "react";

function App() {
  const [allPokemons, setAllPokemons] = useState([]);

  const healthCheckHandler = async () => {
    const healthCheckReq = await fetch(
      "http://localhost:8000/api/all-pokemons"
    );
    const allPokemons = await healthCheckReq.json();
    console.log(allPokemons);
  };

  healthCheckHandler();

  return (
    <img
      src="http://localhost:8000/static/gen-1/alakazam.png"
      alt="pokemon-img"
      width={400}
      height={400}
    />
  );
}

export default App;
