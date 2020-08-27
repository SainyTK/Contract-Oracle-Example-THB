const PORT = process.env.PORT || 4000;

const blockchainNetwork = 'ropsten';

// const getBlockchainNetwork = async () => {
//     const networkId = await web3.eth.net.getId();
//     switch (networkId) {
//         case 1: return 'mainnet';
//         case 3: return 'ropsten';
//         case 4: return 'rinkeby';
//         case 42: return 'kovan';
//         default: return '';
//     }
// }

const wallet = {
    address: '0x73D8.....4B82b0d594',
    privateKey: '0x499E9CA.....C4DCB0F697C913E8F7'
}

const infura = {
    projectId: 'fabbb....b709ddd1a',
    projectSecret: '119002.....d286fba40',
    endpoint: `wss://${blockchainNetwork}.infura.io/ws/v3/fabbb....b709ddd1a`
}

module.exports = {
    blockchainNetwork,
    wallet,
    infura,
    PORT
}