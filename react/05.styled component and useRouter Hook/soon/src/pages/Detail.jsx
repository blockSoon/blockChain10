import React from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { Body, Header } from "../components/layout";

// react hook url 파라미터 값과 쿼리스트링을 가져오자.
// react-router-dom 내부 hook
// useLocation : 현재 브라우저의 url 정보를 가져온다.
// useParams : url에 파라미터 값을 객체의 형태로 파싱해서 가져온다.
// useSearchParams : 쿼리 스트링을 파싱해서 매개변수 값을 가져온다.

const Detail = () =>{
    // 임시 데이터를 선언해놓고 보여주자.
    let tempItem = [
        {num : 10, name : "이쁜 셔츠"},
        { num : 20, name : "빈티지 바지"},
        { num : 30, name : "벙거지 모자"}
    ];
    const location = useLocation();
    console.log(location);

    const params = useParams();
    console.log(params);
    
    const [query, setQuery] = useSearchParams();
    // 반환 되는 인스턴스가 배열의 형태로 방환된다.
    // 첫번째 값은 쿼리내용을 가져올수있는 get등의 메서드가 있는 객체
    // 두번째 메서드는 이후에 쿼리 값을 변경해야할때 사용할 메서드
    console.log(query.get("num2"))
    console.log(query.get("num3"))
    return(<>
        <Header name={"상세 페이지"} />
        <div>{tempItem[params.id].num}개</div>
        <div>{tempItem[params.id].name}</div>
        <Body path={"/"} pageName={"메인"}/>
    </>)
}

export default Detail;