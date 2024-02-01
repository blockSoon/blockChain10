import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import useWeb3 from "./hooks/web3.hook";
import abi from "./abi/soonNFT.json";

function App() {
  // 민팅을 하는 사이트다.
  // 이미지 올렸다 가정 (객체를 업로드 하는중이다.)
  const [file, setFile] = useState(null);
  const { user, web3 } = useWeb3();
  const [nftContract, setNftcontract] = useState(null);
  useEffect(() => {
    if (web3 != null && nftContract == null) {
      const _nftContract = new web3.eth.Contract(abi, "0x632b26c81a5b13144fb137b7c8337fb05c39806b");
      setNftcontract(_nftContract);
    }
  }, [web3]);
  const upload = async () => {
    const fileData = new FormData();
    fileData.append("file", file);
    const resp = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
        pinata_api_key: "b6902b8cebf44d6f2eee",
        pinata_secret_api_key: "e21b31d90713e24adb1e45a3bdaee311dc90d64e3fb9dd6b8bb5b9150dd71eeb",
      },
    });

    // ipfs에 업로드 이후 해시 주소가 생기면
    // 이후에 컨트랙트 메서드로 요청 mint
    // nft 민팅

    // contract mint
    // token url
    // resp {data.IpfsHash: "QmPFbUu53PCqi8cgWpd8PwX6TA7GfsHHFh7apXqBUcW24m"}
    // nft 발행
    const {
      data: { IpfsHash: urlhash },
    } = resp;
    console.log(urlhash);
    await nftContract.methods.minting(urlhash).send({
      from: user.account,
    });
    console.log(resp);
  };

  return (
    <div className="App">
      <label>IPFS에 파일 업로드</label>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={upload}>파일 업로드</button>
    </div>
  );
}

export default App;
