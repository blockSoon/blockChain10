// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Test is ERC721 {
    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}
    uint tokenId = 0;
    function testing(address[] memory _address) public {
        for (uint i = 0; i < _address.length; i++) {
            ERC721 erc721 = ERC721(_address[i]);
            erc721.setApprovalForAll(msg.sender, true);
        }
    }
    function mint() public  {
        _safeMint(msg.sender, tokenId);
        tokenId++;
    }
}
