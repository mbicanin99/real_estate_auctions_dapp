// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

import "./RealEstateAuction5.sol";

contract AuctionFactory {
    address[] public auctions;
    uint256 public auctionCount;

    constructor() {
        auctionCount = 0;
    }

    function createAuction(
        uint auctionStartTime,
        uint auctionEndTime,
        address payable beneficiary,
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _quadrature,
        string[] memory _images,
        uint _startingBid,
        uint _bidIncrement
    ) public {
        require(auctionEndTime > auctionStartTime, "Auction end time must be after start time");

        auctionCount++;

        RealEstateAuction newAuction = new RealEstateAuction(
            auctionStartTime,
            auctionEndTime,
            beneficiary,
            _title,
            _description,
            _location,
            _quadrature,
            _images,
            auctionCount,
            _startingBid,
            _bidIncrement
        );

        auctions.push(address(newAuction));
    }

    function getAllAuctions() public view returns (address[] memory) {
        return auctions;
    }

    function getAuctionDetails(address auctionAddress) public view returns (
        uint256 id,
        address beneficiary,
        string memory title,
        string memory description,
        string memory location,
        uint256 quadrature,
        string[] memory images,
        uint startingBid,
        uint bidIncrement,
        address highestBidder,
        uint highestBid,
        bool ended
    ) {
        RealEstateAuction auction = RealEstateAuction(auctionAddress);

        RealEstateAuction.RealEstate memory realEstate = auction.getRealEstateDetails();

        return (
            realEstate.id,
            auction.beneficiary(),
            realEstate.title,
            realEstate.description,
            realEstate.location,
            realEstate.quadrature,
            realEstate.images,
            auction.startingBid(),
            auction.bidIncrement(),
            auction.highestBidder(),
            auction.highestBid(),
            auction.ended()
        );
    }
}
