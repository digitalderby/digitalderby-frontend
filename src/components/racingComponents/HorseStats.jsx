import React from "react";
import StatSquares from "./StatSquares";
import "./horseStats.css"
const HorseStats = ({ horse }) => {
    

  return (
    <div className="m-3">
      <div className="horseStats row m-1">
        <div className="col-4">
          Top Speed
        </div>
        <div className="col-4">
          Stamina
        </div>
        <div className="col-4">
          Acceleration
        </div>
      </div>
      <div className="row">
        <StatSquares stat={horse.stats.topSpeed}/>
        <StatSquares stat={horse.stats.stamina}/>
        <StatSquares stat={horse.stats.acceleration}/>
      </div>
    </div>
  );
};

export default HorseStats;
