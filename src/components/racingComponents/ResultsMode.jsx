import { useEffect } from 'react';
import styles from './racingComponents.module.css';

const ResultsMode = ({ gameState }) => {
  useEffect(() => {
    console.log('Current gameState in ResultsMode:', gameState);
  }, [gameState]);

  if (!gameState || !gameState.raceStates || !gameState.raceStates.horseStates) {
    return <div>Loading results...</div>;
  }

  // Extract horse states and rankings
  const { horseStates, rankings } = gameState.raceStates;

  // Sort horses based on rankings to display in order
  const sortedHorses = rankings.map(index => horseStates[index]);

  // Identify the winner (first in the rankings array)
  const winner = sortedHorses[0];

  return (
    <div className="results-container">
      <h1>Race Results</h1>
      {winner ? (
        <div className="winner">
          <h2>Winner: {winner.horse.name}</h2>
          <p>Details:</p>
          <ul>
            <li>Finish Time: {winner.finishTime}ms</li>
            <li>Current Speed: {winner.currentSpeed}</li>
          </ul>
        </div>
      ) : (
        <p>No results available.</p>
      )}
      <h3>All Participants:</h3>
      <ol>
        {sortedHorses.map((horse, index) => (
          <li key={index}>
            {horse.horse.name} - Finished with a time of {horse.finishTime}ms, Final speed: {horse.currentSpeed}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ResultsMode;
