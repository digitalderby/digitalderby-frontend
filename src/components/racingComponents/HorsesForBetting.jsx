import React from 'react'
import styles from "./racingComponents.module.css";

const HorsesForBetting = ({betValue, setBetValues, horse, index, placeBet}) => {
    return (
      <li className={styles.betListItem} key={index}>
        <span className={styles.horseDetails}>
          {horse.name} - Top Speed: {horse.stats.topSpeed}, Stamina:{" "}
          {horse.stats.stamina}, Acceleration: {horse.stats.acceleration}
        </span>
        <input
          type="number"
          className={styles.betInput}
          placeholder="Bet amount"
          value={betValue}
          onChange={(e) => setBetValues((prev) => {
            let next = [...prev]
            next.splice(index, 1, e.target.value)
            return next
          })}
        />
        <button className={styles.betButton} onClick={() => placeBet(betValue, index)}>
          Bet
        </button>
      </li>
    );
}

export default HorsesForBetting
