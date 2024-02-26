//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "forge-std/Script.sol";
import "../src/Swoosh.sol";

contract SwooshScript is Script {
    function run() external {
        vm.startBroadcast();
        Swoosh swoosh = Swoosh(0x813722E1244b608a8d60fD5090C68bF6Ac12b602);
        // swoosh.deposit{value: 0.3 * 10 ** 18}();
        address[] memory from = new address[](2);
        from[0] = address(0x21C17F5BD43CD761b6942c286B84334367853eEA);
        from[1] = address(0x5343e0e7460459b284c251A07A26a6dACF0ac20D);

        swoosh.request(from, 0.001 * (10 ** 18), "Uber to EthDenver", "https://pbs.twimg.com/profile_images/1754347069534359552/SB3kuTBl_200x200.jpg");

    }
}