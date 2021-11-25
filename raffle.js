const dotenv = require('dotenv').config();

const weightedSelection = require('./weighted-selection');
const MersenneTwister = require('./mersenne-twister');

const Web3 = require('web3');
const axios = require('axios');

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`))

const raffle = (contractAddress) => {
  contractAddress = web3.utils.toChecksumAddress(contractAddress);
  axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`)
  .then(response => {
    abi = JSON.parse(response.data.result);
    //console.log(abi);
    const contract = new web3.eth.Contract(abi,contractAddress);
    contract.methods.owner().call().then(console.log)


    // const owner = new Promidr  contract.methods.owner().call());
  })
  .catch(error => {
    console.log(error);
    throw new Error();

  });

}







module.exports = raffle;