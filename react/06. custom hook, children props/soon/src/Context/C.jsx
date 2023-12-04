import React, { useContext } from 'react'
import { Global } from './Context';

const C = () => {
    // useContext : hook 매개변수로 사용할 전역 context 객체
    // 다른 컴포넌트에서 전역상태의 값을 업데이트 할수도 있고 
    // 업데이트된 전역 상태를 가져올수있는 hook 함수다.
    const {login,setLogin} = useContext(Global);
  return (
    <>
        <div>{login ? "로그인 됨": "로그인 안됨"}</div>
        <button onClick={()=>{setLogin(!login)}}>로그인 or 로그아웃</button>
    </>
  )
}

export default C