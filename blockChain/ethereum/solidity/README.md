# contract 실행

- 컨트랙트에 저장하는 데이터는 상태의 데이터 탈중앙화 데이터 네트워크가 유지되는 동안은 영구적으로 저장이 가능하다.

- 우리가 배포한 컨트랙트는 데이터 저장 계정이고 이 저장공간은 영구적 컨트랙트를 파기하지 않는 이상.

# 솔리디티 코드 작성

```javascript
class Counter {
  value: number;
  constructor() {}
  setValue() {}
  getValue() {}
}

// 컨트랙트 배포
const _counter = new Counter();
_counter.setValue(2);
_counter.value;
// CA 주소 배포한 컨트랙트에 접근할수 있는 주소

// 첫번째 배포한 CA : 0xsjilkdfslkjsiljfsjilk

// 컨트랙트를 같은내용으로 또 배포를 해도
// 새로운 CA 주소가 할당된다.

const _counter2 = new Counter();
_counter2.value;
// 두번째 배포한 CA : 0xsdklfjlksjfliejliseji

// 싱글톤 디자인 패턴
```

```javascript
// 우리가 알아볼수 있는 레벨의 언어로 작성을 하고 (솔리디티)
// 작성한 코드내용을 컴파일해서 바이너리 코드로 변환해서 EVM이 실행할수 있는 언어로 변환
1. 라이센스 정보
2. 솔리디티 버전
3. 컨트랙트 내용
```

- 자바스크립트의 클래스는 인스턴스를 생성하는 과정이 (new 키워드를 사용해서 만듬)
- new 키워드를 통해 생성된 인스턴스들은 다른 메모리 공간을 가지고 있기에 주소가 다르기에 동일한 객체가 아니다.
- 이후에 생성된 인스턴스를 CA 주소로 참조해서 컨트랙트를 조회하면 사용하는 데이터는 같은 데이터를 참조한다. (싱글톤 패턴)

- 스마트 컨트랙트 배포 프로세스

1. 컨트랙트의 코드를 작성
2. 컨트랙트 코드를 컴파일
3. 트랜잭션을 생성(발생자, 컨트랙트의 컴파일된 코드)
4. 트랜잭션이 처리가 되면 블록에 트랜잭션 내용으로 CA가 생성되며 기록되고 CA codehash에 코드의 내용이 바이너리 코드로 저장되고
5. CA를 가지고 네트워크에 해당 실행 메서드의 내용을 ABI로 요청을 보내면
6. CA의 내용을 조회하고 실행시킬 메서드를 찾아서 EVM이 실행하고 상태변수를 변경

# 메타마스크

# 컨트랙트 컴파일

```sh
npm i solc@0.8.13
npx solc --abi --bin "컴파일할 파일의 경로"
```

# 솔리디티 기초 문법

1. 절차적 프로그래밍 언어.
2. 컴파일 언어

# SPDX-License-Identifier: MIT

- 스마트 컨트랙트의 신뢰성
- 저자권 문제를 방지하기위해 코드의 최상단에 주석으로 표시 작성한다.

# pragma

- 컴파일러의 기능을 사용할때 맞는 버전의 문법으로 컴파일 진행
- 솔리디티 버전을 명시

# contract

- 객체 지향 언어의 class와 유사
- contract의 내부에 상태 변수를 작성 하면 CA strageRoot에 탈중앙화 데이터를 보관하고있다.
- 상태변수를 조회 또는 변경을 하기위한 계약 조건 메서드를 작성한다.

# import

- 외부의 컨트랙트의 CA를 가지고 CA간에 상호작용을 하기위해
- 컨트랙트의 내용을 가지고온다. 모양 상속

```javascript
import "파일의 경로";
import { Counter이름 } from "파일의 경로";
```

# 상태 변수

- 컨트랙트 내부에 선언한 변수
- CA의 StrageRoot에 저장된다.

1. storage : 블록체인 탈중앙화 데이터로 영구적으로 기록되는 데이터
2. memory : 프로그램이 동작하는 동안만 값을 기억, 동작이 끝나면 해제시키는 데이터 공간

# 데이터의 타입

```javascript
    // 상태변수 선언
    // [타입] [변수명]
    bool _bool;
    // 기본 디폴트 값이 true
    // 참과 거짓을 나타낼 데이터 타입

    // int
    // uint
    uint256 _uint;
    // uint 부호가 없는 정수형 -가 안붙는 정수 음수가 될수 없다.
    // 정수형 타입 uint는 uint 자료형 뒤에 숫자를 붙이면 메모리 영역의 크기를 지정할수있다.

    int256 _int;
    // 부호가 있는 정수형 -가 붙을수 있다.
    // 정수형 타입 int는 int 자료형 뒤에 숫자를 붙이면 메모리 영역의 크기를 지정할수있다.

    // int, uint의 데이터 범위를 지정할수 있는 이유는 작업할때 낭비되는 메모리를 줄이기 위해서.
    // 효율적인 데이터 공간 사용 목적
    // 0 ~ 256bit까지 지원을 해준다.

    // 예 )
    // int8 == -128~127;
    // uint8 = 0 ~ 255;

    // 상수를 관리하기 위한 데이터 타입
    // 개발할때 가독성
    enum State {
        Pending, // 0
        Accapted, // 1
        Rejected, // 2
    }

    State _state;
    // 초기값은 0

    function get() public view returns (State){
        return _state;
    }

    function get(State state) public {
        _state = state;
    }

    function endGame() {
        get(State.Rejected);
    }

    // string 문자열 자료형
    string Str = "hellow sol";
    // 해시값을 다룬다.

    // address 주소형
    // 주소의 형태가 맞는지
    // 주소의 크기는 20바이트 크기의 자료형 계정의 주소를 저장할때 사용하는 변수
    // 배포자 주소 같은 내용을 저장도 하고. 컨트랙트 실행자의 주소를 담을때도 사용한다.
    // address 상태변수에 배포자 계정 주소를 저장한다.
    // 배포자만 실행해야하는 내용을 게임을 만들었는데 컨트랙트에 이더가 쌓이고
    // toBalanceWallet CA에 쌓여있는 이더를 회수하는 메서드

    // msg.sender == 메시지보낸사람(EOA -> CA1(sender EOA) -> CA2(sender CA1) )
    // sender.transfer("보낼 금액")
    // msg.sneder == 트랜잭션이나 메시지를 발생시킨 주소.
    //

    // 배열의 타입
    string[] strArr = ["1","2","3"];

    // 배열의 타입
    // 크기지정
    string[2] strArr = ["1","2"];

    // 사용자 타입 정의 객체
    struct Sturct {
        string name;
        uint number;
    }

    // 매핑 자바스크립트의 객체 라고 보면 편함..
    // 매핑을 잘사용하면 가스비를 절약할수있다.
    // 데이터가 많을때 사용할시에..
    mapping( address => uint256 ) tokens;

    tokens : {
        0xseilfjslijgiljeslifgj : 10000
    }
    // 객체의 내용
    // address 키의 타입  key
    // uint256 값의 타입  value

    mapping(string => mapping(address => uint256)) token2;
    token : {
        account1 (string) : {
             0xselijflisdjfilyasj(address) :  100 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
        },
        account1 (string) : {
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
             0xselijflisdjfilyasj(address) :  16516541651 (uint256),
        }
    }

    // 글로벌 변수
    function a() {
        // block 전역 변수
        block.coinbase // 현재 블록을 채굴한 account의 주소
        block.difficulty // 현재 블록의 난이도
        block.gaslimit // 현재 블록의 사용 가능한 최대 gas 값
        block.number // 블록의 높이
        block.timestamp; // 블록의 생성 시간.
        // block의 값은 블록 생성되면 변하죠?.
        // 트랜잭션을 생성해서 매서드가 호출되는 시기도 ?. 블록 생성될때
        // 이 값을 이용해서 랜덤한 값을 구할수 있다.

        // msg 컨트랙트에서 message를 받았을때 메시지의 정보를 가지고 있는 객체
        msg.sender; // 컨트랙트의 호출 계정 주소
        msg.value; // 메시지로 전달받은 이더 wei 단위로 넘어온다.
        msg.data; // 컨트랙트 sned로 트랜잭션 보낼때 담아서 보낸 데이터 내용.
        msg.sig; // 어떤 메서드 호출을 요청했는지. 전달받은 데이터의 첫 4 바이트 === 메서드의 명

        // 주소 타입 추가 설명
        // address
        address _to;
        _to = msg.senderm;
        _to.balance; //, 이 계정의 잔액
        uint amount = 10 ** 18;
        uint _eth = 1 ETH;
        _to.transfer(amount) // 이더를 해당 주소에 전송
    }

    // 함수의 내용
    // 함수의 구조
    function name (uint a) view public returns(uint){

    }

    // name : 함수명
    // uint a : 타입과 매개변수 이름
    // public : 함수의 접근자
    // 접근자의 타입
    // 1. public : 외부에서 호출이 가능한 메서드 다른 CA 계정에서 호출 가능 ㅎㅎ
    // 2. private : 현재 컨트랙트에서만 호출이 가능, 상속해도 안됨X
    // 3. Internal : 내부 함수는 컨트랙트에서 접근 할수 있고, 외부X CA주소만 참조한게 아니라. 컨트랙트를 상속 받은 겅유에는 호출이 가능하다. 자식 클래스와 비슷한 느낌
    // 4. External : public이랑 같음

    // 접근자의 타입
    // view의 부분을 채울 지정자들. 종류
    // 1. view : 상태변수 읽기전용 변경은 불가능하다.
    // 2. pure : 상태변수 참조를 할수가 없다. 말그대로 순수하게 전달받은 매개변수 또는 함수 내부 선언값을 가지고 연산의 내용만 받고싶은 경우
    // 3. payable : 결제를 처리할 수 있는 지정자. 이 속성이 있어야지만 이더를 보내거나 받을수 있다.

    // 조건문으로 사용된다. 가스비 반환
    require("조건문")
    // 조건문이 잘 실행되면 통과
    // 자바스크립트의 내용을 비유해보면
    // if("조건문") throw new Error("reject")

    // 컨트랙트 배포자가
    // 계약이 맘에 안들어서

    // 컨트랙트 배포자가 맞는지 검사
    address _address;
    require(msg.sender ==  _address)
    selfdestruct("CA 주소"); // 매개변수
    selfdestruct("계정 주소"); // 매개변수
    // 계약을 파기하고
    // 현재 계약을 파기하고 싶어.
    // 전달한 주소로 파기한 CA에 있는 이더를 보내준다.

```
