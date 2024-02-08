# 컨트랙트의 업그레이드

# Proxy Contract 패턴

- 블록체인
- 바이트 코드를 네트워크로 보내게되면
- CA -> block의 트랜잭션의 내용으로 기록되고 == 배포된 컨트랙트의 주소
- CA 계정의 내용은

```json
CA {
    "account" : "0x123",
    "nonce" : "transcionCount",
    "stroageRoot" : "state", // proxy 다른 로직의 컨트랙트를 대리 호출해서 상태 변경
    "codeHash" : "byteCode" // proxy의 대리 호출을 다른 컨트랙트로 요청
}
```

# hashcode : 해시값의 4자리가 식별자

# Proxy

- client -> proxy -> backend
- backend -> proxy -> client

- client - > proxy Contract(대리 호출) -> 사용할 Contract
- proxy의 상태가 업데이트 된다. -> client에게 전달 할수 있음.

- proxy Contract

# 목적 Proxy Contract의 중요성

- 블록체인의 불변성이 장점인데
- 컨트랙트를 배포하게되면 이후에 변경이 불가능하다.
- 그래서 배포한 컨트랙트가 문제가 있을경우 수정이 불가능한데
- 그래서 사용하는 패턴중의 하나가 proxy 패턴이다.
- 상태는 proxy의 상태값을 보관하고
- 로직부분은 대리호출을 담당할 컨트랙트

# proxy Contract의 로직을 작성을 해보기위해

- EVM은 Stack Machine이라고 하고
- 스택 머신은 즉 push -> pop이 가능한 데이터 구조를 가지고 있다.
- evm은 opcode는 last in first out (LIFO)의 데이터 구조다.
- 1 2 더해주셈
- 3

# 고숙련자용 고수들

- opcode의 내용을 솔리디티 파일에 직접 작성을 해볼수 있는데
- assembly 구문을 사용해서 low level 언어로 코드 작성을 가능하게 할수 있다.
- 메모리나 스토리지에 직접 접근이 가능하다.
- 메모리도 효율적으로 다룰수 있고 수학적 연산이나 암호화 부분의 로직을 다룰때 작성한다.
- 가스비 절감의 장점도 가지고 있다.

- 메모리에 접근을 하기 위해서 proxy Contract를 작성할때 사용을 해볼것.

```javascript
1 2 ADD
```

```javascript
contract ADDTest {
    function add () public {
        assembly {
            // assembly에 작성할 코드 블록
            // 변수 생성
            // add === opcode
            // 메모리의 주소로 값을 할당
            // let == 자바스크립트 아님
            let result := add(1, 2);
            // mstore 변수를 주소에 저장한다.
            // 컨트랙트의 메모리의 영역에 저장
            mstore(0x0, result);
            // 0x0 주소에 있는 32 bytes를 반환한다.
            return(0x0, 32);
        }
    }
}

```

```sh
# 산술
ADD(더하기), SUB(빼기), MUL(곱하기), DIV(나누기), MOD(나머지)
# 데이터
CALLDATACOPY, CODECOPY
# 생성이나 호출
CREATE, CALL, CALLCODE, DELEGATECALL, STATICCALL
```

# 컨트랙트

```javascript
contract Count {
    uint pubick count = 0;
    function increment () public {
        count += 1;
    }
}
```

# count 컨트랙트 배포

- CA : 0xjslijfliwjliejlfi
- 컨트랙트의 주소

# count를 감소 시켜줘 (회사에서)

- 컨트랙트의 변경이 불가능함.. ㅠㅠ

# 대응 proxy Contract로 전환하자.

```javascript
contract Proxy {
    // implementation == CA 주소
    // 대리호출을 요청할 컨트랙트 => 즉 로직을 담당해줄 컨트랙트의 주소다.
    address public implementation;
    uint count = 5 // 버전업이 되도 상태는 유지가 된다.
    constructor(address _implementation) {
        // 첫번째 버전의 컨트랙트가 초기에 상태변수
        implementation = _implementation;
    }

    // recive() : transfer() === 이더를 보냈을때
    // fallback() : 메시지를 받았을때 그리고 메서드명이 매핑이 안될때
    // Proxy Contract에는 메서드가 없음.. 로직을 담당하지 않는다.
    // 바라보고 있는 CA로 대리호출을 요청한다 식별자를 가지고 4자리
    // client는 proxy 컨트랙트가 count 컨트랙트라고 알고있고
    // abi도 count abi를 사용해서 메서드를 요청하고 있는 중.
    // increment 메서드의 명을 해시값으로 요청을 보내면
    // proxy Contract 에서 요청을 받았을때 메서드가 없어서ㅣ
    // fallback이 호출이 된다.

    // external 필수다.
    // 컨트랙트 내에 하나만 존재할수 있다.
    fallback() external payable {
        // CA주소가 있는지 먼저 확인
        require(implementation != address(0));
        // assembly 구문 작성 이유는 메모리 참조 메모리 복사 대리호출을 하기위해서ㅣ
        assembly {
            // calldatacopy == msg.data를
            // 메모리의 0의 위치부터
            // 시작하는 메모리의 영역부터 복사를 시작
            // 얼마나 데이터를 복사할건지 calldatasize 호출해서 데이터의 크기를 확인하고

            // 호출한 함수의 데이터를 복사해놓는다. 메모리에 가지고 있는다.
            calldatacopy(0, 0, calldatasize())

            // delegatecall 대리호출 요청
            // CA한테 로직을 실행시켜줘 라고 요청 보냄
            // 대리호출을 할때 상태는 proxy의 상태를 가지고 요청을 보내고
            // 로직을 위임한다. 로직을 맡긴다. CA로 요청을 보내서
            // gas() == 트랜잭션을 처리할수 있는 남은 가스량(블록의 처리 가능한 가스량)
            // implementation == 로직을 대리호출할 CA의 주소
            // 0, calldatasize() == 복사해놓은 데이터 즉 로직 부분
            // 0, 0 반환값의 위치와 반환값의 크기 우리는 사용 안하기때문에 0,0
            // 반환될 데이터의 크기를 모를경우 0 주면 된다.
            let result := delegatecall(gas(), implementation, 0, calldatasize(), 0, 0);

            // 대리호출한 이후 대리 호출한 컨트랙트의 반환데이터를
            // 메모리 0번 위치에 데이터의 시작점부터 사이즈만큼 복사
            returndatacopy(0, 0,returndatasize());

            // switch
            switch result
            // 정상적으로 호출이 안된경우
            // 정상적으로 호출이 되면 1의 값이 반환된다.
            case 0 {
                // 복사해놓은 데이터를 반환
                // 오류의 내용이 반환 된다.
                revert(0, returndatasize());
            }
            default {
                // 정상적으로 처리가 되면 proxy의 상태변수가 반환값으로 업데이트가 되고
                return(0, returndatasize());
            }
        }
    }
    // client -> proxy(increment) -> fallback(msg.data) -> CA 요청이후 반환값에 따라 -> proxy의 상태값이 변한다.
   function setImplementation (address _CA) public {
        implementation = _CA;
   }
}
```

# 컨트랙트의 버전을 올리자 버전업

```javascript
// 버전 2 카운트
contract Count {
    uint public count = 0;
    function increment() public {
        count += 1;
    }

    // 새로운 버전에는 감소가 생겼습니다 ㅎㅎ
    function decrement() public {
        count -= 1;
    }
}
// 이 컨트랙트를 배포
// 새로운 CA
// proxy setImplementation(새로운 CA)
// proxy -> decrement() 호출 fallback 호출 되고 -> count 감소
```

```sh
remixd -s . --remix-ide https://remix.ethereum.org
```