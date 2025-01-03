// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./QPiToken.sol";

contract StableValueMechanism {
    QPiToken public qpiToken;
    uint256 public targetValue = 314159; // Target value in cents (i.e., $3.14159)
    uint256 public adjustmentFactor = 100; // Factor for supply adjustment

    constructor(address _qpiToken) {
        qpiToken = QPiToken(_qpiToken);
    }

    function adjustSupply(uint256 currentPrice) external {
        require(currentPrice > 0, "Current price must be greater than zero");

        if (currentPrice < targetValue) {
            uint256 deficit = targetValue - currentPrice;
            uint256 adjustmentAmount = deficit.mul(adjustmentFactor);
            qpiToken.mint(address(this), adjustmentAmount);
        } else if (currentPrice > targetValue) {
            uint256 surplus = currentPrice - targetValue;
            uint256 adjustmentAmount = surplus.mul(adjustmentFactor);
            qpiToken.burn(adjustmentAmount);
        }
    }
}
