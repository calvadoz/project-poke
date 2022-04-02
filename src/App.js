import React, { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Summon from "./components/Summon/Summon";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import axios from "axios";

function App() {
  const [serverVersion, setServerVersion] = useState("");

  const apiUrl =
    process.env.REACT_APP_ENVIRONMENT === "production"
      ? process.env.REACT_APP_HEROKU_PROJECT_URL
      : process.env.REACT_APP_LOCAL_PROJECT_URL;
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
  }, [apiUrl]);

  useEffect(() => {
    getServerVersion();
  }, [getServerVersion]);

  return (
    <React.Fragment>
      <Header />
      <div className="main-wrapper">
        <Routes>
          <Route path="/summon" element={<Summon />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <Footer serverVersion={serverVersion} />
    </React.Fragment>
  );
}

export default App;
