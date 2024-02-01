// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 판매하는 내용을 담당활 컨트랙트
contract SaleNFT {
    ERC721 public _nft;

    // EOA -> CA(SaleNFT) -> CA(ERC721)

    constructor(address nft) {
        // 이미 배포한 컨트랙트의 주소를 넣고 ERC721 인스턴스를 생성하게되면
        // CA -> CA에게 메시지를 보낼수 있다.
        _nft = ERC721(nft);

        // 해당 컨트랙트에 요청을 보낼수있는 인스턴가 생성이된다.
    }

    // web3에서 getblock을 호출
    // 트랜잭션 내용에서 input조회해서 앞자리 확인한뒤에 맞으면
    // 트랜잭션의 hash로 영수증을 조회
    // CA

    // 데이터베이스에 newblockheaders 라는 이벤트를 구독 해놓게되면
    // 새로운 블록이 생성될때마다 트랜잭션 내용을 확인하고 erc721 배포를 한 트랜잭션이다 input의 앞자리가 6080임?
    // to가 null인지 트랜잭션의 영수증을 조회해서 CA주소를 알아낸다음 데이터베이스에 저장 CA를 가지고 nft내용 조회
    // Account 현재 연결되어있는 account 계정의 트랜잭션들을 조회하면 erc721 배포의 트랜잭션이 포함되어있겠죠?.
    // account가 가지고있는 nft내용을 조회할수있다.
    function AccountGetAllNFT(address[] memory _ca) public {
        // 조건관련된건
        for (uint256 i = 0; i < _ca.length; i++) {
            ERC721 CA = ERC721(_ca[i]);
            // nft의 갯수와
        }
        // 가지고 있는 토큰의 아이디로 nft의 hash주소를 조회해서
        // 프론트 측에서 해시의 주소로 hft의 내용을 보여주면
    }

    // 소유권을 위임받는 내용
    function approveAll(address[] memory _mintCa) public {
        for (uint256 i = 0; i < _ca.length; i++) {
            ERC721 CA = ERC721(_ca[i]);
            CA.setApprovalForAll(msg.sender, true);
            // nft의 갯수와
        }
    }
}
