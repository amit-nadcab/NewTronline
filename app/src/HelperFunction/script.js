
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config';
import getWeb3 from "./getWeb";
const url = "https://node.bdltcommunity.io/api";
// const url = "http://localhost:8080/api";

export const onConnect = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const web3 = await getWeb3();
      const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      const accounts = await web3.eth.getAccounts();
      web3.currentProvider.on("accountsChanged", function (accounts) {
        window.location.reload();
      });
      const balance = await new web3.eth.getBalance(accounts[0]);
      const joiningPackage = await contract.methods.joiningPackage().call();
      web3.currentProvider.on("networkChanged", function (networkId) {
        window.location.reload();
      });
      window.userAddress = accounts[0];
      window.contract = contract;
      window.balance = balance / 1e18;
      window.joiningPackage = joiningPackage;
      resolve({ userAddress: accounts[0], contract: contract, balance: balance / 1e18, joiningPackage: joiningPackage });
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(err);
      reject(err);
    }
  })
};

export const globalStat = () => {
  return fetch(`${url}/global-stats`)
    .then(d => d.json())
    .catch(e => console.log(e))
}

export const getUserInfo = (user) => {
  return fetch(`${url}/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}

export const getIncome = (user) => {
  return fetch(`${url}/income`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}
export const getWithdraw = (user) => {
  return fetch(`${url}/withdraw-history`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}
export const royaltyWithdraw = (user) => {
  return fetch(`${url}/royaltyWithdraw`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}
export const userIdByWallet = (user) => {
  return fetch(`${url}/getUserIdByWallet`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}

export const getTeam = (user) => {
  return fetch(`https://node.bdltcommunity.io/bdlt_api/team.php`, {
    method: "POST",
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}


export const getRequiredMembers = (user) => {
  return fetch(`https://node.bdltcommunity.io/bdlt_api/level_team_member.php`, {
    method: "POST",
    body: JSON.stringify({
      user: user,
    })
  }).then(d => d.json())
    .catch(e => e)
}




