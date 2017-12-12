web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
abi = JSON.parse('[{"constant":true,"inputs":[],"name":"validCandidate","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"}]')
ValidContract = web3.eth.contract(abi);
// In your nodejs console, execute contractInstance.address to get the address at which the contract is deployed and change the line below to use your deployed address
contractInstance = ValidContract.at('0x1955399de1a8583f651977c7e197adbb44e3df96');

function myFunction(){
    var address = document.getElementById('dropdown').value;
    var index = 0;
    if(address=="Two"){
    	index = 1;
    }
    var valid = contractInstance.validCandidate({from: web3.eth.accounts[index]});
    if(valid){

	    var a = document.getElementById('candidate').value;

	    // BigchainDB server instance or IPDB (e.g. https://test.ipdb.io/api/v1/)
	    const API_PATH = 'http://localhost:9984/api/v1/'

	    // Create a new keypair.
	    const alice = new BigchainDB.Ed25519Keypair()

	    // Construct a transaction payload
	    const tx = BigchainDB.Transaction.makeCreateTransaction(
		// Define the asset to store, in this example it is the current temperature
		// (in Celsius) for the city of Berlin.
		{ city: 'Berlin, DE', temperature: 22, datetime: new Date().toString(), message: a },

		// Metadata contains information about the transaction itself
		// (can be `null` if not needed)
		{ what: 'My first BigchainDB transaction' },

		// A transaction needs an output
		[ BigchainDB.Transaction.makeOutput(
		        BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))
		],
		alice.publicKey
	    )

	    // Sign the transaction with private keys
	    const txSigned = BigchainDB.Transaction.signTransaction(tx, alice.privateKey)

	    // Send the transaction off to BigchainDB
	    let conn = new BigchainDB.Connection(API_PATH)

	    conn.postTransaction(txSigned)
		.then(() => conn.pollStatusAndFetchTransaction(txSigned.id))
		.then(res => {
		    const elem = document.getElementById('lastTransaction')
		    elem.href = API_PATH + 'transactions/' + txSigned.id
		    elem.innerText = txSigned.id
		    console.log('Transaction', txSigned.id, 'accepted')
		})
    }else{
    	const elem = document.getElementById('lastTransaction')
	elem.innerText = "can not be completed !!"
    }
}

$(document).ready(function() {
});
