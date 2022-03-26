import React from "react";
import MasterBall from "../assets/img/masterball.png";
import UltraBall from "../assets/img/ultraball.png";
import GreatBall from "../assets/img/greatball.png";
import PokeBall from "../assets/img/pokeball.png";
import classes from "./Pokeball.module.css";

const Pokeball = (props) => {
  const { rarity, onOpenSingle, index } = props;

  const onOpenSingleHandler = () => {
    onOpenSingle(index);
  };

  return (
    <React.Fragment>
      {rarity === "UR" && (
        <div className={classes["pokeball-wrapper-UR"]}>
          <img
            onClick={onOpenSingleHandler}
            className="imageList"
            src={MasterBall}
            alt="Masterball"
          />
        </div>
      )}
      {rarity === "SSR" && (
        <div className={classes["pokeball-wrapper-SSR"]}>
          <img
            onClick={onOpenSingleHandler}
            className="imageList"
            src={UltraBall}
            alt="UltraBall"
          />
        </div>
      )}
      {rarity === "SR" && (
        <div className={classes["pokeball-wrapper-SR"]}>
          <img
            onClick={onOpenSingleHandler}
            className="imageList"
            src={GreatBall}
            alt="GreatBall"
          />
        </div>
      )}
      {rarity === "R" && (
        <div className={classes["pokeball-wrapper-R"]}>
          <img
            onClick={onOpenSingleHandler}
            className="imageList"
            src={PokeBall}
            alt="PokeBall"
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Pokeball;
