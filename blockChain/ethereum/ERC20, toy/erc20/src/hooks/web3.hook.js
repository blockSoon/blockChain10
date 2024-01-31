import { useState, useEffect } from "react";
import Web3 from "web3";

const useWeb3 = () => {
  const [user, setUser] = useState({ account: "", balance: 0 });
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // 초기에 한번만 연결 하도록
    // 지갑 확장 프로그램이 설치가 되어 있으면.
    // window.ethereum.isMetaMask 있으면
    console.log(window.ethereum);
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(async ([data]) => {
        const web3Provider = new Web3(window.ethereum);
        // 첫번째 배열이 연결되어있는 계정
        const balance = await web3Provider.eth.getBalance(data);
        console.log(balance);
        const Wei = await web3Provider.utils.fromWei(balance, "ether");
        console.log(Wei);
        setUser({ account: data, balance: Wei });
        setWeb3(web3Provider);
      });
    } else {
      alert("메타마스크를 설치해주세요~");
    }
  }, []);
  return { user, web3 };
};

export default useWeb3;
