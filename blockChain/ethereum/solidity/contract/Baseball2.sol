// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Baseball {
    address private owner;

    uint256 private constant GAME_COUNT = 10;

    uint256 private ticket = 10000000000000000;

    uint256 private random;

    uint256 private progress;

    uint256 private reword;

    enum GameState {
        playing,
        gameOver
    }

    GameState gameState;

    constructor() {
        owner = msg.sender;

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

        random = (random % 900) + 100;
    }

    function gameStart(uint256 _value) public payable {
        require(progress < GAME_COUNT, "GameOver");

        require(msg.value == ticket, "ticket amount error (5 ether)");

        require((_value >= 100) && (_value < 1000), "_value error (100 ~ 999)");

        progress += 1;

        if (_value == random) {
            require(reword <= address(this).balance);

            payable(msg.sender).transfer(address(this).balance);

            reword = 0;

            gameState = GameState.gameOver;
        } else {
            reword += msg.value;
        }
    }

    function getReword() public view returns (uint256) {
        return reword;
    }

    function getProgress() public view returns (uint256) {
        return progress;
    }

    function getTicket() public view returns (uint256) {
        return ticket;
    }

    function getRandom() public view returns (uint256) {
        require(address(msg.sender) == owner, "owner error");
        return random;
    }

    function getPlaying() public view returns (uint256) {
        uint256 Playing = 0;
        if ((gameState != GameState.playing) || (progress == GAME_COUNT)) {
            Playing = 1;
        }
        return Playing;
    }
}
