import { createRoot } from "react-dom/client";
import { App } from "./app";
import "./index.css";

import "@hookstate/devtools";

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
