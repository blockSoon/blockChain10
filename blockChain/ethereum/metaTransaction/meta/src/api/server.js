const express = require("express");
// 주의할점 ==== ethers 버전 프론트와 백엔드 동일하게 맞춰줘야한다.
const { ethers, Wallet } = require("ethers");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 임시 풀 만듬
let txpool = [];

// 컨트랙트 ABI
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_CA",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
    ],
    name: "event02",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "event03",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "_msg",
        type: "string",
      },
    ],
    name: "evnet01",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_address",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "token",
        type: "uint256[]",
      },
      {
        internalType: "string[]",
        name: "message",
        type: "string[]",
      },
      {
        internalType: "bytes[]",
        name: "signature",
        type: "bytes[]",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "string",
        name: "_msg",
        type: "string",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "signTransaction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "sign",
        type: "bytes",
      },
    ],
    name: "splitSign",
    outputs: [
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32",
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
];

// 우리는 여기다 쓰자 원래는 안전하게 보관 되어야함..
const myPrikey = "0x45e97a7e2101e0ebc35b38a28e905fa99a161de9dc5f8fecd941e2f66a408d6e";

// txpool 조회 (지금 쌓여있는 트랜잭션 작업들이 뭐가있지?)
app.get("/getTxPool", (req, res) => {
  res.json(txpool);
});

// txpool에 트랜잭션 객체를 추가
app.post("/sign", async (req, res) => {
  // 요청 메시지의 내용과 그사람이 이 메시지를 보낸게 맞는지? 메세지와 개인키로 만든 서명도 받자.
  const { message, signature } = req.body;
  // 검증 이사람이 요청을 보낸게 맞는지 서명 검증.
  const senderSigner = ethers.verifyMessage(JSON.stringify(message), signature);
  // r s v
  console.log(senderSigner);
  // 서명 검증 해서 pool
  if (message.sender === senderSigner) {
    txpool.push({ message, signature });
    res.json("txpool push");
  } else {
    res.json("error");
  }
});

// txpool에 있는 트랜잭션 작업 목록 처리
app.post("/metaTransction", async (req, res) => {
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
  const wallet = new ethers.Wallet(myPrikey, provider);
  const contractAddress = "0x0328A5fa1652244aDd81d24e8416602B5aBBE50B";
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  // web3 from과 서명 추가 했는데
  const msgSigner = contract.connect(wallet);

  // 리듀서로 편하게 작업해보자.
  // reduce 무척 잘쓰면 편하다.
  // callback의 인자값 첫번째 유지될값 반환된 값
  // 두번째 현재 순회하는 인자값 배열의 값이 순서대로 들어온다.
  // 세번째는 인덱스
  // reduce 두번째로 전달하는 매개변수는 초기값
  const txPoolArr = txpool.reduce(
    (acc, e) => {
      acc.address.push(e.message.sender);
      acc.data.push(e.message.data);
      acc.msg.push(JSON.stringify(e.message));
      acc.sign.push(e.signature);
      return acc;
    },
    { address: [], data: [], msg: [], sign: [] }
  );

  const _tx = await msgSigner.mint(txPoolArr.address, txPoolArr.data, txPoolArr.msg, txPoolArr.sign);
  txpool = [];
  res.send(_tx);
});

app.listen(4000, () => {
  console.log("server on~");
});
