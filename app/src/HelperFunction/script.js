
import {CONTRACT_ADDRESS,CONTRACT_ABI} from './config';
import getWeb3 from "./getWeb";
const url = "http://localhost:8080/api";

export const onConnect = () => {
  return new Promise(async (resolve,reject)=>{
    try {
      const web3 = await getWeb3();
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      web3.currentProvider.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
      const balance = await new web3.eth.getBalance(accounts[0]);
      const price = await contract.methods.price().call();
      web3.currentProvider.on("networkChanged", function (networkId) {
        window.location.reload();
      });
      window.userAddress=accounts[0];
      window.contract=contract;
      window.balance=balance/1e18;
      window.price =price;
      resolve({userAddress:accounts[0],contract:contract,balance:balance/1e18,price:price});
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(err);
        reject(err);
    }
  })
};


export const getUserInfo=(user)=>{
  return fetch(`${url}/user`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      user:user,
    })
  }).then(d=>d.json())
  .catch(e=>e)
}



