import { LoginBtn } from "../atoms/LoginBtn"
import styled from "styled-components"
import {useRecoilState, useRecoilValue, useSetRecoilState, useResetRecoilState, useRecoilStateLoadable} from "recoil"
import {Login, LoginCheck} from "../recoil/atom"
import { useEffect, useRef } from "react"
const LoginFormStyle = styled.div`
    width : 500px;
    height : 400px;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    margin : auto;
    background-color : #89ca89;
`

export const LoginForm = () =>{
    const [loginState, setLoginState] = useRecoilState(Login);
    const [loginLoadAble] = useRecoilStateLoadable(LoginCheck);
    // const _loginState = useRecoilValue(Login);
    // const _setLoginState = useSetRecoilState(Login);
    const uidInput = useRef();
    const upwInput = useRef();
    const resetLogin = useResetRecoilState(Login);

    const LoginHandler = () =>{
        if(!loginState.isLogin)
        setLoginState({uid : uidInput.current.value, upw :upwInput.current.value, isLogin : true })
    }

    useEffect(()=>{
        console.log(loginLoadAble);
        switch(loginLoadAble.state){
            case "hasError" : 
                resetLogin();
            break;
            case "hasValue" :
                break;
        }
    }, [loginLoadAble])

    return <LoginFormStyle>
        <label htmlFor="">아이디</label>
        <input type="text" ref={uidInput} />
        <label htmlFor="">비밀번호</label>
        <input type="text" ref={upwInput} />
        <LoginBtn onClick={LoginHandler}></LoginBtn>
    </LoginFormStyle>
}