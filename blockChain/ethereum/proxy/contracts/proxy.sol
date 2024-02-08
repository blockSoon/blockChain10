// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Proxy {
    // bytes32 string 보다 작은 데이터를 메모리를 효율적으로 사용할때
    // 고정의 해시 데이터를 담을경우
    // constant === const 상수의 데이터를 담아 놓을때.
    // keccak256 해시화
    // 음수로 떨어질수가 없음 값이 있는지 확인하는것 없으면 0이니까 -1을 할수 없음.
    // 우리가 CA주소를 체크할 내용.
    bytes32 public constant IMPL_SLOT = bytes32(uint(keccak256("IMPL")) - 1);

    // 이 proxy 컨트랙트의 배포자
    // CA 배포자가 CA를 변경해주는 로직을 업그레이드 해주는 역활은
    // proxy 컨트랙트의 배포자가 담당을 해야함.
    bytes32 public constant ADMIN_SLOT = bytes32(uint(keccak256("admin")) - 1);

    // 컨트랙트의 슬롯 메모리 공간
    // 메모리 공간의 값을 참조한다. 슬롯에 접근해서

    constructor() {
        setOnwer(msg.sender);
    }

    modifier onlyOnwer() {
        require(msg.sender == getOnwer());
        _;
    }

    function getOnwer() private view returns (address) {
        return Slot.getAddressSlot(ADMIN_SLOT).value;
    }

    function setOnwer(address onwer) private {
        // Slot.getAddressSlot(ADMIN_SLOT) === 메모리 주소
        // AddressSlot 객체의 값에 onwer
        Slot.getAddressSlot(ADMIN_SLOT).value = onwer;
    }

    function getImpl() private view returns (address) {
        return Slot.getAddressSlot(IMPL_SLOT).value;
    }

    function setImpl(address _CA) public onlyOnwer {
        // CA값을 담아놓을 메모리 공간
        Slot.getAddressSlot(IMPL_SLOT).value = _CA;
    }

    function getAdmin() external view returns (address) {
        return getOnwer();
    }

    function getEImpl() external view returns (address) {
        return getImpl();
    }

    function delegate(address impl) private {
        assembly {
            // 메시지 함수 호출 내용 복사하자
            calldatacopy(0, 0, calldatasize())

            let result := delegatecall(gas(), impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())

            switch result
            case 0 {
                revert(0, returndatasize())
            }
            default {
                return(0, returndatasize())
            }
        }
    }

    fallback() external payable {
        delegate(getImpl());
    }

    receive() external payable {
        delegate(getImpl());
    }
}

// 컨트랙트를 작성할때 자주 사용하는 기능을 정리해놓는 라이브러리
// 코드 모듈화
library Slot {
    struct AddressSlot {
        address value;
    }

    // pure 상태변수 접근 X 연산만 본인의 메모리로.
    // internal 상속 받은 컨트랙트에서 호출 가능.
    function getAddressSlot(
        bytes32 _slotAddress
    ) internal pure returns (AddressSlot storage pointer) {
        assembly {
            // 주소를 참조
            // 메모리 주소를 반환해줌 메모리의 주소값을 얻기 위해서 사용.
            // slot 메모리 공간
            // 메모리 공간.
            // storage.slot은 메모리의 주소
            // 메모리의 공간에
            pointer.slot := _slotAddress
        }
    }
}
