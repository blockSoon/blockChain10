import React from 'react'
import {Link} from "react-router-dom";

const Main = () => {
  return (
    <div>Main
        <Link to={"/game"}>게임 페이지로 이동</Link>
        <Link to={"/game2"}>가위바위보 게임 페이지로 이동</Link>
    </div>
  )
}

export default Main