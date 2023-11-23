import React from "react";
import { createRoot } from "react-dom/client";
// react 버전 18버전
// react-dom/client createRoot 사용하라고 권장
import App from "./app";

const root = createRoot(document.querySelector("#root"));
root.render(<App />);
