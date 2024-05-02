import { useEffect } from 'react'

const RaceMode = ({gameState}) => {
  // useEffect(() => {
  //   console.log(gameState)
  // }, [gameState])
  let prettifiedGameState = gameState

  return (
    <>
<<<<<<< HEAD
      <div className='h-full flex justify-center items-center'>
        <div className="" id='raceBackground'>
          <div>
            {
              gameState?.raceStates?.horseStates?.map((horse, idx) => {
                //horseStates[idx]
                return <div key={idx} style={{
                  left: `${(horse.position /100) + 5}%`,
                  top: `${(25 * idx) + 5}%`
                }}
                className='horseInRace'
                >{horse.horse.spec.icons[0]}</div>
              })
            }
=======
      <h2>RaceMode</h2>
      <div className='h-full w-full flex justify-center items-center'>
        <div id='raceScrollContainer'>
          <div 
            id='raceBackground'
            style={
              gameState?.raceStates?.time > 0 
              && !gameState?.raceStates?.horseStates.some(el => el.finishTime)
              ? {animation:"slide 30s linear infinite"} 
              : null}
            >
>>>>>>> 7822bbd0e69a69d2e7c24d682a3f8184c2bd5620
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