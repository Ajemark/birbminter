import { createRoot } from "react-dom/client";
import "./index.css";
import "@hookstate/devtools";
import App from "./app";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
