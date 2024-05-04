import React, { useState } from "react";
import styles from "./racingComponents.module.css";
import HorseStats from "./HorseStats";

const HorsesForBetting = ({
  betValue,
  setBetValues,
  horse,
  index,
  placeBet,
}) => {

  const [dropdown, setDropdown] = useState(false)
  const toggleDropdown = (e) => {
    e.preventDefault()
    setDropdown(!dropdown)
  }
  return (
    <>
      <li className={styles.betListItem} key={index}>
        <span className={styles.horseDetails}>
          {horse.name}
          {/* Top Speed: {horse.stats.topSpeed}, Stamina:{" "}
            {horse.stats.stamina}, Acceleration: {horse.stats.acceleration} */}
        </span>
        <a
          className="btn dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={toggleDropdown}
        >
          STATS
        </a>
        <input
          type="number"
          className={styles.betInput}
          placeholder="Bet amount"
          value={betValue}
          onChange={(e) =>
            setBetValues((prev) => {
              let next = [...prev];
              next.splice(index, 1, e.target.value);
              return next;
            })
          }
        />
        <button
          className={styles.betButton}
          onClick={() => placeBet(betValue, index)}
        >
          Bet
        </button>
      </li>
      {
        dropdown && <HorseStats horse={horse}/>
      }
      
    </>
  );
};

export default HorsesForBetting;
