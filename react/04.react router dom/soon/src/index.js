import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
// 여러개의 페이지를 작성할때
// 어떻게 보여줘야 하지?.
// 페이지를 컴포넌트로 구성을 하고 하위 컴포넌트들로 작성한
// 이 페이지 컴포넌트를 브라우저에서 읽을수있는 자바스크립트로 변환해서 보여준다.
// URL이 변경을 감지하면 새로고침 이벤트를 막고 내용물을 변경해서 페이지가 전환된것처럼 보여주면 되겠다.

// npm install react-router-dom@6 설치
// App 컴포넌트에 라우팅 기능을 사용할수 있도록 주입.
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
