import { useState } from "react";
import "./App.css";
import { Memo } from "./Memo/Memo";
import Login from "./components/page/Login";
import { Context } from "./Context/Context";
import { Callback } from "./Callback/Callback";
import { Reducer } from "./Reducer/Reducer";

function App() {
  const [temp, setTemp] = useState(0);
  const onClickHandler = () => {
    setTemp(temp + 1);
  };
  return (
    <div className="App">
      <Login></Login>
      <Memo></Memo>
      <button onClick={onClickHandler}>증가</button>
      <Context></Context>
      <Callback></Callback>
      <Reducer></Reducer>
    </div>
  );
}

export default App;
