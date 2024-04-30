import { useEffect } from 'react'

const ResultsMode = ({gameState}) => {
  useEffect(() => {
    console.log(gameState)
  }, [gameState])
  return (
    <div>ResultsMode</div>
  )
}

export default ResultsMode