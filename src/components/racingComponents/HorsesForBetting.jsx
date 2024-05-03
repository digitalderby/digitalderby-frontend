import React from 'react'
import styles from "./racingComponents.module.css";
import { useState } from "react";

const HorsesForBetting = ({horse, index, placeBet}) => {
    const [betValue, setBetValue] = useState(0);

    return (
      <li className={styles.betListItem} key={index}>
        <span className={styles.horseDetails}>
          {horse.name} - Top Speed: {horse.topSpeed}, Stamina:{" "}
          {horse.stamina}, Acceleration: {horse.acceleration}
        </span>
        <input
          type="number"
          className={styles.betInput}
          placeholder="Bet amount"
          value={betValue}
          onChange={(e) => setBetValue(e.target.value)}
        />
        <button className={styles.betButton} onClick={() => placeBet(betValue, index)}>
          Bet
        </button>
      </li>
    );
}

export default HorsesForBetting
