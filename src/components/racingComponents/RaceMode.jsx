import { useContext } from "react";
import { SocketContext } from "../../contexts/SocketContext";

const horseIcons = ['🐴', '🦓', '🦄'];

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
            const posPercent = horse.position/raceInfo.race.raceLength
            return (
              <div
                key={idx}
                style={{
                  right: `${80 - (posPercent*100) * 0.75}%`,
                  top: `${20 * idx + 12}%`,
                }}
                className="horseInRace"
              >
                {raceInfo?.race.horses[idx].icons.map((ic, i) => {
                  if (horseIcons.includes(ic)) {
                    return ( 
                      <span key={i} className='flip'>
                        {ic}
                      </span>
                    )
                  } else {
                    return ( <>{ic}</> )
                  }
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default RaceMode;
