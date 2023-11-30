import React from "react";
import {Body, Header} from "../components/layout";

const MyPage = () =>{
    return(<>
        <Header name={"마이 페이지"}></Header>
        <Body path={"/"} pageName={"메인"}></Body>
    </>)
}

export default MyPage;