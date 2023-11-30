import React from "react"
import {Body, Header} from "../components/layout"

const Shop = () =>{
    let tempItem = [
        {num : 10, name : "이쁜 셔츠"},
        { num : 20, name : "빈티지 바지"},
        { num : 30, name : "벙거지 모자"}
    ];
    return (
        <>
            <Header name={"상품"}></Header>
            <Body path={"/"} pageName={"메인"}></Body>
            
            {tempItem.map((i,index)=><Body path={`/detail/${index}/1/1`} pageName={i.name} />)}
            {/* 상품들 아이템을 추가 할거임. */}
        </>
    )   
}

export default Shop;