import { UserParams } from "../interface/login.request";
import { AuthentcationResponse, Authentcator } from "./Authenticattor";

// 카카오 로그인 로직 기능을 담당할 클래스 정의
export class KakaoAuthernticator implements Authentcator{
    async authentcate(credentials: UserParams): Promise<AuthentcationResponse> {
        console.log("kakao 로그인")
        console.log(credentials)
        // kakao 로그인 로직
        return {success : true}
    }
}