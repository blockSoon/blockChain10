// context

import { createContext, useState } from "react"
import A from "./A";

// createContext 메서드를 호출해서 Context 인스턴스를 생성.
export const Global = createContext();

// A 컴포넌트 자식으로 B 컴포넌트 그 자식으로 C 컴포넌트
// A 컴포넌트에 있는 상태변수를 C까지 내리려면 B한테 props C에서 props값 받아서 사용
// 가독성이 떨어지고 사용하기가 힘들어. 
export const Context = () =>{
    // 초기값 설정
    const [login, setLogin] = useState(false);
    // obj가 전역 상태의 초기값이 될거임.
    const obj = {
        login, setLogin
    }
    // Global.Provider 전역상태값 주입은 value 속성으로 전달한 값(초기값)
    return(
    <>
        <Global.Provider value={obj}>
            <A></A>
        </Global.Provider>
    </>
    )
}