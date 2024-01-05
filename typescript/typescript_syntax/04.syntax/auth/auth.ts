import {AuthProps, EmailAuthenticator, KaKaoAuthenticator, LoginService, Login} from './Authent'

// 카카오 로그인 로직과 이메일 로그인 로직을 가지고있는 객체의 형태
// Startegy 객체를 정의

export interface Startegy {
    email : EmailAuthenticator
    kakao : KaKaoAuthenticator
    
}

// 로그인 로직을 사용할 객체
class Auth {
    constructor (private readonly authPros : AuthProps, private readonly loginService : LoginService){
        this.authPros = authPros;
    }

    // 로그인 로직
    public async login(){
        console.log(this);
        const result = await this.loginService.login("email", this.authPros)
        console.log(result) // {success : true}
    }
}

// 로그인 로직 실행

// 유저의 입력값
const authProps : AuthProps = {email : "soon@naver.com", password : "12345"};

// email 로그인 로직 클래스 동적할당
const _email = new EmailAuthenticator();

// kakao 로그인 로직 클래스 동적할당
const _kakao = new KaKaoAuthenticator();

const _strategy : Startegy = {
    email : _email,
    kakao : _kakao
}

const _loginServervice = new Login(_strategy);

const auth = new Auth(authProps, _loginServervice);

// Auth {
//     {email : "soon@naver.com", password : "12345"}
//     login(){
//         console.log(this);
//         await this.loginService.login("kakao", this.authPros)
//     }
// }
auth.login();