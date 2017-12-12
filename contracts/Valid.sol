pragma solidity ^0.4.18;
// We have to specify what version of compiler this code will compile with

contract Valid {

	function validCandidate() view public returns (bool) {
		address nValid = 0x22226048b305ad2ebaa8015f3d64557c3647e7b6;
    		if(nValid != msg.sender){
			return true;		
		}
		return false;
	}
}
