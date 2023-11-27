import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Game } from "./page/Game";
import Login from "./page/Login";
import Main from "./page/Main";
import Game2 from "./page/Game2";

function App() {
  // 우리가 폭탄 컴포넌트
  // 컴포넌트를 누르면 폭탄이 펑 하고 터지는 이미지를 보여줘보자.
  const test = () => {
    switch (1) {
      case 1:
        break;

      default:
        break;
    }
  };
  // Route에는 작성해야할 속성값이 두개 있는데
  // path : 브라우저의 경로 (url 조건값)
  // element : path 조건에 충족했을때 보여줄 컴포넌트
  return (
    <div className="App">
      <Routes>
        {/* case */}
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game2" element={<Game2 />} />
      </Routes>
    </div>
  );
}

export default App;
