# factory contract

- 스마트 컨트랙트에서 컨트랙트를 배포하는 로직을 작성 하는 컨트랙트
- 우리가 공장에서 규칙에 맞는 제품을 생산하는 것과 동일하게 규칙이 있는 인스턴스를 생성하는 패턴

- 예시

```javascript
import "./ERC721.sol";

contract FactoryNFT {
    // 컨트랙트 생성 메서드
    // ERC721의 인스턴스를 생성
    // external 가스비를 줄이기 위해서 제한자를 잘 사용하는것이 중요
    // 가스비를 줄이는 방법은 코드의 재사용을 높이고 코드의 복잡성 감소
    // 상태변수의 접근을 최소화

    function createContract (string memory _name, string memory _symbol) external {
      // 이미 배포 되어있는 인스턴스에 접근할때 주소로 접근하면 해당 인스턴스에 접근을 할수 있었는데.
      // ERC721 newNFT = ERC721(address);
      // new 키워드로 새로운 컨트랙트 생성
      ERC721 newNFT = new ERC721(_name, _symbol);

      // 뭔가 내용을 확인하고 싶다면 이벤트를 활용하자. log
      emit createEvent(newNFT, msg.sender);
      // newNFT : CA 배포된 컨트랙트의 주소
      // msg.sender : createContract 함수 호출자 및 컨트랙트 배포자.
      // 트랜잭션의 log에 이벤트의 내용이 보인다.
    }

    event createEvent(address _address, address _owner);
}

```

1. 스마트 컨트랙트의 DAO

- DAO 란?

### 분산 자율 조직

- DAO는 중앙 집권식이 아닌 탈중앙화 조직의 규칙 운영을 컨트랙트에 작성해서 컨트랙트에 의해 관리된다.
- 조직의 멤버들의 투표로 의사 결정이 이루어진다.
- DAO의 특징 4가지 요소 분산화, 투명성, 자율성, 저항성 등 탈중앙화 운영의 멤버들로 투표와 규칙을 컨트랙트에 작성하고
- 기록된 내용은 공개적으로 누구나 조회할수 있고 검증할수 있다. 중앙 집권의 제어 없이 컨트랙트에 작성한 내용으로 투표가 진행된다. 외부의 제안 x 투명한 투표

### DAO의 이점

- 중앙 집권식 관리가 아님 조직원들의 투표로 운영되는 방식
- DAO는 멤버들의 거버넌스에 참여할 권리를 토큰으로 증명 토큰의 갯수에 따라 투표권을 가지게 된다.
- 투표권을 가진 참여자들이 투표를 진행 한뒤
- 참여자들은 컨트랙트의 규칙에 따라 방향성에 따라 자금을 제안에 사용하거나 제안을 시행하거나
- 승인 또는 거부를 진행 할수 있다.

# DAO의 진행

- 제안
- 멤버
- 제안(투표 시스템)
- 제안(유예)
- 실행(다수결, 제안 실행)

2. factory 컨트랙트 구현

- 제안 하나가 컨트랙트로 구성이 되고
- 제안을 관리하는 factory 컨트랙트가 있고
- DAO컨트랙트를 생성 및 관리 하는 인스턴스가 될 것.

# 컨트랙트의 보안의 문제

### THEDAO

- 재진입 공격 스마트 컨트랙트에서 위험한 내용
- 공격자가 컨트랙트의 메서드를 예측하지 못한 순서로 재귀적으로 호출을 해서 발생하는 문제점.
- 상태 변수의 변경이 이루어 지기전에 호출을 하는 경우 상태변수 변경이 되지 않은 상태에서 추가 작업이 이루어 질수 있다.(예측하지 못한 오류)

- 외부 컨트랙트에서 호출할때 발생할 확율이 높다.

- the dao 공격은 공격자가 DAO 컨트랙트에 이더를 출금하는 메서드를 재귀적 요청을 통해 이더를 탈취했다. 상태 변경이 이루어 지기전에 여러번 호출이 되어서 문제였던것.

# checks-effects-interactions 패턴

- 단계 별로 코드를 작성 -> checks(검증) -> effects(컨트랙트 상태 변경) -> interactions(외부 컨트랙트 호출) 순서에 맞게 코드를 작성 하는 디자인 패턴
- 어려워 보이지만 내용은 그냥 조건문 먼저 검증하고 상태 변환하고 외부 컨트랙트 호출해라 CA1 -> CA2
- CA1의 상태변수를 먼저 변경하고 CA2의 호출을해서 CA2의 상태변수를 변경하거나 이더를 전송해라.
- 내부 컨트랙트의 상태 업데이트 -> 외부 컨트랙트 상태 업데이트 및 호출
- 외부 컨트랙트의 transfer 등의 메서드는 CA1의 상태가 모두 잘 먼저 업데이트를 하고 CA2(외부 컨트랙트) 에서 호출해라 그래야 재진입 공격을 대비할수 있다.

```javascript
// 패턴을 사용해서 예시를 작성해보자.
// 예시)
// 입금이 되고 출금이 됨 (이자)
// CA주소로 EOA계정이 입금했을때 recive 메서드
// myBank === CA1
// interest === CA2
import "./myInterset";
contract myBank {
    // 누가 입금 얼마했는지
    mapping(address => uint) balances;
    // 외부 컨트랙트와 상호작용을 하기 위해 컨트랙트의 주소를 가지고있자.
    myInterset _myInterset;
    constructor(address _CA){
        _myInterset =  myInterset(_CA);
    }

    // 이더 입금
    recive() payable {
        // 누군가 CA주소로 이더를 입금하면 발생되는 메서드
        // msg.sender 이더 보낸사람 from
        // msg.value 이더를 얼마 보냈는지
        // 컨트랙트에 이더를 보냈으니까 입금임
        // 상태변수에 기록을 해놓자
        balacnes[msg.sender] += msg.value;
        _myInterset.setInterest(msg.sender, msg.value);
    }
    // 이더 출금
    function ethOut (uint _amount) payable {
        // 출금 부분 민감..
        // 이중 출금이 되면 안됨
        // checks : 출금하기전에 검증
        require(balances[msg.sender] >= _amount);

        // effects : 출금 가능하면 이제 호출자의 잔액의 상태변수 변경
        balances[msg.sender] -= _amount;

        // interactions : 이더 전송을 통한 상호작용 및 외부 상호작용
        // address payable : 이더를 보내거나 받을때
        address payable(msg.sender).transfer(_amount);
        // 외부 컨트랙트 호출도 인터렉션 부분에서
        _myInterset.getInerest(msg.sender);
    }

    // 내 이더 금액 조회
    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }
}

contract myInterset {
    mapping(address => uint) balances;
    // 총금액 입금한거 얼마인지 알고 이자를 주려고
    function setInterest (address owner, uint _balance) external {
        balaces[owner] += _balance;
    }

    // 총금액의 몇퍼센트를 이자로 주자.
    function getInerest (address owner) external payable {
        // 이자의 이더를 출금자에게 전송
        uint interest = balances[owner] / 10;
        // 이자 이더 전송
        address payable(owner).transfer(interest);
    }
}
```

### 목적

- 외부 컨트랙트의 호출을 할때 재진입 공격을 방지하기위해 사용하는 패턴

### 순서

- 내부 컨트랙트 (상태변수 변경 완료) -> 외부 컨트랙트 호출

# 뮤텍스 패턴 (재진입 공격 방지를 위한 가드 추가)

- 재진입 공격이라는건 상태변수 변경 전에 메서드를 재귀적으로 호출해서 문제가 생기는것.
- 값을 가지고 값에 따라 실행중이면 메서드의 호출을 방지 하는것.
- 방법은 저렴하고 간단함 bool값으로 true 및 false의 값을 판단해서 메서드 호출을 막음

```javascript
// 예시
contract myBank {
    mapping(address => uint) balances;
    bool private lock;
    constructor(){
        lock = false;
    }

    // 출금
    function ethOut(uint _amount) payable{
        // lock 변수 확인 false인지 실행중인지.
        require(!lock);
        // checks
        require(balances[msg.sender] >= _amount);
        // 여기서 실행중 상태변수 업데이트
        lock = true; // 스위치 온

        // effects
        balances[msg.sender] -= _amount;

        // interractions
        address payable(msg.sender).transfer(_amount);

        // 메서드의 제일 마지막 부분에
        // 스위치 오프
        lock = false;
    }
    //
}

```

### 목적

- 해당 컨트랙트에 재귀적으로 호출될수 있는 공격을 방지
- 메서드 실행 부분에 방지 가드의 조건을 상태변수의 값으로 방지해서 재진입 방지.

### 컨트랙트 가스비 절약을 위해 새로운 문법

### 조건 논리 제어자 사용

- 조건문의 재사용성을 높일수 있다.

# 작성법

```javascript
modifier onlyOwner() {
    // 배포자인지 확인
    require(msg.sender == owner);
    // 본문의 내용을 배치 어떻게 하지?.
    _; // 본문의 위치 표시는 _; 구문으로 한다.
}

// 가스비 절감
function ownerMinting() public onlyOwner {
    _mint(msg.sender, 10000 * (10 ** 18));
}

// --- >  코드가 실행되는 구문 위의 내용으로
function ownerMinting()public {
    require(msg.sender == owner);
    _mint(msg.sender, 10000 * (10 ** 18));
}

// 매개변수 사용하는 경우
modifier onlyOwner(address _owner){
    require(_owner === owner);
    _;
}

function ownerMinting(address sender) public onlyOwner(sender) {
    _mint(msg.sender, 10000 * (10 ** 18));
}

```

# DAO의 숙제

- DAO는 탈중앙화 조직의 자유도가 높다.
- 법적인 문제를 통과하는 제안들이지 않기 때문에 법적으로 인정 해주지 않는다.

### 실습 내용

1. factory 컨트랙트(컨트랙트 생성과 생성된 컨트랙트 주소 조회)
2. DAO의 내용 추가(멤버 소집, 제안 내용, 투표 진행, 투표 결과 확인) 여기서는 자금 X

```sh
remixd -s . --remix-ide https://remix.ethereum.org
```
