// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0 ; //2. define the compile verson as ^0.8.0  (= 0.8.x)

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
 
library SafeMath { 
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
      assert(b <= a);
      return a - b;
    }
    
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
      uint256 c = a + b;
      assert(c >= a);
      return c;
    }
}
contract VolcanoToken {  //4 create contract named VolcanoCoin
        using SafeMath for uint256;

    struct Payment {
    uint transferAmount;
        address recepient;

}
    
   
 
    mapping(address => Payment[]) payments;
    
    //5. declare and initialize totalSupply variable to 1000 of type uint
    // uint256 totalSupply =1000; 
    
    //8.initialize variable owner of type address to msg.sender
    //msg.sender is the account creating the transaction
    address public owner; 
    uint totalSupply;
    //12. Events are used as logging functionality which are saved in Ethereum Blockchain
    //it accept type of totalsupply which is uint as parameter
    event changedTotalSupply(uint256);
    event transferE(uint256, address);
    
    
    //13.mapping is basically a key-value pair which are used for fast look-ups
    //In my sense mapping is the best fit for keep tract of user balances
    //key is user adresses and value is their balances
    mapping(address => uint) balances;
    // mapping (address => Payment[] );
    
    constructor(){
     totalSupply = 1000;
	balances[msg.sender] = totalSupply;
	owner=msg.sender;//11. 
    }
    
    //9. check condition before executing the function.
    //_ act as a placeholder for a function which has this modifier applied
     modifier onlyOwner() {
        if (msg.sender == owner) {
            _;
        }
    }
    
    //6. return the total supply of type public, view is used as it's reading the state variable(totalSupply)
    // in return parenthesis return type of variable is defined
    function returnTotalSupply() public view returns(uint256){
        return totalSupply;
    }
    
    
    //7. private function so it can only be accessed within the contract
    // This function add 100 to the total supply
    // function changeTotalSupply() private {
    //     totalSupply=totalSupply+1000;
    // }
    
    
    //10. change its accessblity to public with modifier applied so only owner can initiate theis function
     function changeTotalSupply() public onlyOwner {
        totalSupply=totalSupply+1000;
        balances[msg.sender] += 1000;
        emit changedTotalSupply(totalSupply);
    }
    
    
    //14.Two ways of getting balance in Solidity
    //   making mapping public
    
    
    //  2. used mapping to track balance  
    
     function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }



    
    
       function transfer(uint256 _transferAmount, address _recepient) public{
         require(_transferAmount <= balances[msg.sender], "Transfer amount should be less than balance");
	 require(_transferAmount >= 0, "Transfer amount should be greater than zero");
        balances[msg.sender] = balances[msg.sender].sub(_transferAmount);
        balances[_recepient] = balances[_recepient].add(_transferAmount);
       payments[msg.sender].push(Payment(_transferAmount, _recepient));


        emit transferE(_transferAmount,_recepient);
    }
    

   


function getPaymentInfo(address _index, uint256 _arrayIndex)  external view returns (Payment memory) 
{
    return payments[_index][_arrayIndex];
}
}