class App extends React.Component {
  render() {
    return (
      <ul>
        <li>list 1</li>
        <li>list 2</li>
        <li>list 3</li>
        <li>list 4</li>
      </ul>
    );
  }
}

// 요소를 선택해올 필요는 없는친구인데..
// 딱한번 루트 요소를 한번 지정한다.
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(<App />);
