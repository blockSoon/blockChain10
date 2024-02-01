// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "../../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

// 소유권과 권한 위임을 담당할 컨트랙트
// 소유권 이전
contract soonNFT is ERC721 {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    // 각각의 고유한 토큰의 경로를 상태변수로 관리
    // 각각의 nft의 내용이 다르게 보일건데 경로를 저장할 상태변수
    mapping(uint256 tokenId => string tokenURI) _tokenURIs;

    // 각각의 토큰의 고유한 값은 우리 인덱스 증가로 만들어보자
    uint256 totalSupply = 0;

    function minting(string memory tokenURI) public {
        // 지금 생성되는 토큰의 아이디를 키로 값을 업로드한 json파일의 경로를 넣어준다.
        _tokenURIs[totalSupply] = tokenURI;
        /*
        https://pianta/ == baseURL 이후에 붙을 경로 상태변수로 저장
        {
            0 : QmfGZNpUwfuL9TJFzdNdez9EMQjSrzhtQ2Uu5Xz7xSQXD4
            1 : QmWFxNgUYWAVyZoPunachEesUaPhYPR337cWPUzznX7thx
            2 : QmZAcUhC89DxtLahPMUzczKP3AKHP6WqF9minny4Kn8ExH
        }
         */
        /*
            tx = {
                from : account
            }
            // EOA -> CA === msg.sender === 0x1
            // EOA -> CA1 -> CA2 === msg.sender === CA1
        */
        _mint(msg.sender, totalSupply);
        // 토큰 생성되는데 트랜잭션 발생시킨 계정이 소유자가 된다.
        /*
        {
            0 : msg.sender(0x1)
            1 : msg.sender(0x1)
        }
        */
        totalSupply += 1;
    }

    // override해서 사용하는 이유는 호환성 문제
    // 함수의 해시 식별자 4자리로 함수를 식별해서 호출합니다.
    // 이더스캔 해시식별로 보여주기때문에
    // CA == to = null = CA컨트랙트 배포한건가보다.
    // input의 값에 해시 앞자리 4 == ERC721 == 0x6080

    // nft를 조회했을때 실행되는 메서드
    // json파일의 경로를 반환 해주는 메서드
    // baseURL에 붙는 해시 주소.
    function tokenURI(
        uint256 _tokenId
    ) public view override returns (string memory) {
        return _tokenURIs[_tokenId];
    }

    function _baseURI() internal view override returns (string memory) {
        // pinata의 baseURL을 넣을것.
        return "https://copper-wrong-haddock-919.mypinata.cloud/ipfs/";
    }
}
