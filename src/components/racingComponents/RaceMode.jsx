import React, { useEffect } from 'react'

const RaceMode = ({gameState}) => {
  // useEffect(() => {
  //   console.log(gameState)
  // }, [gameState])
  let prettifiedGameState = gameState

  return (
    <>
      <div>RaceMode</div>
      <div className='h-full flex justify-center items-center'>
        <div className="" id='raceBackground'>
          {
            gameState?.raceStates?.horseStates?.map((horse, idx) => {
              //horseStates[idx]
              return <div key={idx} style={{
                transform: `translateX(${horse.position}px)`
              }}>horse</div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default RaceMode