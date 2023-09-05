import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import TimerProvider from "./context/TimerContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <TimerProvider>
      <App />
    </TimerProvider>
  </StrictMode>
);
