import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const TimerDisplay = () => {
  const {
    currentTime,
    currentMode,
    currentStatus,
    sessionLength,
    breakLength
  } = useContext(TimerContext);

  const mode = `${currentMode === "s" ? "Session" : "Break"}`;

  const checkTime = () => {
    if (currentStatus !== "ideal") {
      return currentTime;
    } else {
      return currentMode === "s" ? sessionLength : breakLength;
    }
  };

  const ss = checkTime()[1];
  const mm = checkTime()[0];

  const classes =
    currentStatus === "play" ? "timer-display play" : "timer-display";

  return (
    <div className={classes}>
      <p>{mode}</p>
      <div className="timer-time">
        {mm}
        <span> : </span>
        {ss}
      </div>
    </div>
  );
};

export default TimerDisplay;
