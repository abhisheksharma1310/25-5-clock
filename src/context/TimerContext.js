const { createContext, useReducer, useEffect, useRef } = require("react");

const reducer = (state, action) => {
  switch (action.type) {
    case "setBreak":
      return { ...state, breakLength: action.payload };
    case "setSession":
      return { ...state, sessionLength: action.payload };
    case "setCurrentMode":
      return { ...state, currentMode: action.payload };
    case "setCurrentTime":
      return { ...state, currentTime: action.payload };
    case "setCurrentStatus":
      return { ...state, currentStatus: action.payload };
    default:
      return state;
  }
};

export const TimerContext = createContext(null);

const TimerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    breakLength: [5, 0],
    sessionLength: [25, 0],
    currentMode: "s",
    currentTime: [0, 0],
    currentStatus: "ideal"
  });

  const audioRef = useRef(null);

  const {
    currentTime,
    currentStatus,
    currentMode,
    breakLength,
    sessionLength
  } = state;

  const handleBreak = (value) => {
    dispatch({ type: "setBreak", payload: [value, 0] });
  };
  const handleSession = (value) => {
    dispatch({ type: "setSession", payload: [value, 0] });
  };
  const handleMode = (value) => {
    dispatch({ type: "setCurrentMode", payload: value });
  };
  const handleTime = (value) => {
    dispatch({ type: "setCurrentTime", payload: value });
  };
  const handleStatus = (value) => {
    if (value === "play" && currentTime[0] === 0 && currentTime[1] === 0) {
      setNewTime();
    } else if (value === "ideal") {
      dispatch({
        type: "setCurrentTime",
        payload: [0, 0]
      });
    }
    dispatch({ type: "setCurrentStatus", payload: value });
  };

  const setNewTime = () => {
    const [mm, ss] = currentMode === "s" ? sessionLength : breakLength;
    dispatch({
      type: "setCurrentTime",
      payload: [mm - 1, 59]
    });
  };

  useEffect(() => {
    let timer;

    if (currentStatus === "play") {
      timer = setInterval(() => {
        const [mm, ss] = currentTime;
        if (mm === 0 && ss === 0) {
          // Timer reached 00:00, handle status change or reset
          audioRef.current.play();
          if (currentMode === "s") {
            handleTime([breakLength[0], 0]); // Reset timer to breakLength
            handleMode("b"); // Switch to break mode
          } else {
            handleTime([sessionLength[0], 0]); // Reset timer to sessionLength
            handleMode("s"); // Switch to session mode
          }
        } else if (ss === 0) {
          // Decrease minutes and set seconds to 59
          handleTime([mm - 1, 59]);
        } else {
          // Decrease seconds
          handleTime([mm, ss - 1]);
        }
      }, 1000);
    }

    if (currentStatus === "pause" || currentStatus === "ideal") {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [currentStatus, currentTime]);

  audioRef.current = new Audio(
    "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  );

  return (
    <TimerContext.Provider
      value={{
        ...state,
        handleBreak,
        handleSession,
        handleMode,
        handleTime,
        handleStatus
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
