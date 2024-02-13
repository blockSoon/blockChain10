import logo from "./logo.svg";
import "./App.css";
import useEthers from "./hooks/userEthers";
import { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";

function App() {
  const ABI = [
    {
      inputs: [],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "allowance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "needed",
          type: "uint256",
        },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "approver",
          type: "address",
        },
      ],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "receiver",
          type: "address",
        },
      ],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "ERC20InvalidSpender",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [
        {
          internalType: "uint8",
          name: "",
          type: "uint8",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];
  const [selectAccount, setSelectAccount] = useState(0);
  const [erc20Count, setErc20Count] = useState(0);
  const [txpool, setTxpool] = useState([]);
  const [tokens, setTokens] = useState([]);
  const { pkProvider } = useEthers({
    _privateKeys: [
      "0xe7a5be8380a33a85896c8016b9957a7534f8be2140707dfb6cc8d5752e54cb6a",
      "0xed4184d5068668c840860a92584c30a23998d801d0724f836777fe3128fd5c88",
      "0x7e8603ca86dc81d745a67d16a4ccc86e55f9b6a686cccac4790f3faa8d3f25c9",
      "0x21c805018b9aae3afda564644a6465cccd1f7d671d3dc36fb3ef2832d6a1ee85",
      "0x5784ceed85d0f21ffb49270e68adcbd743512cb11675ede5bee26402c504b860",
      "0x25101e2332b9799642b43605ee9fb9b6036645722acb71a5ba9bc68ecb02cece",
      "0x18a4a3aab21d2863c0f9d8dc57f213d4d7bb26a68332afacf6785bba92186024",
      "0x15eb6527fb15169f8fa9ccb62941f867deb1f77df188892f2a9a922c367c7b14",
      "0x5de0f633e867194642e01e01f1533521f9ecfcb0344cdc94b6b2d303190c0827",
      "0x45e97a7e2101e0ebc35b38a28e905fa99a161de9dc5f8fecd941e2f66a408d6e",
    ],
  });

  const getTxPoolHandler = async () => {
    const { data: resp } = await axios.get("http://localhost:4000/getTxPool");
    console.log(resp);
    setTxpool(resp);
  };

  const messageHandler = async () => {
    const txMessage = {
      sender: pkProvider[selectAccount].address,
      data: erc20Count,
    };
    console.log(pkProvider[selectAccount].address);
    // 서명을 이 지갑이 이 메시지를 보낸게 맞느냐?
    // signMessage 메시지의 내용으로 서명을 만든다.
    const sign = await pkProvider[selectAccount].wallet.signMessage(JSON.stringify(txMessage));
    // '\x19Ethereum signed Message:\n20'
    await axios.post("http://localhost:4000/sign", { message: txMessage, signature: sign }, { headers: { "Content-Type": "application/json" } });
  };

  const metaTxHandler = async () => {
    const { data: resp } = await axios.post("http://localhost:4000/metaTransction");
    console.log(resp);
    await getTxPoolHandler();
  };

  useEffect(() => {
    console.log(pkProvider);
    if (pkProvider.length === 0) return;
    const contract = new ethers.Contract("0x7F1b402900d3B9153b368Ece72bEf7B8d5B55012", ABI, pkProvider[selectAccount].wallet.provider);
    const tokenArr = pkProvider.map(async (e) => {
      const balance = await contract.balanceOf(e.address);
      return balance.toString();
    });
    Promise.all(tokenArr).then((e) => {
      setTokens(e);
    });
  }, [pkProvider]);
  return (
    <div className="App">
      <div>선택한 지갑</div>
      <div>계정 : {pkProvider[selectAccount]?.address}</div>
      <div>{pkProvider[selectAccount]?.balance} ETH</div>

      <div>
        <ul>
          <li>계정 목록</li>
          {pkProvider.map((e, i) => (
            <li key={"pkPr" + i} onClick={() => setSelectAccount(i)}>
              {e.address} : {e.balance} ETH : {tokens[i]} STK
            </li>
          ))}
        </ul>
      </div>

      <div>
        <ul>
          <li>가스비 대납 계정(회사 계정)</li>
          <li>{pkProvider[pkProvider.length - 1]?.address}</li>
          <li>대납 지갑의 ETH : {pkProvider[pkProvider.length - 1]?.balance}</li>
          <label>ERC20 몇개 받고 싶니?</label> <br />
          <input type="number" onChange={(e) => setErc20Count(e.target.value)}></input>
          <button onClick={messageHandler}>대납 신청(트랜잭션 요청)</button>
        </ul>
      </div>

      <div>
        <ul>
          <button onClick={getTxPoolHandler}>txpool 조회</button>
          {txpool.map((e) => (
            <li>
              {e.message.sender}가 토큰{e.message.data} 개 받고싶데
            </li>
          ))}
          <button onClick={metaTxHandler}>트랜잭션 작업 실행</button>
        </ul>
      </div>
    </div>
  );
}

export default App;
