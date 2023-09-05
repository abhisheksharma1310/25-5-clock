import TimerController from "./components/TimerController";
import TimerDisplay from "./components/TimerDisplay";
import TimerSeter from "./components/TimerSeter";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <header className="header">25 + 5 Clock</header>
      <div className="timer-container">
        <TimerSeter mode="b" />
        <TimerSeter mode="s" />
      </div>
      <TimerDisplay />
      <TimerController />
      <footer>
        <h4>Designed and coded by</h4>
        <h5>Abhishek Sharma</h5>
      </footer>
    </div>
  );
}
