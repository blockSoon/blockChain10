import React from "react"
import { Header,Body } from "../components/layout"

// header 컴포넌트
const Main = () =>{
    return (
    <>
        <Header name={"메인 페이지"}/>
        <Body path={"/shop"} pageName={"상품"} login={false}/>
        <Body path={"/login"} pageName={"로그인"} login={false}/>
        <Body path={"/mypage"} pageName={"마이"} login={false}/>
    </>
    )
}

export default Main;