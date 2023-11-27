import React, { useEffect, useState } from 'react'
import Player from '../components/Player'
import {scissors, rook, paper} from "../image/rookScissorsPaper"
const Game2 = () => {
    const [playerSelect, setPlayerSelect] = useState(null);
    const [comSelect, setComSelect] = useState(null);
    const [result, setResult] = useState("대기");
    // 가위바위보

    // 1. 두명이 있어야된다. (플레이어, 컴퓨터)(컴포넌트 2개)(재사용성)
    // 2. 컴퓨터는 랜덤의 값을 보여줘야한다. (3가지의 경우의 수를 랜덤값을 만들어주는 함수)
    // 3. 가위인지 바위인지 보인지 값을 보여줄수있는 기능.(비교 승패 검증까지)
    



    // 객체로 만드는이유는 여러개의 데이터를 다루는 경우
    const select = {
      scissors : {
        name : "가위",
        imgPath : scissors
      },
      rook : {
        name : "바위",
        imgPath : rook
      },
      paper : {
        name : "보",
        imgPath : paper
      },
    }

    // 컴퓨터의 랜덤 값 설정끝
    const comSelectHandler = () =>{
      // 컴퓨터가 선택하는 랜덤값은 0~2 3가지의 경우의 수
        let arr = Object.keys(select); // ["scissors","rook","paper"]
        console.log(arr);
        // 컴퓨터의 랜덤값
        let comRandom = Math.floor(Math.random() * 3); // 0~2 가지

        // ["scissors","rook","paper"][0]
        // select["scissors"]  랜덤값이 0이면은
        setComSelect(select[arr[comRandom]])
    }

    const playerSelectHandler = (_select) =>{
      setPlayerSelect(select[_select]);
      comSelectHandler();
      
    }
    
    // 부모 컴포넌트가 리렌더링 되면 자식 컴포넌트는 모두 리렌더링된다.

    // reaact의 라이프 사이클
    useEffect(()=>{
      // mount 속성 막았음
      if(comSelect === null) return;
      resultHandler();
      // comSelect 가 업데이트 될때만
    },[comSelect]);

    const resultHandler = () =>{
      //      4. 플레이어 컴퓨터
      //      가위  ==  가위 = 무승부
      //      가위  == 바위 = 패
      //      가위  == 보 = 승

      //      바위  == 바위 = 무승보
      //      바위  == 보 = 패
      //      바위  == 가위 = 승

      //      보  ==  보 = 무승부
      //      보  ==  가위 = 패
      //      보  == 바위 = 승
        if(playerSelect.name === comSelect.name){
          setResult("무승부")
        } else if(playerSelect.name === "가위"){
            let result = comSelect.name === "보" ? "이겼음" : "졌음";
            setResult(result);
        }else if(playerSelect.name === "바위"){
            let result = comSelect.name === "가위" ? "이겼음" : "졌음";
            setResult(result);
        }else if(playerSelect.name === "보"){
            let result = comSelect.name === "바위" ? "이겼음" : "졌음";
            setResult(result);
        }
    }
  return (
    <div className='border'>
        <Player name={"유저"} select={playerSelect} result={result} />
        <Player name={"컴퓨터"} select={comSelect} result={result}/>
        <div>
          <button onClick={()=>{playerSelectHandler("scissors")}}>가위</button>
          <button onClick={()=>{playerSelectHandler("rook")}}>바위</button>
          <button onClick={()=>{playerSelectHandler("paper")}}>보</button>
        </div>
    </div>
  )
}

export default Game2