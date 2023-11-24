import React, {useState, useEffect} from "react";

// 함수형 컴포넌트
// hook 함수가 생기면서 함수형 컴포넌트를 사용하게되었다.
// 매개변수에 props를 전달 받는다. 객체를 전달 받음
export const FunctionCom = ({name}) =>{
    // 상태를 가지고 싶은데?.
    // useState 메서드의 반환값은 배열이고
    // 첫번째 배열의 값은 상태의 값
    // 두번째 배열의 값은 setState 메서드

    // useState 매개변수로 값을 전달하는 값이 상태값의 초기값
    const [num, setNum] = useState(0);
    const [num2, setNum2] = useState(0);
    const clickHendler = () =>{
        setNum2(num2 + 1);
    }

    // 라이프 사이클 함수를 사용할때
    // useEffect에 전달한 콜백 함수가 실행이 된다.
    // 최초에 한번 무조건 실행은 된다. Mount 순서에 실행이 된다.
    // useEffect의 첫번째 매개변수 콜백함수
    // useEffect의 두번째 매개변수 컴포넌트가 주시하고 있는 값
    // useEffect의 두번째 매개변수로 전달한 값들을 항상 주시하고 있다가. 
    // 주시하고 있는 값이 바뀌면 콜백함수를 호출하고 리렌더링 다시 컴포넌트를 그린다.
    // [] 빈 배열은 Mount

    // useEffect(()=>{
    //     console.log("componentDidMount");
    // },[])

    // 두가지의 라이프 사이클
    // Mount + Update
    useEffect(()=>{
        console.log("componentDidMount");
        // 조건문으로 최초에 Mount를 제거할수있다.
        // console.log("num",num);
        // console.log("num2",num2);
    },[num])

    useEffect(()=>{
        console.log("componentDidMount");
        // 조건문으로 최초에 Mount를 제거할수있다.
        console.log("num",num);
        console.log("num2",num2);
    },[num, num2])
    
    return (
        <>
            <div>
                {name}{num}
            </div>
            <button onClick={clickHendler} >카운터 증가</button>
        </>
    );
}