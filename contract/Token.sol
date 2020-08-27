pragma solidity ^0.6.0;
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    
   address payable tokenOwner;    
   uint256 public thbRate;
   
   event CallAPI();
   event GetSender(address sender);
   
   constructor () public ERC20("Thai Baht", "THB") {
       tokenOwner = msg.sender;
       _setupDecimals(4);
       _mint(msg.sender, 10000 * (10 ** uint256(decimals())));
   }
   
    function mint(uint256 amount) public virtual { 
        require( msg.sender == tokenOwner , "Not contract owner!!");
        _mint(msg.sender, amount * (10 ** uint256(decimals())));
    }
    
    function getOwner() public view returns (address ) {
        return tokenOwner;
    }
    
   function __callback(uint256 value) public {
       thbRate = value;
   }
   
   function update() public {
        require( msg.sender == tokenOwner , "Not contract owner!!");
        emit CallAPI();
   }
   
  function getTHB() public payable {
      uint256 amount = (msg.value * thbRate) / (10 ** 18);
      emit GetSender(msg.sender);
      _mint(msg.sender, amount);
      tokenOwner.transfer(msg.value);

  }
    
}