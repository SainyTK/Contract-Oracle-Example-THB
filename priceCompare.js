const apiUrl = `https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,THB`;
const axios = require('axios');
const file = require('./utils/file');

const retrieveData = async () => {
    console.log('start getting data');
    const res = await axios.get(apiUrl);
    console.log('got data', res.data);
    return file.write(`${__dirname}/data/currency.json`, res.data);
}

const getPrice = async (key = 'THB') => {
    const prices = await file.read(`${__dirname}/data/currency.json`);
    return prices[key];
}

module.exports = {
    retrieveData,
    getPrice
}