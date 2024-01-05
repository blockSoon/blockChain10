// 로그인 가입 프로세스 작성
import {Startegy} from "./auth"

// 로그인을 진행할때 전달받는 객체의 형태
export interface AuthProps {
    email : string
    password : string
}

// 로그인 요청을 받은 이후 응답의 객체 형태
interface AuthentRespense {
    success : boolean
    message?: string
}

// authenticator함수를 포함한 객체의 형태
interface Authenticator {
    // 검증에 대한 요청을 처리하는 함수
    // Promise<AuthentRespense> 함수에서 요청을 받고 처리한뒤에 응답을 받으면 AuthentRespense객체의 형태로 반환해주는 함수
    authenticator(credentials : AuthProps) : Promise<AuthentRespense> 
    // 함수의 내용은 interface에 정의 할수 없다.
    // 어떤 함수나 변수가 포함될지 정의하는것.
}

// 로그인 로직이 두가지 있는데 
// 카카오 로그인, 이메일 로그인

// 객체지향적으로 프로그래밍을 할때 가장 기본적인 패턴
// 전략패턴

// 장점
// 클래스의 재사용성
// 클래스 마다마다의 내용을 객체지향적으로 따로 분리 할수있다.
// 기능이 갑자기 추가된 경우 하나의 클래스만 만들어주면 된다.

// 카카오 로그인 로직 클래스 정의
export class KaKaoAuthenticator implements Authenticator {
    async authenticator(credentials: AuthProps): Promise<AuthentRespense> {
        console.log("kakao 로그인")
        return {success : true}
    }
}

// 이메일 로그인 로직 클래스 정의
export class EmailAuthenticator implements Authenticator {
    async authenticator(credentials: AuthProps): Promise<AuthentRespense> {
        console.log("email 로그인")
        return {success : true};
    }
}

//  로그인 로직에서 사용할 서비스 처리 객체의 형태
export interface LoginService {
    // 로그인 로직에서 처리할 login 함수
    // kakao로 할수도 있고 이메일로 할수도 있고
    // type은 kakao 로그인인지 email 로그인인지
    // 유저의 입력값은 credentials에
    login(type : string, credentials : AuthProps ) :Promise<AuthentRespense>
}

// 로그인 클래스에 로그인 서비스 구조를 상속
export class Login implements LoginService {
    // Startegy 
    constructor(private readonly startegy : Startegy){}
    async login(type: "email" | "kakao", credentials: AuthProps): Promise<AuthentRespense> {
        const result = this.startegy[type].authenticator(credentials);
        return result;
    }
}