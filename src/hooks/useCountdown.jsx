import { useEffect } from "react";
import { useState } from "react";

const POLLING_FREQUENCY = 10
const PRECISION = 2

export default function useCountdown(time) {
  const [currentTime, setCurrentTime] = useState(0)
  const [finished, setFinished] = useState(false)
  const [endTime, setEndTime] = useState(time)

  useEffect(() => {
    function onTick() {
      const diff = (endTime - Date.now())/1000
      setCurrentTime(Math.max(0, diff).toFixed(PRECISION))
      setFinished(diff <= 0)
    }

    const interval = window.setInterval(onTick, POLLING_FREQUENCY)
    return () => { window.clearInterval(interval) }
  }, [endTime])

  return [{ currentTime, finished }, setEndTime]
}
