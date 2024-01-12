import { UserParams } from "../interface/login.request";
import { AuthentcationResponse, Authentcator } from "./Authenticattor";

// 전략 패턴 객체 구조 정의

// 예시
// interface IStrategy {
//     email : Email,
//     kakao : KaKao
// }

interface IStrategy {
    // 문자열로 지정
    // key를 미리 정의를 하지않고 선언 당시에 지정할수 있다.
    // key를 동적으로 할당할수 있다.
    [key : string] : Authentcator
}

// 서비스 로직들을 가질 객체 구조 정의
// Strategy 클래스가 하는 기능 
// 기능을 추가하는 역활(하나의 기능을 담당하는 클래스로 동적할당한 객체)
// 로그인 타입에서 따라서 추가된 기능들 중에 전달한 유저의 로그인 타입에 대한 로그인 서비스 실행

class Strategy {
    // 서비스 로직기능들을 담을 객체
    // email, kakao, google 등의 로그인 기능을 가지고있는 클래스로 동적할당한 객체들을 담아줄 strategy객체
    private strategy : IStrategy = {}

    // 기능을 strategy객체에 추가해줄 함수
    public set(key : string, authentcate : Authentcator){
        // 동적으로 key를 할당하면서 전달한 기능을 담당하는 클래스로 동적할당한 객체를 할당해준다.
        this.strategy[key] = authentcate;
        // set으로 3번 추가한 예)
        // strategy {
        //     email : Email : { authentcate(credentials : UserParams) : Promise<AuthentcationResponse> }
        //     kakao : Kakao : { authentcate(credentials : UserParams) : Promise<AuthentcationResponse> }
        //     google : Google : { authentcate(credentials : UserParams) : Promise<AuthentcationResponse> }
        // }
    }

    public async login (type : string, credentials : UserParams ) : Promise<AuthentcationResponse>{
        // 어떤 로그인 로직을 실행할건지 조건을 type으로 전달하고 키의 값의 객체에 authentcate함수를 실행하는데 매개변수로 유저의 요청 객체 내용
        const result = await this.strategy[type].authentcate(credentials);
        return result
    }
}

export default Strategy;