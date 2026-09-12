import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Automatically reload if a new deployment changed asset chunk hashes
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});

window.addEventListener("error", (e) => {
  if (
    e.message &&
    (e.message.includes("dynamically imported module") ||
      e.message.includes("Failed to fetch dynamically imported module") ||
      e.message.includes("Failed to load resource"))
  ) {
    const hasRetried = sessionStorage.getItem("chunk_reload_retry");
    if (!hasRetried) {
      sessionStorage.setItem("chunk_reload_retry", "true");
      window.location.reload();
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
