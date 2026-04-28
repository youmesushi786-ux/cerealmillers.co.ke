import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

/**
 * Global Styles
 * Includes Tailwind directives and premium animations.
 */
import "./index.css";

/**
 * The Master Application logic.
 * Using the @ alias ensures clean path mapping for SEO and maintenance.
 */
import App from "@/App";

// --- GLOBAL ROOT INITIALIZATION ---
const container = document.getElementById("root");

// Safety Check: Essential for 'Ultra High' stability.
if (!container) {
  throw new Error(
    "Critical Error: Root element not found. Ensure <div id='root'></div> exists in index.html."
  );
}

const root = createRoot(container);

/**
 * Render Pipeline
 * StrictMode: Helps catch side effects in development for buttery-smooth animations.
 */
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);