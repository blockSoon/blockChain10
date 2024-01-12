// 유저 서비스 로직 클래스 정의

import { UserParams } from "../interface/login.request";
import { AuthentcationResponse } from "../strategy/Authenticattor";
import Strategy from "../strategy/strategy";

class UserService {
    // 전략패턴 유저 로그인 서비스 로직들을 가지고 있는 객체
    constructor(private readonly strategy : Strategy) {}
    // strategy 키에 생성자 함수에 매개변수로 전달한 객체가 할당

    async login(type : string , credentials : UserParams) : Promise<AuthentcationResponse> {
        const result = await this.strategy.login(type, credentials)
        return result
    }
}

export default UserService