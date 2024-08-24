// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract UserRoles {
    enum Role { None, Auctioneer, Bidder }

    mapping(address => Role) public userRoles;

    event RoleAssigned(address indexed user, Role role);

    function setRole(address user, Role role) external {
        require(user != address(0), "Invalid address");
        userRoles[user] = role;
        emit RoleAssigned(user, role);
    }

    function getRole(address user) external view returns (Role) {
        return userRoles[user];
    }
}
