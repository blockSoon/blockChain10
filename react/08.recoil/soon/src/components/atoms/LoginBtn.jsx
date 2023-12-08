import styled from "styled-components"

const ButtonStyle = styled.button`
    padding : 20px 50px;
    background-color : #45a045;
`

export const LoginBtn = ({onClick}) =>{
    return <>
     <ButtonStyle onClick={onClick}>로그인</ButtonStyle>
    </>
}