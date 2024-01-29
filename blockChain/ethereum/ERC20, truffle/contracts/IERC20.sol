// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// 지금 작성하는 코드는 내용을 파악하기 위해서
// 이미 배포되어있는 표준 규칙의 코드를 가져와서 사용을 하기 때문에
// 오픈제플린에서 사용만 하면 되지만 코드를 파악 하고 사용 해야한다.

// 호환성과 보안 이슈등의 이유로 작성되어있는 규칙에 맞는 코드로 작업을 해야한다.

interface IERC20 {
    // 총 토큰의 발행량
    function totalSupply() external view returns (uint);

    // 해당 지갑이 가지고 있는 토큰의 량
    function balanceOf(address account) external view returns (uint);

    // 지갑에서 토큰을 다른 지갑으로 소유권 이전
    // 보내는 사람은 msg.sneder = > 받는 사람 to , 받는 량 amount 토큰의 량
    function transfer(address to, uint amount) external returns (bool);

    /* 
        mapping(address => uint) soontoken;
        soontoken = { 0x1 : 100000 }

        0x1 지갑이 transsfer 실행을 했다
        msg.sender == 0x1 
        0x2지갑에 토큰 50000개를 전달 매개변수로 담아서
        soontoken[0x2] = 50000;
        soontoken[0x1] = 50000;

        soontoken = { 0x1 : 50000, 0x2 : 50000 }
    */

    // 소유권을 위임(대행 업체가 받는다.)
    function approve(address spender, uint256 value) external returns (bool);

    /*
       mapping(address => mapping(address => uint)) allowanceToken
       allowanceToken = {
         0x1 : {
            0x2 : 0
         }
       }

        0x1 걔정이 0x2계정에게 10000개를 위임 받았다.
        allowanceToken[0x1][0x2] = 10000
        allowanceToken = {
         0x1 : {
            0x2 : 10000
         }
       }
    */

    //

    // 얼마만큼 누가 위임을 받았는지
    function allowance(address owner, address spender) external returns (uint);

    // 소유권을 위임받은 사람이 다른 지갑에게 토큰의 소유권을 이전할때
    function transferFrom(
        address spender,
        address to,
        uint amount
    ) external returns (bool);

    // 소유권을 받았는지 확인
    // transfer()
    // 소유권 이전
    // 0x2이 계정이 받은 소유자와 본인이 위임 받은 잔액을 조회하고
    // to의 계정에게 amount 만큼의 보낼 금액으로 상태변수 전환

    // 이벤트 로그를 확인 할수있다.
    // log로 확인을 할수 있다.
    event Transfer(address from, address to, uint value);
    event Approval(address from, address spender, uint value);
}
