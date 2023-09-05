import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { TimerContext } from "../context/TimerContext";

const TimerSeter = ({ mode }) => {
  const {
    currentStatus,
    breakLength,
    sessionLength,
    handleBreak,
    handleSession
  } = useContext(TimerContext);

  const title = `${mode === "s" ? "Session" : "Break"} Length`;
  const value = `${mode === "s" ? sessionLength[0] : breakLength[0]}`;

  const handleInc = () => {
    if (currentStatus !== "play") {
      if (mode === "s" && sessionLength[0] <= 59) {
        handleSession(sessionLength[0] + 1);
      } else if (mode === "b" && breakLength[0] <= 59) {
        handleBreak(breakLength[0] + 1);
      }
    }
  };

  const handleDec = () => {
    if (currentStatus !== "play") {
      if (mode === "s" && sessionLength[0] > 1) {
        handleSession(sessionLength[0] - 1);
      } else if (mode === "b" && breakLength[0] > 1) {
        handleBreak(breakLength[0] - 1);
      }
    }
  };

  return (
    <div className="title">
      <div>{title}</div>
      <div className="timer-seter">
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowDown}
          onClick={handleDec}
        />
        {value}
        <FontAwesomeIcon
          className="arrow"
          icon={faArrowUp}
          onClick={handleInc}
        />
      </div>
    </div>
  );
};

export default TimerSeter;
