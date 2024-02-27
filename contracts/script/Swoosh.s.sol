//SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;
import "forge-std/Script.sol";
import "../src/Swoosh.sol";
import "../test/TestERC20.sol";
contract SwooshScript is Script {
    function run() external {
        vm.startBroadcast();
        TestERC20 erc20 = TestERC20(0x42f243d53e2368A8e6d3C8E1eA97dBC7889377f1);
        // erc20.mint(address(0x790914B66Aa57cCdA5596Da83B98c94700ECbF04), 2000 * 10 ** 18);

        // erc20.mint(address(0x31d5a8709bE7f3cE42efc21A72718acf1D57a890), 2000 * 10 ** 18);
        Swoosh swoosh = Swoosh(0x39A23022abF01500ae70B0c1774D41525A266c0C);
        // // swoosh.deposit{value: 0.3 * 10 ** 18}();
        address[] memory from = new address[](1);
        from[0] = address(0xcfbC6d2ed767EA76ceD4518e16DeA8B6996B88Aa);
        // from[1] = address(0x31d5a8709bE7f3cE42efc21A72718acf1D57a890);
        // erc20.approve(address(swoosh), 10000 * 10 ** 18);
        // swoosh.deposit(5000 * 10 ** 18);
        // swoosh.deposit{value: 0.1 * 10 ** 18}();
        swoosh.request(from, 0.001 * (10 ** 18), "Uber to EthDenver", "https://pbs.twimg.com/profile_images/1754347069534359552/SB3kuTBl_200x200.jpg");
        swoosh.request(from, 30 * (10 ** 18), "Uber", "");
        swoosh.request(from, 30 * (10 ** 18), "IFKYK", "");
        swoosh.request(from, 30 * (10 ** 18), "tee hee hee", "");
        swoosh.request(from, 30 * (10 ** 18), "Taco", "");
        swoosh.request(from, 30 * (10 ** 18), "Chinese", "");
        swoosh.request(from, 69 * (10 ** 18), "luv yall", "");
        swoosh.request(from, 0.001 * (10 ** 18), "Uber to EthDenver", "https://pbs.twimg.com/profile_images/1754347069534359552/SB3kuTBl_200x200.jpg");
        swoosh.request(from, 30 * (10 ** 18), "Uber", "");
        swoosh.request(from, 30 * (10 ** 18), "IFKYK", "");
        swoosh.request(from, 30 * (10 ** 18), "tee hee hee", "");
        swoosh.request(from, 30 * (10 ** 18), "Taco", "");
        swoosh.request(from, 30 * (10 ** 18), "Chinese", "");
        swoosh.request(from, 69 * (10 ** 18), "luv yall", "");

    }
}