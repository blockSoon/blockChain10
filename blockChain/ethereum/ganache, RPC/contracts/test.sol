// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    // 상태 변수 탈중앙화 데이터
    uint256 private value;

    function setValue(uint256 _value) public {
        // 상태변수 전환
        value = _value;
    }

    function getValue() public view returns (uint256) {
        return value;
    }
}