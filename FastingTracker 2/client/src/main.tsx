import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set title dynamically
document.title = "斷食倒數計時器";

// Add meta description for SEO
const metaDescription = document.createElement('meta');
metaDescription.name = 'description';
metaDescription.content = '追蹤你的斷食時間，支援多種斷食模式，包含16:8, 20:4, 24h, 32h, 42h和48h，並記錄你的斷食歷史。';
document.head.appendChild(metaDescription);

createRoot(document.getElementById("root")!).render(<App />);
