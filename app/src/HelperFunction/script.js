import { saveaddress, savebalance } from "../redux/action";
import {CONTRACT_ADDRESS,CONTRACT_ABI} from './config';
import getWeb3 from "./getWeb";
const url = "https://api.tronline.io/api";

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
      web3.currentProvider.on("networkChanged", function (networkId) {
        window.location.reload();
      });
      window.userAddress=accounts[0];
      window.contract=contract;
      window.balance=balance/1e18;
      resolve({userAddress:accounts[0],contract:contract,balance:balance/1e18});
    } catch (err) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(err);
        reject(err);
    }
  })
};

















export function getwalletAddress() {
  return (dispatch) => {
    if (window.tronWeb) {
      let wallet_address = window.tronWeb.defaultAddress.base58;
      dispatch(saveaddress(wallet_address));
    }
  };
}
// getwalletAddress();

export function getBalance(address) {
  return (dispatch) => {
    window.tronWeb.trx
      .getBalance(address)
      .then((res) => {
        dispatch(savebalance(res / 1e6));
      })
      .catch((e) => {
        console.log(e);
      });    
  };
}


export function checkJoinAddress(address) {
  return fetch(`${url}/is_user_exist`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      waddress: address,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}


export function checkLoginStatus(address) {
  return fetch(`${url}/check_login_status`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      waddress: address,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getRandomId(address) {
  return fetch(`${url}/get_randomId`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      waddress: address,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getPersonalDetails(id) {
  return fetch(`${url}/personal_details`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getCommunityDetails(id) {
  return fetch(`${url}/get_community_level_incomes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getDirects(id) {
  return fetch(`${url}/get_direct_member`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getAllUpDownIncome(id) {
  return fetch(`${url}/get_allupdown_income`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getWithdrawal(id) {
  return fetch(`${url}/getWithdrawal`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getVIPWithdrawal(id) {
  return fetch(`${url}/get_vip_income_withdraw`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getWithdrawCondition(id) {
  return fetch(`${url}/getWithdrawalConditions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getInvestorId(id) {
  return fetch(`${url}/get_investorId`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      random_id: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getvipsponsorincome(id) {
  return fetch(`${url}/get_vip_sponsor_level_incomes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getVIP(id) {
  return fetch(`${url}/get_activated_vip`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getVIPCount() {
  return fetch(`${url}/get_total_vip_count`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getLevelIncomes(id, type) {
  return fetch(`${url}/get_upline_downline_income`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      investorId: id,
      income_type: type,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function getMyWalletIncome(address) {
  return fetch(`${url}/getWalletBalance`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      waddress: address,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function withdrawalRequest(withdrawal_amount, id, waddress) {
  return fetch(`${url}/kiosk_reqst`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      withdrawl_amount: withdrawal_amount,
      investorId: id,
      waddress:waddress,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function vipWithdrawalRequest1(withdrawal_amount, id, waddress) {
  return fetch(`${url}/xuqpa_reqst`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      withdrawl_amount: withdrawal_amount,
      investorId: id,
      waddress: waddress,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function vipWithdrawalRequest2(withdrawal_amount, id, waddress) {
  return fetch(`${url}/qmnps_reqst`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      withdrawl_amount: withdrawal_amount,
      investorId: id,
      waddress: waddress,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}

export function vipWithdrawalRequest3(withdrawal_amount, id, waddress) {
  return fetch(`${url}/spoef_reqst`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "cache-control": "no-cache",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      withdrawl_amount: withdrawal_amount,
      investorId: id,
      waddress: waddress,
    }),
  })
    .then((d) => d.json())
    .catch((e) => e);
}