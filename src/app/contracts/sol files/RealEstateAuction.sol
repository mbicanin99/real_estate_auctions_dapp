// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;

contract RealEstateAuction {
    address payable public beneficiary;
    uint public auctionStartTime;
    uint public auctionEndTime;
    string public title;
    string public description;
    string public location;
    uint256 public quadrature;
    string[] public images;
    uint public startingBid;
    uint public bidIncrement;
    uint public auctionId;

    address public highestBidder;
    uint public highestBid;
    bool public ended;

    struct RealEstate {
        uint256 id;
        string title;
        string description;
        string location;
        uint256 quadrature;
        string[] images;
        address ownerWalletAddress;
    }

    RealEstate public realEstate;

    mapping(address => uint) public pendingReturns;

    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    constructor(
        uint _auctionStartTime,
        uint _auctionEndTime,
        address payable _beneficiary,
        string memory _title,
        string memory _description,
        string memory _location,
        uint256 _quadrature,
        string[] memory _images,
        uint _auctionId,
        uint _startingBid,
        uint _bidIncrement
    ) {
        beneficiary = _beneficiary;
        auctionStartTime = _auctionStartTime;
        auctionEndTime = _auctionEndTime;
        title = _title;
        description = _description;
        location = _location;
        quadrature = _quadrature;
        images = _images;
        auctionId = _auctionId;
        startingBid = _startingBid;
        bidIncrement = _bidIncrement;
        highestBid = 0;
        highestBidder = address(0);
        ended = false;

        realEstate = RealEstate({
            id: auctionId,
            title: _title,
            description: _description,
            location: _location,
            quadrature: _quadrature,
            images: _images,
            ownerWalletAddress: beneficiary
        });
    }

    function bid() public payable {
        require(block.timestamp >= auctionStartTime, "Auction not yet started.");
        require(block.timestamp <= auctionEndTime, "Auction already ended.");
        require(msg.value >= startingBid, "Bid is less than starting bid.");
        require(msg.value >= highestBid + bidIncrement, "Bid increment is too low.");

        if (highestBid != 0) {
            pendingReturns[highestBidder] += highestBid;
        }

        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            pendingReturns[msg.sender] = 0;
            if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function auctionEnd() public {
        require(block.timestamp >= auctionEndTime, "Auction not yet ended.");
        require(!ended, "Auction end has already been called.");

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }

    function getRealEstateDetails() public view returns (RealEstate memory) {
        return realEstate;
    }
}
