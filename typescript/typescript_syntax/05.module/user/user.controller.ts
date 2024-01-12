import { UserParams } from "./interface/login.request";
import UserService from "./service/user.service";

// 사용자 서비스 로직 담당할 클래스 정의

export class UserController {
    constructor(private readonly userService : UserService){}

    // 로그인
    async signin(type : string){
        // 임시 더미 유저 요청 객체
        const loginParams : UserParams = {
            email : "soon@namver.com",
            password : "12345"
        }
        const result = await this.userService.login(type, loginParams);
        console.log(result)
    }

    // 회원가입 이부분 추가
}