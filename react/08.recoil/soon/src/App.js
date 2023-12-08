import { useEffect, useState } from "react";
import "./App.css";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { contentState, pagination, pagination2 } from "./components/recoil/atom";
import { Login } from "./components/page/Login";
import { Mypage } from "./components/page/MyPage";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  // 어떤 스토어의 조회할건지
  const [content, setContent] = useRecoilState(contentState);
  // 값을 호출만 하고싶다
  const { pageIndex: pageContentIndex } = useRecoilValue(contentState);
  // 값을 수정만 할 컴포넌트 일 경우

  // 값을 가지고 왔는데
  const _pageIndex = useRecoilValue(pagination);

  const setPageIndex = useSetRecoilState(contentState);

  const pageCountHandler = () => {
    //setContent({ ...content, pageIndex: content.pageIndex + 1 });
    setPageIndex({ ...content, pageIndex: content.pageIndex + 1 });
  };

  const PageComponent = () => {
    const [pageIndex2] = useRecoilStateLoadable(pagination2);

    switch (pageIndex2.state) {
      case "hasValue":
        return <div>로딩끝 결과 성공</div>;
      case "hasError":
        return <div>에러남..</div>;
      case "loading":
        return <div>loading...</div>;
    }
  };

  useEffect(() => {
    console.log(_pageIndex);
  }, [_pageIndex]);

  return (
    <div className="App">
      {/* {content.name} <br />
      {content.status}
      <br />
      {content.massage}
      <br />
      {content.pageIndex}
      <br />
      {pageContentIndex}
      {"_pageIndex" + _pageIndex}
      <PageComponent></PageComponent>
      <button onClick={pageCountHandler}>페이지 증가</button> */}
      <Login></Login>
      <Mypage></Mypage>
    </div>
  );
}

export default App;
