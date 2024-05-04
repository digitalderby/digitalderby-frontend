import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";

const RaceMode = () => {
  const { gameState, raceInfo } = useContext(SocketContext);

  // console.log(gameState);

  return (
    <>
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
            // console.log(gameState);
            return (
              <div
                key={idx}
                style={{
                  left: `${(horse.position / 100 + 5) * 0.9}%`,
                  top: `${20 * idx + 12}%`,
                }}
                className="horseInRace"
              >
                {raceInfo?.race.horses[idx].icons[0]}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RaceMode;
