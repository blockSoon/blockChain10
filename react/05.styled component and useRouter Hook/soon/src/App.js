import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

import { Main, Shop, MyPage, Login, Detail } from "./pages";
import { useState } from "react";
// 로그인이 되어 있지 않으면 접근할수 없는 페이지에서 리다이랙트 시키자.
function App() {
  // props로 모든 페이지에서 로그인 정보를 가져야하니까 최상위 컴포넌트에서 가지고 있어야겠다.
  const [login, setLogin] = useState(false);
  // login 페이지 컴포넌트에서 setLogin실행해서 부모 컴포넌트 상태를 변경했음 상태를 끌어올렸다 ㅎ
  const Redirect = () => {
    // 고차 컴포넌트 패턴

    // Navigate 사용해서 브라우저의 요청이 들어왔을때 다른 경로로 요청을 하게 해준다.
    // mypage는 로그인이 되어있어야 들어갈수 있는 페이지.
    if (login) return <MyPage login={login} />;
    return <Navigate to={"/login"} />;
    // /login 경로로 다시 요청을 보낸다.
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/mypage" element={<Redirect />} />
        <Route path="/login" element={<Login login={login} setLogin={setLogin} />} />
        <Route path="/detail/:id/:num/:name" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
