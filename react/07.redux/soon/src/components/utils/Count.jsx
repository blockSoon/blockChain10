import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
const Count = () => {
    // 전역 상태 업데이트
    // useDispacth hook 함수 가져와서 사용
    // reducer에서 액션 객체를 받아서 조건문에 따른 상태 업데이트
    // 인스턴스 생성 dispatch 함수를 반환 받는다.
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.isLogin);
    const incrementHandler = () =>{
        dispatch({type : "김치볶음밥", payload : {count : 2}})
    }
    const decrementHandler = () =>{
        dispatch({type : "계란볶음밥", payload : {count : 2}})
    }
  return (
    <div>
        {isLogin ? "로그인 됨": "로그인 안됨"}
        <button onClick={incrementHandler}>증가, 로그인</button>
        <button onClick={decrementHandler}>감소, 로그아웃</button>
    </div>
  )
}

export default Count