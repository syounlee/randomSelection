import fetch from 'node-fetch';

import raffleWinners from 'raffleWinners';
import Web3 from 'web3';

import dotenv from 'dotenv'
dotenv.config()

const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`))

async function raffle (contractAddress) {
  contractAddress = web3.utils.toChecksumAddress(contractAddress);

  //////
  // Retrieve the ABI of the contract given.
  const etherscan_url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`;
  const res = await fetch(etherscan_url);
  const abi = await res.json();

  ////////
  // Connect to the Contract given the address and the ABI
  const raffleContract = new web3.eth.Contract(abi,contractAddress);
  
  ////////
  // Call the Contract to Retrive the information for the Raffle.
  //////
  /// 1. Base Price
  const basePrice = raffleContract.methods.basePrice().call();
  /// 2. Number of Winners
  const numberOfWinners = raffleContract.methods.basePrice().call();
  /// 3. Seed for the Random Number Generator
  const seed = raffleContract.methods.basePrice().call();
  /// 4. Participants Account Address
  const participants = raffleContract.methods.participants().call();
  /// 5. Participants Stake [arra]
  const stakes = raffleContract.methods.stakes(participants).call();
  /// 6. Participants token [array]
  const tokens = raffleContract.methods.tokens(participants).call();

  ///////
  // Calculate Price Premium Rate for each participants
  const pricePremiumRate = stakes.map(x => (x-basePrice)/basePrice);

  ///////
  // Call the function 'raffleWinners' to get the indices of the winners in the array 'participants'.
  winnersIndices = raffleWinners(seed, pricePremiumRate, tokens, numberOfWinners);
  // Return the addresses of the winners
  return winnersIndices.mpa(x => participants[x]);
};

module.exports = raffle;


///// an example to call the function 'raffle'
// const contractAddress = '0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85';
// raffle(contractAddress);