import { useEffect } from 'react'

const RaceMode = ({gameState}) => {
  // useEffect(() => {
  //   console.log(gameState)
  // }, [gameState])
  let prettifiedGameState = gameState


  return (
    <>
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
          </div>
        </div>
      </div>
    </>
  )
}

export default RaceMode