const contract = require('./contract');
const price = require('./priceCompare');
const config = require('./config');

const { privateKey, address } = config.wallet;

contract.addOnCallApi(async () => {
    // await price.retrieveData();
    console.log('API Called!');
    const THBRate = await price.getPrice('THB');
    console.log(THBRate);

    const res = await contract.__callback(Math.floor(THBRate * (10 ** 4)), { from: address, privateKey });
    console.log(res);
})