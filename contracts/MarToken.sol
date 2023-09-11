// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {ERC20, ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract MarToken is ERC20, Ownable, ERC20Permit {
    using SafeERC20 for IERC20;

    uint8 private _decimals;

    event Burn(address indexed from, uint256 value);
    event TokensRecovered(address tokenAddress, uint256 amount);

    // The constructor initializes the contract with necessary parameters.
    constructor(
        string memory tokenName,
        string memory tokenSymbol,
        uint8 decimalUnits,
        uint256 initialAmount,
        address custodianAddress
    ) ERC20(tokenName, tokenSymbol) ERC20Permit(tokenName) {
        _decimals = decimalUnits;
        /*
            _mint is an internal function within ERC20.sol, 
            invoked solely at this point and not intended
            for any future calls.
        */
        _mint(custodianAddress, initialAmount * 10 ** uint256(decimalUnits));
    }

    // Retrieves the decimal units of the token.
    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    // Retrieves the address of the current contract owner.
    function getOwner() external view returns (address) {
        return owner();
    }

    // Allows the token holder to burn a specified amount of their tokens, removing them from circulation.
    function burn(uint256 amount) public returns (bool) {
        require(
            amount <= balanceOf(msg.sender),
            "ERC20: burn amount exceeds balance"
        );

        _burn(msg.sender, amount);

        emit Burn(msg.sender, amount);

        return true;
    }

    // Receives ether sent to the contract.
    receive() external payable {
        revert("Contract cannot accept Ether");
    }

    // Allows the contract owner to recover tokens other than MAR tokens accidentally sent to the contract.
    function recoverTokens(
        address tokenAddress,
        uint256 amount
    ) external onlyOwner {
        require(tokenAddress != address(this), "Cannot recover MarToken");
        IERC20 token = IERC20(tokenAddress);
        token.safeTransfer(owner(), amount);

        emit TokensRecovered(tokenAddress, amount);
    }
}
