import "./App.css";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/SoonToken.json";
import { useState, useEffect, useRef } from "react";

function App() {
  const { user, web3 } = useWeb3();
  const [SoonToken, setSoonToken] = useState(null);
  const [token, setToken] = useState(0);
  const accountInput = useRef();
  const tokenInput = useRef();
  useEffect(() => {
    if (web3 == null || SoonToken != null) return;
    const _SoonToken = new web3.eth.Contract(abi, "0x50C2E5FfbB518b4bC00b6252967031016E20F093", { data: "" });
    setSoonToken(_SoonToken);
  }, [web3]);

  const getToken = async (account) => {
    if (SoonToken == null) return;
    let result = web3.utils.toBigInt(await SoonToken.methods.balanceOf(account).call()).toString();
    result = await web3.utils.fromWei(result, "ether");
    setToken(result);
    return result;
  };

  const transfer = async () => {
    // from == msg.sender
    await SoonToken.methods.transfer(accountInput.current.value, await web3.utils.toWei(tokenInput.current.value, "ether")).send({
      from: user.account,
    });
    getToken(user.account);
  };

  useEffect(() => {
    getToken(user.account);
  }, [SoonToken]);

  // 여기에 연결된 모든 지갑의 토큰의 량을 화면에 보여주자.
  // 이전 내용 복습 연결된 네트워크 판단해서
  // 세폴리아 네트워크로 전환 될 수 있게 코드 작성.
  return (
    <div className="App">
      <div>지갑 주소 : {user.account}</div>
      <div>지갑의 잔액 : {user.balance} ETH</div>
      <div>토큰 량 : {token}</div>
      <label>토큰 받을 계정</label>
      <input ref={accountInput}></input>
      <label>보낼 토큰량</label>
      <input ref={tokenInput}></input>
      <button onClick={transfer}>토큰 전송</button>
    </div>
  );
}

export default App;
