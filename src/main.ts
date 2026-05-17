import { createApp } from "./app.js";
import "./presentation/styles/tokens.css";
import "./presentation/styles/main.css";

const root = document.getElementById("app");
if (!root) {
  throw new Error("Missing #app mount point");
}

createApp().mount(root);
