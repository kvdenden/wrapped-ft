// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IFriendtechShares {
    event Trade(
        address trader,
        address subject,
        bool isBuy,
        uint256 shareAmount,
        uint256 ethAmount,
        uint256 protocolEthAmount,
        uint256 subjectEthAmount,
        uint256 supply
    );

    function sharesBalance(
        address sharesSubject,
        address holder
    ) external view returns (uint256);

    function sharesSupply(
        address sharesSubject
    ) external view returns (uint256);

    function getPrice(
        uint256 supply,
        uint256 amount
    ) external view returns (uint256);

    function getBuyPrice(
        address sharesSubject,
        uint256 amount
    ) external view returns (uint256);

    function getSellPrice(
        address sharesSubject,
        uint256 amount
    ) external view returns (uint256);

    function getBuyPriceAfterFee(
        address sharesSubject,
        uint256 amount
    ) external view returns (uint256);

    function getSellPriceAfterFee(
        address sharesSubject,
        uint256 amount
    ) external view returns (uint256);

    function buyShares(address sharesSubject, uint256 amount) external payable;

    function sellShares(address sharesSubject, uint256 amount) external payable;
}
