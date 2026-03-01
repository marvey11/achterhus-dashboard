import "./App.css";
import { Dashboard } from "./components/Dashboard";

function App() {
  return <Dashboard />;
}

// Listen for Vite's built-in error when a resource is missing
window.addEventListener(
  "error",
  (e) => {
    if (
      e.message.includes("Loading chunk") ||
      e.message.includes("CSS_CHUNK_LOAD_FAILED")
    ) {
      console.warn("New version detected, refreshing...");
      window.location.reload();
    }
  },
  true,
);

export default App;
