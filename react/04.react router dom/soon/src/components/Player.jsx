import React from 'react'

const Player = ({name, select, result}) => {
  let temp = "";
  // 일반 변수다 그럼 어떻게 되는거지?...(상태변수가 아니기 때문에)
  // 상태변수는 값을 업데이트하면 리렌더링이 되어도 보존을 하는데 왜냐하면 이전값을 알고있고 다음에 그려질때 이전값을 전달해주기 때문에
  if(name === "유저"){
    temp = result;
  }else {
    // 유저의 반대의 값을 보여주면된다.
    temp = result === "무승부" ? "무승부" : result === "이겼음" ? "졌다" : "이겼음";
  }

  return (
    <div className='player'>
        <div className='name'>{name}</div>
        <img className='select-img' src={select && select.imgPath} alt="" />
        <div className='result'>{temp}</div>
    </div>
  )
}

export default Player