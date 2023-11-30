import React from "react";
import {Body,Header} from "../components/layout"

const Login = ({login, setLogin}) =>{
    return (
    <>
        <Header name={"로그인 페이지"}></Header>
        <button onClick={()=>{setLogin(!login)}}>{login ? "로그아웃" : "로그인"}</button>
        <Body path={"/"} pageName={"메인"} />
    </>
    )
}

export default Login;