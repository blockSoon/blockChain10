import { useRecoilValue } from "recoil"
import { Login } from "../recoil/atom"

export const Mypage = () =>{
    const userState = useRecoilValue(Login);
    return <>
        {`${userState.uid}가 로그인했음`}
    </>
}