const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Web3PromiEvent = require('web3-core-promievent');

const config = require('../config');
const ABI = require('./ABI');

const contractAddress = '0x6DfEfCF0fdeB6Cefe23333C628D18F0002C84dB1';

const web3 = new Web3(config.infura.endpoint);
const contract = new web3.eth.Contract(ABI, contractAddress);

const sendTransaction = (methodData, { from, privateKey }) => {
    const promiEvent = Web3PromiEvent();

    async function create() {
        try {
            const data = methodData.encodeABI();
            const skBuffer = Buffer.from(privateKey.substr(2, privateKey.length), 'hex');
            const estimatedGas = await methodData.estimateGas({ from });

            const txObject = {
                nonce: await web3.eth.getTransactionCount(from, 'pending'),
                chainId: 42,
                gasLimit: web3.utils.toHex(Math.floor(estimatedGas * 1.2)),
                gasPrice: web3.utils.toHex(web3.utils.toWei('3', 'gwei')),
                from,
                to: contractAddress,
                data,
            }

            const tx = new Tx.Transaction(txObject, { chain: config.blockchainNetwork });
            tx.sign(skBuffer);
            const serializedTx = tx.serialize()
            const raw = '0x' + serializedTx.toString('hex');

            web3.eth.sendSignedTransaction(raw)
                .on('transactionHash', (hash) => promiEvent.eventEmitter.emit('transactionHash', hash))
                .on('confirmation', (confirmationNumber, receipt) => promiEvent.eventEmitter.emit('confirmation', confirmationNumber, receipt))
                .on('receipt', (receipt) => promiEvent.eventEmitter.emit('receipt', receipt))
                .on('error', (error) => promiEvent.eventEmitter.emit('error', error))
                .then(receipt => promiEvent.resolve(receipt))
                .catch(error => promiEvent.reject(error))
        } catch (e) {
            promiEvent.reject(e)
        }
    }

    create();

    return promiEvent.eventEmitter;
}

// transactions
module.exports.__callback = (value, { from, privateKey }) => {
    const methodData = contract.methods.__callback(value);
    return sendTransaction(methodData, { from, privateKey });
}

// getters
module.exports.getDeSDevBalance = ({ from }) => {
    return contract.methods.getDeSDevBalance().call({ from });
}

//events
module.exports.addOnCallApi = (handler) => contract.events.CallAPI().on('data', handler);