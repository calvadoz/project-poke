import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Summon from "./components/Summon/Summon";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

function App() {
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
      <Footer />
    </React.Fragment>
  );
}

export default App;
