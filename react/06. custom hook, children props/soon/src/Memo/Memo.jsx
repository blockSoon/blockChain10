import { useState, useMemo, useEffect } from "react"

export const Memo = () =>{
    const [immutableNum, setImmutableNum] = useState(0);
    const [count, setCount] = useState(0);

    const increment = () => {
        console.log("증가");
        setCount(count + 10);
        setImmutableNum(1);
        if(count == 50)
        setImmutableNum(1+count);
    }

    const tempValue = useMemo(() => {
        // 
        console.log("메모 hook 실행")
        return (immutableNum + 2);
    },[immutableNum]);
    // memo 새로운 연산을 처리할지 말지 immutableNum
    // useEffect(()=>{
    //     console.log("나는 자식 컴포넌트임")
    // },[immutableNum])
    console.log("실행이 되고")
    // 부모의 컴포넌트가 리렌더링이 되어도 이 자식 컴포넌트는 리렌더링이 되지 않는다.
    return (
        useMemo(()=>{
            console.log("나는 자식 컴포넌트")
            return <div>
                <p>count : {count}</p>
                <button onClick={increment}>증가</button>
                <p>tempValue : {tempValue}</p>
            </div>
        },[immutableNum, count])
    )
}