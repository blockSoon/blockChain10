// 유저 객체구조를 가져오자
import { UserParams } from "../interface/login.request"

// 검증 로직 서비스를 담당할 곳

// 전략패턴에서 사용하는 클래스를 받아서 
// 어떤 기능을 사용하는지 구분하는 역활

// 응답 객체의 구조를 정의

export interface AuthentcationResponse {
    success : boolean
    message?: string
    // 실패했을때 메시지를 보내주고 싶어  ?: 붙이면 객체에 값이 없어도 됨.
}

// 검증 로직 서비스의 객체의 구조 정의
export interface Authentcator {
    // 로그인 검증 서비스 로직
    authentcate(credentials : UserParams) : Promise<AuthentcationResponse>
}