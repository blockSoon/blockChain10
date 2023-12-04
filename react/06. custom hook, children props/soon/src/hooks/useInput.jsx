// use 접두어는 가독성을 높히기 위해서 사용.

import { useState } from "react"

const useInput = (initialValue) =>{
    // 정규식을 삽입한다던지 정규식 통과 안될시 경고 구문 작성도 가능
    const [value, setValue] = useState(initialValue);
    const onChange = (e) =>{
        console.log(e.target.value);
        setValue(e.target.value);
    } 
    // value , onChange 키로 반환값을 내보낸 이유는
    // input에 속성으로 바로 주입 가능
    return {value, onChange}    
}

export default useInput;