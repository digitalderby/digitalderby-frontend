import React, { useEffect } from 'react'

const RaceMode = ({gameState}) => {
  // useEffect(() => {
    // console.log(gameState)
  // }, [gameState]) 
  // let racingTime = gameState.raceStates?.time
  return (
    <>
      <div>RaceMode</div>
      <div className='h-full flex justify-center items-center'>
        <div id='raceScrollContainer'>
          <div 
            id='raceBackground'
            style={
              gameState?.raceStates?.time > 0 
              && !gameState?.raceStates?.horseStates.some(el => el.finishTime)
              ? {animation:"slide 30s linear infinite"} 
              : null}
            >
          </div>
              {
                gameState?.raceStates?.horseStates?.map((horse, idx) => {
                  return <div key={idx} style={{
                    left: `${((horse.position /100) + 5)*.9}%`,
                    top: `${(20 * idx) + 12}%`
                  }}
                  className='horseInRace'
                  >{horse.horse.spec.icons[0]}</div>
                })
              }
        </div>
      </div>
    </>
  )
}

export default RaceMode