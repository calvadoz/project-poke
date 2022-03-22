require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const PORT = process.env.SERVER_PORT || 2000;
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

const dummy_data = [
  {
    id: 1,
    name: "bulbasaur",
    img: "http://localhost:8000/static/gen-1/bulbasaur.png",
  },
  {
    id: 2,
    name: "ivysaur",
    img: "http://localhost:8000/static/gen-1/ivysaur.png",
  },
];

app.use(express.json());
app.use("/static", express.static("assets"));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
if (process.env.NODE_ENV === "development") {
  console.log("Morgan enabled");
  app.use(morgan("common"));
}

app.get("/", (req, res) => {
  res.send("Nothing here");
});

app.get("/api/healthcheck", (req, res) => {
  res.send("Service is healthy");
});

app.get("/api/all-pokemons", (req, res) => {
  res.send(dummy_data);
});

app.listen(PORT, () => console.log("Server is up and running at port", PORT));
