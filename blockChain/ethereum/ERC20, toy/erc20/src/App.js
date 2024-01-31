import { useEffect, useState } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/CoinMusme.json";
import "./App.css";

function App() {
  const { user, web3 } = useWeb3();
  const [musmeContract, setMusmeContract] = useState(null);
  const [token, setToken] = useState(0);
  const [musmeArr, setMusmeArr] = useState([]);

  useEffect(() => {
    if (web3 != null && musmeContract == null) {
      const musme = new web3.eth.Contract(abi, "0x1845d44d6a60419ab04fCB20565b67a1ff8e8eA8");
      setMusmeContract(musme);
      console.log(musme);
    }
  }, [web3]);

  const getToken = async (account) => {
    const result = await musmeContract.methods.balanceOf(account).call();
    // console.log(result);
    const fromWei = await web3.utils.fromWei(result, "ether");
    // console.log(fromWei);
    setToken(fromWei);
  };

  const getMusme = async () => {
    const result = await musmeContract.methods.getMusme().call({
      from: user.account,
    });
    // console.log(result);
    setMusmeArr(result);
  };

  const buyMusme = async () => {
    await musmeContract.methods.buyMusme().send({
      from: user.account,
    });
  };

  useEffect(() => {
    if (musmeContract == null) return;
    getToken(user.account);
    getMusme();
  }, [musmeContract]);

  return (
    <div className="App">
      <div>연결된 계정 : {user.account}</div>
      <div>계정의 잔액 : {user.balance} ETH</div>
      <div>토큰 량 : {token}</div>
      <div>
        가지고 있는 코인무스메 :
        {musmeArr.map((item, index) => (
          <div key={index}>
            {item.name} : <img width={200} src={item.url} />
          </div>
        ))}
      </div>
      <button onClick={buyMusme}>코인무스메 랜덤 뽑기</button>
    </div>
  );
}

export default App;
