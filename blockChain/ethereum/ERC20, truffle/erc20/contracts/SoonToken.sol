// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SoonToken is ERC20 {
    // 상속받은 컨트랙트의 생성자 함수 호출
    // 부모 컨트랙트의 생성자 호출
    constructor(string memory name, string memory symbol, uint value) ERC20(name, symbol) {
        // 배포자가 초기에 얼마만큼의 토큰을 발행할건지.
        _mint(msg.sender, value * (10 ** decimals()));
    }
}
