import { Button, Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import styles from './racingComponents.module.css'
import { SocketContext } from "../../contexts/SocketContext";

const RaceMode = () => {
  const [show, setShow] = useState(false);

  const {
    gameState,
    raceInfo
} = useContext(SocketContext)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return (
    <>
      <h2>RaceMode</h2>
      <div className="h-full w-full flex justify-center items-center">
        <div id="raceScrollContainer">
          <div
            id="raceBackground"
            style={
              gameState?.raceState?.time > 0 &&
              !gameState?.raceState?.horseState.some((el) => el.finishTime)
                ? { animation: "slide 30s linear infinite" }
                : null
            }
          ></div>
          {gameState?.raceState?.horseStates?.map((horse, idx) => {
            return (
              <div
                key={idx}
                style={{
                  left: `${(horse.position / 100 + 5) * 0.9}%`,
                  top: `${20 * idx + 12}%`,
                }}
                className="horseInRace"
              >
                {raceInfo?.race.horses[idx].horseIcons[idx]}
              </div>
            );
          })}
        </div>
      </div>

    </>
  );
};

export default RaceMode;
