import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Buffer } from "buffer";

window.Buffer = Buffer;

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
