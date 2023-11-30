import React from "react"
import {Link, useNavigate} from "react-router-dom";
// Link는 리액트에서 a 태그와 같은 역활을 해주고

// 메서드에서 url을 변경 해주고 싶다. Hook 메서드 useNavigate

const Body = ({path, pageName, login}) =>{
    // 인스턴스 생성
    const nav = useNavigate();
    const NavHandler = (_path) =>{
        // url 변경
        nav(_path);
    }
    return (<div>
        <Link to={path}>{pageName} 페이지 이동</Link>
        <button onClick={()=>{NavHandler(path)}}>{pageName} 페이지로 이동</button>
        {login}
    </div>)
}

export default Body;