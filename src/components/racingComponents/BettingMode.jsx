import React, { useEffect } from 'react'

const BettingMode = ({gameState}) => {
  
  useEffect(() => {
    console.log(gameState)
  }, [gameState])
  return (
    <div>BettingMode</div>
  )
}

export default BettingMode