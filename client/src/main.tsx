import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { listenForStaleChunks } from "./lib/chunkReload";

listenForStaleChunks();

createRoot(document.getElementById("root")!).render(<App />);
