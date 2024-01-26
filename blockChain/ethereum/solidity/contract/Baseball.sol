// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Baseball {
    // 컨트랙트 소유자
    // 상태변수로 관리

    // 컴퓨터가 숫자 3개를 랜덤하게 뽑고
    // 이 숫자를 유저들이 맞추면 보상을 받는 게임
    // 참가비로 이더를 내고
    // 숫자를 입력하고 값을 비교하고 틀리면 보상을 못받고 이 유저가 보낸 이더는 CA에 잔액으로 전송받는다.
    // CA는 유저가 게임을 하면서 모인 이더를 최종적으로 정답을 맞춘 유저에게 모여있는 이더를 모두 보상으로 준다.
    // 게임의 플레이 횟수가 있는데 유저가 플레이 할때마다 횟수가 올라가고.
    // 10회 게임을 할수 있는데 10회가 끝나면 다음게임으로 넘어간다. 유저가 못맞추면 컨트랙트 배포자가 먹음.

    // 컨트랙트 배포자
    address private owner;

    // 게임의 횟수
    // constant 구문을 추가하면 상태를 변경 하지 않는 상태 변수
    // 자바스크립트 const구나?
    uint256 private constant GAME_COUNT = 10;

    //  ticket 게임을 하고싶으면 금액을 지불해
    uint256 private ticket = 10000000000000000; // 이더 단위

    // 정답의 값을 담아놓을 상태 변수
    // 3자리의 숫자
    uint256 private random;

    // 게임의 현재 진행 횟수
    uint256 private progress;

    // 총 모여있는 상금(이더를 정수로 표현해서 담을 상태 변수)
    uint256 private reword;

    // 게임의 상태를 관리하자.
    enum GameState {
        playing, // 0
        gameOver // 1
    }

    // 최초의 상태 선언
    GameState gameState; // 0

    // 컨트랙트가 배포되고 생성단계에서 한번 호출되는 메서드
    constructor() {
        // 최초에 메시지 보낸사람은 배포자겠죠?
        owner = msg.sender;

        // keccak256 : 솔리디티에서 랜덤값을 뽑을때 사용 매개변수를 해쉬값으로 변경해준다 SHA-3
        // block
        // abi.encodePacked : 매개변수로 전달된 내용들을 가지고 바이트 배열로 만들어준다.
        // 타입으로 값을 생성하겠다.  타입 뒤에 괄호에 내용을 포함 시키면 해당 타입으로 변수 생성
        // address()
        random = uint256(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    block.difficulty,
                    block.coinbase,
                    block.number
                )
            )
        );
        // 큰 숫자가 나오는데
        // 랜덤값을 구하기가 힘들어 ㅠㅠ.. 어떻게 표현하지
        // 큰숫자에서 나머지 연산을 통해서 원하는 자리수의 숫자를 구하자.
        // 100 ~ 999 까지의 숫자 범위를 구하고싶어
        random = (random % 900) + 100;
        // 100 ~ 999 범위의 랜덤 값.
    }

    // 유저의 값을 받아서 정답인지 비교
    function gameStart(uint256 _value) public payable {
        // 게임 진행중 체크
        require(progress < GAME_COUNT, "GameOver");
        // 게임을 진행하는데 티켓 금액을 지불했는지
        require(msg.value == ticket, "ticket amount error (5 ether)");
        // 정답을 맞추면서 숫자의 범위를 맞게 전달했는지
        require((_value >= 100) && (_value < 1000), "_value error (100 ~ 999)");

        // 게임을 정상적을 진행
        // 게임의 횟수 증가
        progress += 1;

        if (_value == random) {
            // 게임 끝 정답자 발생
            // this == CA 주소
            // 이 CA가 컨트랙트가 이더를 보상줄만큼 가지고 있는지 체크
            // address(this).balance == 컨트랙트가 가지고 있는 이더량
            require(reword <= address(this).balance);
            // payable 이더를 전송 혹은 전달 할수 있는 address 타입을 만든다.
            //  payable(msg.sender).transfer(address(this).balance);
            // msg.sender에게
            // 컨트랙트의 잔액을 모두 송금
            payable(msg.sender).transfer(address(this).balance);
            // 보상 초기화
            reword = 0;
            // 게임 종료 상태로 변경
            gameState = GameState.gameOver;
        } else {
            // 정답을 못맞추면 티켓값을 CA 보상을 증가시킴
            reword += msg.value;
        }
    }

    // 쌓여있는 보상을 확인할수 있는 메서드
    function getReword() public view returns (uint256) {
        return reword;
    }

    // 게임의 진행도 조회
    function getProgress() public view returns (uint256) {
        return progress;
    }

    // 티켓의 가격을 조회
    function getTicket() public view returns (uint256) {
        return ticket;
    }

    // 어드민만 조회 가능한 메서드
    function getRandom() public view returns (uint256) {
        require(address(msg.sender) == owner, "owner error");
        return random;
    }

    // 게임중인지 확인할 함수
    function getPlaying() public view returns (uint256) {
        uint256 Playing = 0;
        if ((gameState != GameState.playing) || (progress == GAME_COUNT)) {
            // 게임이 끝났다.
            Playing = 1;
        }
        return Playing;
    }
}
