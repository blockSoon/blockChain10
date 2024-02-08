// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Count {
    uint public count;

    function increment() public {
        count += 1;
    }

    function decrement () public  {
        count -= 1;
    }
}
