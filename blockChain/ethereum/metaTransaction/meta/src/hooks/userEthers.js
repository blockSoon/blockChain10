import { useState, useEffect, useDebugValue } from "react";
import { ethers } from "ethers";

const useEthers = ({ _privateKeys = null }) => {
  const [user, setUser] = useState({ account: "", balance: "0" });
  const [provider, setProvider] = useState(null);
  const [pkProvider, setPkProvider] = useState([]);
  useEffect(() => {
    // 지갑의 개인키로 지갑 객체 생성
    if (_privateKeys !== null) {
      const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
      // 요청을 여러개 처리할건데 ㅠㅠ
      // promise.all 여러개의 비동기 처리 이후에 실행
      const promiseWallet = _privateKeys.map(async (pk) => {
        // 지갑이 해당 네트워크에 요청을 보낼수 있는 인스턴스 생성
        const wallet = new ethers.Wallet(pk, provider);
        // wallet.address == 개인키로 만든 공개키
        // 인스턴스화된 지갑의 잔액을 해당 네트워크에 요청을 보내서 잔액 확인
        const balance = await provider.getBalance(wallet);
        const balanceEth = ethers.formatEther(balance);
        return {
          wallet,
          address: wallet.address,
          balance: balanceEth,
        };
      });
      // 처리중인 비동기 배열을 넣어주면
      // 모든 비동기가 처리됬을때 진행
      Promise.all(promiseWallet).then((e) => {
        setPkProvider(e);
        console.log(e);
      });

      return;
    }
    // 확장프로그렘으로 연결을 해본거고.
    if (window.ethereum) {
      window.ethereum.request({ method: "eth_requestAccounts" }).then(async (accounts) => {
        const ethPrv = new ethers.BrowserProvider(window.ethereum);
        // 내가 접속한 지갑이 서명자임
        // getSigner = signer 접속된 계정도 확인 가능.
        const signer = await ethPrv.getSigner();
        console.log(signer);
        // 5v === 6v
        // ethers 6버전 기준으로 작성중
        const balance = await ethPrv.getBalance(accounts[0]);
        const balanceEth = ethers.formatEther(balance);
        setUser({ account: accounts[0], balance: balanceEth });
        setProvider(ethPrv);
      });
    } else {
      alert("메타마스크 설치 및 지갑 확인 하세요~");
    }
  }, []);
  if (_privateKeys) return { pkProvider };
  return { user, provider };
};

export default useEthers;
