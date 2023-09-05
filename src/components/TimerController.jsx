import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faArrowsRotate
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const TimerController = () => {
  const { handleStatus } = useContext(TimerContext);

  const handleStart = () => {
    handleStatus("play");
  };

  const handleStop = () => {
    handleStatus("pause");
  };

  const handleReset = () => {
    handleStatus("ideal");
  };

  return (
    <div className="timer-controller">
      <FontAwesomeIcon
        className="timer-ct-btn"
        icon={faPlay}
        onClick={handleStart}
      />
      <FontAwesomeIcon
        className="timer-ct-btn"
        icon={faPause}
        onClick={handleStop}
      />
      <FontAwesomeIcon
        className="timer-ct-btn"
        icon={faArrowsRotate}
        onClick={handleReset}
      />
    </div>
  );
};

export default TimerController;
