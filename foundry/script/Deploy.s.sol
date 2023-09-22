// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Script, console2} from "forge-std/Script.sol";

import {MockFT} from "../src/MockFT.sol";
import {WrappedFT} from "../src/WrappedFT.sol";

contract DeployScript is Script {
    address public constant DITH = 0xaD256f1379FaeBB3B3856156Cc889756712cd620;

    function setUp() public {}

    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        MockFT ft = new MockFT();
        console2.log("MockFT deployed at", address(ft));

        // vm.broadcast(DITH);
        // ft.buyShares(DITH, 1);

        // vm.broadcast();
        WrappedFT wft = new WrappedFT(address(ft));
        console2.log("WrappedFT deployed at", address(wft));
    }
}
