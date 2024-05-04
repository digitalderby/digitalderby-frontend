import React from "react";
import StatSquares from "./StatSquares";
import "./horseStats.css"
const HorseStats = ({ horse }) => {
    

  return (
    <>
      <div className="horseStats row ml-1">
        <div className="col-4">
          Top Speed <span>{horse.stats.topSpeed}</span>
        </div>
        <div className="col-4">
          Stamina <span>{horse.stats.stamina}</span>
        </div>
        <div className="col-4">
          Acceleration <span>{horse.stats.acceleration}</span>
        </div>
      </div>
      <div className="row">
        <StatSquares stat={horse.stats.topSpeed}/>
        <StatSquares stat={horse.stats.stamina}/>
        <StatSquares stat={horse.stats.acceleration}/>
      </div>
    </>
  );
};

export default HorseStats;
