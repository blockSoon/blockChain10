import { UserParams } from "../interface/login.request";
import { AuthentcationResponse, Authentcator } from "./Authenticattor";

// 이메일 로그인 기능 담당할 클래스 정의
export class EmailAuthenticator implements Authentcator {
    async authentcate(credentials: UserParams): Promise<AuthentcationResponse> {
        console.log("email 로그인")
        console.log(credentials)
        // 기능들 데이터 베이스 값을 조회 해서 유저가 맞는지 확인
        return {success : true}
    }
}