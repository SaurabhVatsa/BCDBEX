# BCDBEX
This code is a basic example of how to connect Ethereum and BigchainDB and create a DAPP in decentralized ecosystem.

## Steps
Install MongoDB

Install BigchainDB following [this link](https://docs.bigchaindb.com/projects/server/en/latest/quickstart.html)

Install TestRPC to execute the smart contracts

Start testrpc and copy the first address in the nValid variable in Valid.sol

Browse to the folder BCDB\contracts in terminal

Type node and run the following steps in node console

    Web3 = require('web3')
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    code = fs.readFileSync('Valid.sol').toString()
    solc = require('solc')
    compiledCode = solc.compile(code)
    abiDefinition = JSON.parse(compiledCode.contracts[':Valid'].interface)
    ValidContract = web3.eth.contract(abiDefinition)
    byteCode = compiledCode.contracts[':Valid'].bytecode
  	deployedContract = ValidContract.new({data: byteCode, from: web3.eth.accounts[0], gas: 4700000})
	deployedContract.address
    
In the index.js file, update the

	contractInstance = ValidContract.at('0x1955399de1a8583f651977c7e197adbb44e3df96');
    
with new contact address. 

In another terminal, run 

	sudo mongod --replSet=bigchain-rs
    
Then start BigchainDB in another terminal

	bigchaindb start
    
Now start the UI by double clicking index.html ..

