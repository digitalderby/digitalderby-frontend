import React, { useEffect } from 'react'

const BettingMode = ({gameState}) => {
  
  // useEffect(() => {
  //   console.log(gameState)
  // }, [gameState])
  let prettifiedGameState = gameState

  return (
    <div className="results-container">
      <h1>Race Results</h1>
      {winner ? (
        <div className="winner">
          <h2>Winner: {winner.name}</h2>
          <p>Details:</p>
          <ul>
            <li>Speed: {winner.speed}</li>
            <li>Time: {winner.time}s</li>
          </ul>
        </div>
      ) : (
        <p>No results available.</p>
      )}
      <h3>All Participants:</h3>
      <ol>
        {horses.map((horse, index) => (
          <li key={index}>
            {horse.name} - Finished with a time of {horse.time}s
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ResultsMode;
