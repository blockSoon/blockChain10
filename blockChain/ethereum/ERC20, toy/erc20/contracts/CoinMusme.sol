// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CoinMusme is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** decimals()));
    }

    // 객체의 구조를 정의하고 사용해보자.
    // 유사 ERC721
    struct Musme {
        string url;
        string name;
    }

    // 이 무스메 빵을 구매한 사람들을 담아놓을 상태 변수 구조 정의
    struct User {
        address account;
    }

    // 무스메 빵을 구매할때 필요한 이더 단위 토큰 금액
    uint256 private tokenPrice = 10 ether;

    // 랜덤한 빵을 뽑을건데
    // 랜덤한 빵의 내용을 배열로 정의해놓자
    string[] musmeName = ["MARBLEX", "GMTEE", "MATIC"];

    // 빵의 이미지내용도 배열로 정의
    string[] musmeUrl = [
        "https://nimage.g-enews.com/phpwas/restmb_allidxmake.php?idx=5&simg=2023101213110602628c5fa75ef8621118012561.jpg",
        "https://f1.tokenpost.kr/2023/09/9los2gk5nt.png",
        "https://cdn.nbntv.co.kr/news/photo/202307/3001043_201513_321.jpg"
    ];

    // 구매한 사람들의 소유권을 가지고 있을 상태 변수
    mapping(address => Musme[]) public musmes;
    /*
        {
            0x1 : [Musme{name, url},Musme{name, url},Musme{name, url},Musme{name, url}]
        }
     */

    // 나중에 상품을 판매하는 컨트랙트를 작성하게 될경우
    // 소유권을 가지고 있는 사람들을 모두 가지고있는 상태변수가 있으면 편하다.
    User[] public users;

    // 한번이라도 빵을 구매한 사람을 담을 상태변수

    // 계정이 가지고 있는 빵을 조회
    function getMusme() public view returns (Musme[] memory) {
        return musmes[msg.sender];
    }

    // 구매를 한번이라도 한 계정 조회
    function getMusmeUser() public view returns (User[] memory) {
        return users;
    }

    // 구매를 진행
    function buyMusme() public {
        // 이 사람이 가지고 있는 토큰의 량이 가격 이상인지
        // 토큰 10개 이상을 소유하고 있는 사람인지
        // 토큰을 가지고 있어야 구매를 가능하게 한다.
        require(balanceOf(msg.sender) >= tokenPrice);
        _update(msg.sender, address(0), tokenPrice);
        // 토큰을 지불한 내용

        // 상품을 주자
        uint random = uint(
            keccak256(
                abi.encodePacked(block.timestamp, block.coinbase, block.number)
            )
        );
        // 엄청큰 임의의 숫자
        random = uint(random % 3); // 0~2까지의 3가지의 랜덤값

        // 상태변수 업데이트 소유권이 생기는 거죠
        musmes[msg.sender].push(Musme(musmeUrl[random], musmeName[random]));

        // 한번이라도 구매한 사람인지 확인
        bool isUser = false;

        for (uint256 i = 0; i < users.length; i++) {
            if (users[i].account == msg.sender) {
                isUser = true;
                break;
            }
        }

        // 한번도 구매 안한 사람은 추가
        if (!isUser) {
            users.push(User(msg.sender));
        }
    }
}
