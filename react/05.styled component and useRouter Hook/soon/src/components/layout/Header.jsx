import React from "react"
import styled from "styled-components";

// JSX 문법 태그함수 styled.div
// vscode-styled-components 설치
// props로 전달한 값을 템플릿 리터럴 자바스크립트 구문을 삽입해서 동적인 스타일 적용
const HeaderStyle = styled.div`
    font-size : 15px;
    width : 100%;
    height : 60px;
    color : blue;
`

const Header = ({name}) =>{
    return (<HeaderStyle width={"60px"}>{name}</HeaderStyle>)
}

export default Header;