import React from "react";
import classes from "./SummonOverlay.module.css";

const SummonOverlay = (props) => {
  const { sparks } = props;
  const PARTICLE_NUMBERS = 200;
  const particles = [...Array(PARTICLE_NUMBERS)];
  let overlayClass = "";
  switch (sparks) {
    case "hasUR":
      overlayClass = classes["color-ur"];
      break;
    case "hasSSR":
      overlayClass = classes["color-ssr"];
      break;
    case "hasSR":
      overlayClass = classes["color-sr"];
      break;
    default:
      overlayClass = classes["zonk"];
      break;
  }

  return (
    <React.Fragment>
      {/* <video autoPlay muted loop id="myVideo">
        <source src="http://localhost:4000/static/UR.mp4" type="video/mp4" />
      </video> */}
      <div className={`${classes["ag-fireflies_box"]}`}>
        {particles.map((p, index) => (
          <div key={index} className={classes["ag-fireflies_item"]}>
            <div
              className={`${classes["ag-fireflies_inner"]} ${overlayClass}`}
            ></div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default SummonOverlay;
