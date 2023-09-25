// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import {ERC1155Supply} from "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";
import {IERC2981} from "@openzeppelin/contracts/interfaces/IERC2981.sol";
import {IERC1271} from "@openzeppelin/contracts/interfaces/IERC1271.sol";
import {IERC165} from "@openzeppelin/contracts/interfaces/IERC165.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

import {IFriendtechShares} from "./IFriendtechShares.sol";

contract WrappedFT is ERC1155, IERC2981, IERC1271, Ownable, ReentrancyGuard {
    IFriendtechShares public immutable ft;

    uint256 _royaltyFee;

    constructor(address ft_) ERC1155("") {
        ft = IFriendtechShares(ft_);
        ft.buyShares(address(this), 1);
    }

    function mintPrice(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        return ft.getBuyPriceAfterFee(sharesSubject, amount);
    }

    function burnPrice(
        address sharesSubject,
        uint256 amount
    ) public view returns (uint256) {
        return ft.getSellPriceAfterFee(sharesSubject, amount);
    }

    function mint(
        address to,
        address sharesSubject,
        uint256 amount
    ) public payable nonReentrant {
        uint256 price = ft.getBuyPriceAfterFee(sharesSubject, amount);
        require(msg.value >= price, "WrappedFT: insufficient funds");

        _mint(to, _tokenId(sharesSubject), amount, "");
        ft.buyShares{value: price}(sharesSubject, amount);
    }

    function burn(
        address from,
        address sharesSubject,
        uint256 amount
    ) public payable nonReentrant {
        require(
            from == _msgSender() || isApprovedForAll(from, _msgSender()),
            "ERC1155: caller is not token owner or approved"
        );

        uint256 price = ft.getSellPriceAfterFee(sharesSubject, amount);

        _burn(from, _tokenId(sharesSubject), amount);
        ft.sellShares(sharesSubject, amount);

        (bool success, ) = from.call{value: price}("");
        require(success, "WrappedFT: unable to send funds");
    }

    function totalSupply(uint256 id) public view virtual returns (uint256) {
        return ft.sharesSupply(_sharesSubject(id));
    }

    function exists(uint256 id) public view virtual returns (bool) {
        return totalSupply(id) > 0;
    }

    function royaltyInfo(
        uint256 tokenId,
        uint256 salePrice
    ) external view override returns (address receiver, uint256 royaltyAmount) {
        receiver = _sharesSubject(tokenId);
        royaltyAmount = (salePrice * _royaltyFee) / 10000;
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function setRoyaltyFee(uint256 newfee) public onlyOwner {
        _royaltyFee = newfee;
    }

    function withdraw(address to) public onlyOwner {
        (bool success, ) = to.call{value: address(this).balance}("");
        require(success, "WrappedFT: unable to send funds");
    }

    function withdrawToken(address tokenAddress, address to) public onlyOwner {
        IERC20 token = IERC20(tokenAddress);
        token.transfer(to, token.balanceOf(address(this)));
    }

    function isValidSignature(
        bytes32 hash,
        bytes memory signature
    ) external view override returns (bytes4 magicValue) {
        return
            ECDSA.recover(hash, signature) == owner()
                ? this.isValidSignature.selector
                : bytes4(0);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC1155, IERC165) returns (bool) {
        return
            interfaceId == type(IERC2981).interfaceId ||
            interfaceId == type(IERC1271).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _sharesSubject(uint256 tokenId) internal pure returns (address) {
        return address(uint160(tokenId));
    }

    function _tokenId(address account) internal pure returns (uint256) {
        return uint256(uint160(account));
    }
}
