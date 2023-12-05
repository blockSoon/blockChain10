import React from 'react'
import { useSelector } from 'react-redux'
import LoginCount from "../utils/Count";
const Count = () => {
    // 저장소의 값을 가져와서 보여주는 페이지
    // hook
    // useSelector : store의 전역 상태를 참조할수있게 도와주는 hook함수
    // 함수 실행을 할때 콜백을 전달 합니다. 함수의 반환으로 상태를 반환 받을수있다.
    const count = useSelector(state => state.count);
    // 전역 상태의 객체에 있는 count만 받아온다.
  return (
    <div>
        {count}
        <LoginCount></LoginCount>
    </div>
  )
}

export default Count