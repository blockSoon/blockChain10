// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./DAO.sol";

contract Factory {
    DAO[] private DAOs;

    // 내 조직을 구성하기위한 컨트랙트를 배포
    function createContract() public {
        DAO newDAO = new DAO(msg.sender);
        DAOs.push(newDAO);
    }

    modifier checkLength(uint index, DAO[] memory _dao) {
        // 조회하는 인덱스가의 범위가 배열의 길이의 범위인지 확인
        // 조회가 가능한지 체크
        require(index < _dao.length);
        _; // 메서드의 본문이 들어갈 위치
    }

    function getContract(
        uint _index
    ) public view checkLength(_index, DAOs) returns (DAO) {
        return DAOs[_index];
    }
}
