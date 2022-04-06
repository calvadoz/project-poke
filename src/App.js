import React, { useState, useEffect, useCallback, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Summon from "./components/Summon/Summon";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import axios from "axios";
import ResourceLoader from "./components/ResourceLoader/ResourceLoader";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInAnimations } from "./components/Animations/fadeIn";
import Logo from "./components/Logo/Logo";

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

const banners = ["GEN1-banner", "GEN2-banner", "GEN3-banner", "ALLGEN-banner"];

function App() {
  const location = useLocation();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const [serverVersion, setServerVersion] = useState("");
  const [isLoadingResource, setIsLoadingResource] = useState(true);
  const [progress, setProgress] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    banners.forEach((banner) => {
      allResources.unshift({ name: banner, id: banner });
    });

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

  const loginHandler = () => {
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStartGame(true);
    }, 3000);
  };
  const signUpHandler = () => {
    const usernameInput = usernameRef.current.value;
    const passwordInput = passwordRef.current.value;
    const confirmPasswordInput = confirmPasswordRef.current.value;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (isNewUser) signUpHandler();
    else loginHandler();
  };

  useEffect(() => {
    getServerVersion();
    setTimeout(() => fetchAllResources(), 2000);
  }, [getServerVersion, fetchAllResources]);

  return (
    <React.Fragment>
      {isLoadingResource && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1, delay: 0.2 } }}
          exit={{ opacity: 0, x: "-100vw", transition: { duration: 2 } }}
        >
          <ResourceLoader progress={progress} />
        </motion.div>
      )}
      {!isLoadingResource && !startGame && (
        <motion.div
          variants={fadeInAnimations}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="start-game-wrapper"
        >
          <form onSubmit={formSubmitHandler}>
            {!isNewUser && (
              <motion.div
                initial={{ opacity: 0, rotateY: -180 }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                exit={{ opacity: 0 }}
                className="login-signup-wrapper"
              >
                <motion.div
                  variants={fadeInAnimations}
                  initial="hidden"
                  animate="visible"
                >
                  {<Logo />}
                  <motion.input
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
                  />
                  <motion.input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                  <motion.button
                    disabled={isLoading}
                    type="submit"
                    className="login-button"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    className="button-link"
                    onClick={() => setIsNewUser(true)}
                  >
                    No account yet? Register now
                  </motion.button>
                </motion.div>
              </motion.div>
            )}

            {isNewUser && (
              <motion.div
                initial={{ opacity: 0, rotateY: 180 }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  transition: { duration: 0.5, ease: "easeInOut" },
                }}
                exit={{ opacity: 0 }}
                className="login-signup-wrapper"
              >
                <motion.div
                  variants={fadeInAnimations}
                  initial="hidden"
                  animate="visible"
                >
                  <Logo />
                  <input
                    ref={usernameRef}
                    type="text"
                    placeholder="Username"
                  />
                  <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                  />
                  <input
                    ref={confirmPasswordRef}
                    type="password"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="submit"
                    className="sign-up-button"
                    disabled={isLoading}
                  >
                    Sign Up
                  </button>
                  <button
                    className="button-link"
                    onClick={() => setIsNewUser(false)}
                  >
                    ← Back to Login
                  </button>
                </motion.div>
              </motion.div>
            )}
          </form>
        </motion.div>
      )}
      {!isLoadingResource && startGame && (
        <>
          <Header />
          <div className="main-wrapper">
            <Routes location={location} key={location.key}>
              <Route path="/summon" element={<Summon />} />
              <Route path="/" element={<Home banners={banners} />} />
              <Route path="*" element={<Home banners={banners} />} />
            </Routes>
          </div>
          <Footer serverVersion={serverVersion} />
        </>
      )}
    </React.Fragment>
  );
}

export default App;
