pragma solidity >=0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";


contract OpenSource is ERC721 {

    struct Community {
        string name;
    }

   string public constant name = "OpenSource Community Token";
    string public constant symbol = "OpenSource";

    mapping(uint256 => Community) public tokenIdToCommunityInfo;
    mapping(uint256 => uint256) public communitysForSale;

    
    function createCommunity(string memory _name, uint256 _tokenId) public { 
        Community memory newCommunity = Community(_name); 
        tokenIdToCommunityInfo[_tokenId] = newCommunity; 
        _mint(msg.sender, _tokenId); 
    }

    function putCommunityUpForSale(uint256 _tokenId, uint256 _price) public {
        require(ownerOf(_tokenId) == msg.sender, "You can't sale the Community you don't owned");
        communitysForSale[_tokenId] = _price;
    }


    function _make_payable(address x) internal pure returns (address payable) {
        return address(uint160(x));
    }	

    function buyCommunity(uint256 _tokenId) public  payable {
        require (communitysForSale[_tokenId] > 0, "The Community should be up for sale");
        uint256 communityCost = communitysForSale[_tokenId];
        address ownerAddress = ownerOf(_tokenId);
        require(msg.value > communityCost, "You need to have enough Ether");
        _transferFrom(ownerAddress, msg.sender, _tokenId); 
        address payable ownerAddressPayable = _make_payable(ownerAddress); 
        ownerAddressPayable.transfer (communityCost);
        if(msg.value > communityCost) {
            msg.sender.transfer(msg.value - communityCost);
        }
    }

    function lookUptokenIdToCommunityInfo (uint _tokenId) public view returns (string memory) {
      return tokenIdToCommunityInfo[_tokenId].name;
    }

    function exchangeCommunitys(uint256 _tokenId1, uint256 _tokenId2) public {
          address token1Owner = ownerOf(_tokenId1);
        address token2Owner = ownerOf(_tokenId2);
         require(token1Owner != address(0), "Owner of the first token needs to exist");
        require(token2Owner != address(0), "Owner of the second token needs to exist");
        if(msg.sender == token1Owner) {
            _transferFrom(token1Owner, token2Owner, _tokenId1);
            _transferFrom(token2Owner, token1Owner, _tokenId2);
        }
        else if(msg.sender == token2Owner) {
            _transferFrom(token2Owner, token1Owner, _tokenId2);
            _transferFrom(token1Owner, token2Owner, _tokenId1);
        }
    }

    function transferCommunity(address _to1, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId), "Sender needs to own the token");
                transferFrom(msg.sender, _to1, _tokenId);
    }

}