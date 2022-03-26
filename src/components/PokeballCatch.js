import classes from "./PokeballCatch.module.css";
import { useState, useEffect } from "react";

const PokeballCatch = (props) => {
  const { summoningState, onOpenAll } = props;
  const [isSummoning, setIsSummoning] = useState(false);
  const [currSummoningState, setCurrSummoningState] = useState("");
  const [buttonClass, setButtonClass] = useState("");
  const [flag, setFlag] = useState(true);
  const summonPokemonHandler = () => {
    setIsSummoning(true);
    setFlag(false); // disable button click
    setTimeout(() => {
      props.onClick();
      setIsSummoning(false);
      setFlag(true);
    }, 2000);
  };

  useEffect(() => {
    setCurrSummoningState(summoningState);
    let classNames = "";
    classNames += isSummoning ? classes.fetching : "";
    setButtonClass(classNames);
  }, [summoningState, isSummoning]);

  return (
    <div>
      <div
        id="whitebox"
        className={currSummoningState === "done" ? classes.whitebox : ""}
      ></div>
      <svg
        viewBox="0 0 100 100"
        width="150"
        height="150"
        onClick={flag ? summonPokemonHandler : null}
        className={buttonClass}
      >
        <g transform="translate(50 50) scale(0.8)">
          <g transform="translate(0 50)">
            <g className={classes.gravity}>
              <g transform="translate(0 -50)">
                <g className={classes.ball} transform="scale(1 1)">
                  <g className={classes.bottom}>
                    <path
                      fill="#ffffff"
                      stroke="#303030"
                      strokeWidth="5"
                      d="M -47.5 0 a 47.5 47.5 0 0 0 95 0z"
                    ></path>
                  </g>
                  <g className={classes.top}>
                    <path
                      fill="#f15d5f"
                      d="M -47.5 0 a 47.5 47.5 0 0 1 95 0"
                    ></path>
                    <path
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray="0 15 9 9 20 100"
                      d="M -38 -0 a 38 38 0 0 1 76 0"
                    ></path>
                    <path
                      fill="none"
                      stroke="#303030"
                      strokeWidth="5"
                      d="M -47.5 0 a 47.5 47.5 0 0 1 95 0z"
                    ></path>
                  </g>
                  <g className={classes.open} transform="scale(1 0)">
                    <path
                      fill="#303030"
                      stroke="#303030"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      d="M -47.5 -10 a 190 190 0 0 1 95 0 a 190 190 0 0 1 -95 0"
                    ></path>
                    <path
                      fill="#303030"
                      stroke="#303030"
                      strokeWidth="5"
                      strokeLinejoin="round"
                      d="M -47.5 5 a 160 160 0 0 0 95 0 a 180 180 0 0 0 -95 0"
                    ></path>
                  </g>
                  <g className={classes.center}>
                    <circle
                      fill="#ffffff"
                      stroke="#303030"
                      strokeWidth="5"
                      cx="0"
                      cy="0"
                      r="12"
                    ></circle>
                    <circle
                      fill="#ffffff"
                      stroke="#303030"
                      strokeWidth="3"
                      cx="0"
                      cy="0"
                      r="6"
                    ></circle>
                    <g className={classes.inner} opacity="0">
                      <circle fill="#f15d5f" cx="0" cy="0" r="4.5"></circle>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
      {summoningState === "clear" && (
        <div className={classes["open-all"]}>
          <button onClick={onOpenAll}>Open All</button>
        </div>
      )}
    </div>
  );
};

export default PokeballCatch;
