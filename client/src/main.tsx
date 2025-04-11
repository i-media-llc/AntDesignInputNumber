import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Using Ant Design without explicit CSS import as it's included in the component
// See: https://ant.design/docs/react/migration-v5

createRoot(document.getElementById("root")!).render(<App />);
