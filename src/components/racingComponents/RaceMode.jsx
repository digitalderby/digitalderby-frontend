import { useEffect } from 'react'

const RaceMode = ({gameState}) => {
  useEffect(() => {
    console.log(gameState)
  }, [gameState])
  return (
    <div>RaceMode</div>
  )
}

export default RaceMode