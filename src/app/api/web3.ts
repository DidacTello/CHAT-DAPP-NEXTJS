import Web3 from 'web3';
import ChatContract from '../../../build/contracts/Chat.json';

let web3: Web3 | null = null;
let chatContract: any = null;

const initializeWeb3 = () => {
  if (!web3) {
    web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
    const networkId = Object.keys(ChatContract.networks)[0];
    chatContract = new web3.eth.Contract(
      ChatContract.abi,
      (ChatContract.networks as any)[networkId].address
    );
    console.log(chatContract,web3)
  }
};

initializeWeb3();

export { web3, chatContract };