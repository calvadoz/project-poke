import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Summon from "./components/Summon/Summon";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import axios from "axios";
import ResourceLoader from "./components/ResourceLoader/ResourceLoader";
import { motion, AnimatePresence } from "framer-motion";

const apiUrl =
  process.env.REACT_APP_ENVIRONMENT === "production"
    ? process.env.REACT_APP_HEROKU_PROJECT_URL
    : process.env.REACT_APP_LOCAL_PROJECT_URL;

const pokeballs = [
  "pokeball",
  "greatball",
  "ultraball",
  "masterball",
  "premierball",
];

function App() {
  const [serverVersion, setServerVersion] = useState("");
  const [isLoadingResource, setIsLoadingResource] = useState(true);
  const [progress, setProgress] = useState(0);
  const [startGame, setStartGame] = useState(false);

  const getServerVersion = useCallback(async () => {
    const serverVersionReq = await axios.get(`${apiUrl}api/get-version`);
    let sVersion = serverVersionReq.data;

    sVersion =
      sVersion === "development"
        ? sVersion
        : process.env.REACT_APP_SERVER_VERSION.replace(
            "x",
            sVersion.replace("v", "")
          );
    setServerVersion(sVersion);
  }, []);

  const fetchAllResources = useCallback(async () => {
    const allResourcesReq = await axios.get(`${apiUrl}static/data.json`);
    const allResources = allResourcesReq.data;
    pokeballs.forEach((pokeball) =>
      allResources.unshift({ name: pokeball, id: pokeball })
    );

    allResources.forEach(async (resource, index) => {
      const url = `${apiUrl}static/${resource.name}.png`;
      await axios.get(url);
      resource.isDoneLoading = true;
      const totalDone = allResources.filter(
        (resource) => resource.isDoneLoading === true
      );
      const percentage = (totalDone.length / allResources.length) * 100;
      setProgress(percentage);
      if (percentage >= 100) {
        setIsLoadingResource(percentage >= 100 ? false : true);
      }
    });
  }, []);

  useEffect(() => {
    getServerVersion();
    setTimeout(() => fetchAllResources(), 2000);
  }, [getServerVersion, fetchAllResources]);

  return (
    <React.Fragment>
      <AnimatePresence exitBeforeEnter>
        {isLoadingResource && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
            exit={{ opacity: 0, x: "-100vw", transition: { duration: 2 } }}
          >
            <ResourceLoader progress={progress} />
          </motion.div>
        )}
      </AnimatePresence>
      {!isLoadingResource && !startGame && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            scale: 1.5,
            transition: { duration: 2, delay: 0.5 },
          }}
          className="start-game-wrapper"
        >
          <button onClick={() => setStartGame(!startGame)}>Start Game</button>
        </motion.div>
      )}
      {!isLoadingResource && startGame && (
        <>
          <Header />
          <div className="main-wrapper">
            <Routes>
              <Route path="/summon" element={<Summon />} />
              <Route path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer serverVersion={serverVersion} />
        </>
      )}
    </React.Fragment>
  );
}

export default App;
