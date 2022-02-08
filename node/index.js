const Web3 = require("web3");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mysql = require('mysql');
const HDWalletProvider = require("@truffle/hdwallet-provider");
app.use(express.json());
app.use(cors());
console.log(process.env.privatekey);
const web3 = new Web3("https://rpc01.bdltscan.io/");

const dexABI = [{ "type": "event", "name": "PriceChanged", "inputs": [{ "type": "uint256", "name": "newPrice", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Registration", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "address", "name": "referrer", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "userId", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "referrerId", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoyalityIncome", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoyaltyDeduction", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "UserIncome", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": false }, { "type": "address", "name": "receiver", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }, { "type": "uint8", "name": "level", "internalType": "uint8", "indexed": false }, { "type": "string", "name": "_for", "internalType": "string", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawn", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "ChangePrice", "inputs": [{ "type": "uint256", "name": "bdltInUsd", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "SendRoyalityIncome", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "TIME_STEP", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "dev", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getUserDividends", "inputs": [{ "type": "address", "name": "userAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "idToAddress", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_ownerAddress", "internalType": "address" }, { "type": "address", "name": "_devwallet", "internalType": "address" }, { "type": "uint256", "name": "bdltInUsd", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "isUserExists", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "joiningPackage", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "lastUserId", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "registrationExt", "inputs": [{ "type": "address", "name": "referrerAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "id", "internalType": "uint256" }, { "type": "address", "name": "referrer", "internalType": "address" }, { "type": "uint256", "name": "partnersCount", "internalType": "uint256" }, { "type": "uint256", "name": "levelIncome", "internalType": "uint256" }, { "type": "uint256", "name": "sponcerIncome", "internalType": "uint256" }, { "type": "uint256", "name": "checkpoint", "internalType": "uint256" }, { "type": "uint256", "name": "start", "internalType": "uint256" }, { "type": "uint256", "name": "joiningAmt", "internalType": "uint256" }, { "type": "uint256", "name": "end", "internalType": "uint256" }, { "type": "uint256", "name": "withdrawn", "internalType": "uint256" }], "name": "users", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "withdraw", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "withdrawETH", "inputs": [{ "type": "address", "name": "adr", "internalType": "address payable" }, { "type": "uint256", "name": "amt", "internalType": "uint256" }] }, { "type": "receive", "stateMutability": "payable" }];

const contract_address = "0x3a3211781Dd84B161a841c2B5abF30E788166601";
const contract = new web3.eth.Contract(dexABI, contract_address);

// const conn = mysql.createConnection({
//   host: "184.168.111.174",
//   user: "bdlt_admin",
//   password: "Nadcab@1234",
//   database: "bdlt",
// });
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdlt",
});

function round(number) {
  return Math.round(number * 1000) / 1000;
}

function toFixed(x) {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    var e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  return String(x);
}

function getBlocktoTime(block) {
  return new Promise((resolve, reject) =>
    web3.eth
      .getBlock(block)
      .then((d) => resolve(d.timestamp))
      .catch((e) => reject(e))
  );
}

function checkUser(req, res, next) {
  let user_id = req.body.user_id;
  conn.query(
    `SELECT * FROM Registration where userId='${user_id}'`,
    function (err, result) {
      if (err) console.log(err);
      if (result.length) {
        req.body.user = result[0].user;
        next();
      } else {
        res.json({
          status: 0,
          msg: "user Not exist",
        });
      }
    }
  );
}

function calcRoyalty() {
  return new Promise((resolve, reject) => {
    var d = new Date();
    d.setMonth(d.getMonth() - 1);
    let date = Math.trunc(d.getTime() / 1000);
    conn.query(
      `Select sum(amount) as total from Registration where block_timestamp >'${date}'`,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
        let amt = 0;
        if (result) {
          amt = result[0].total + amt;
          conn.query(
            `Select sum(amount) as total from upgrade where block_timestamp >'${date}'`,
            function (err, result) {
              if (err) reject({ status: 0, err: err });
              if (result) {
                amt = result[0].total + amt;
                resolve({
                  result: amt / 1e18,
                });
              }
            }
          );
        }
      }
    );
  })

}

function calcLevel(level) {
  return new Promise((resolve, reject) => {
    console.log(level);
    conn.query(
      `Select * from Registration where level ='${level}'`,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
        let amt = 0;
        if (result) {
          resolve({
            result: result,
          });
        }
      }
    );
  })
}

function directLevel(id) {
  return new Promise((resolve, reject) => {
    console.log(level);
    conn.query(
      `Select * from Registration where user ='${level}'`,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
        let amt = 0;
        if (result) {
          resolve({
            result: result,
          });
        }
      }
    );
  })
}

conn.connect(function (err, result) {
  if (err) console.log(err);
  console.log("Connected!");
});

async function generateEventQuery(result) {
  let block_number = 0;
  let csql_arr = [];
  let sql_arr = [];
  if (result.length > 0 && result[0]["returnValues"]) {
    let i = 0,
      j = 0,
      userId = 0;
    referrer = '';
    while (result.length > i) {
      let index = Object.keys(result[i]["returnValues"]);
      let event = result[i]["event"];
      if (
        event != "SentExtraEthDividends" &&
        event != "MissedEthReceive" &&
        event != undefined &&
        event != "AdminChanged" &&
        event != "Upgraded"
      ) {
        let sql = "INSERT INTO `" + result[i]["event"] + "`(";
        let vsql = "VALUES (";
        let csql = "select id from `" + result[i]["event"] + "` where ";

        let k = 0;
        while (index.length > k) {
          if (index[k].length > 2) {
            csql +=
              "" +
              index[k] +
              "='" +
              result[i]["returnValues"][index[k]] +
              "' and ";
            if (index[k] === 'userId') {
              userId = result[i]["returnValues"][index[k]];
            }
            if (index[k] === 'referrer') {
              referrer = result[i]["returnValues"][index[k]];
            }
            sql += "`" + index[k] + "`,";
            vsql += "'" + result[i]["returnValues"][index[k]] + "',";
          }
          k++;
        }
        let tsmp = new Date() * 1; //$result[$i]['block_timestamp'];
        let transaction_id = result[i]["transactionHash"];
        let block_number = result[i]["blockNumber"];
        let timestamp = await getBlocktoTime(result[i]["blockNumber"]);
        csql += " transaction_id='" + transaction_id + "'";
        csql += " and block_number='" + block_number + "'";
        sql += "`block_timestamp`,`transaction_id`,`block_number`)";
        vsql +=
          "'" +
          timestamp +
          "','" +
          transaction_id +
          "','" +
          block_number +
          "')";
        sql += vsql;
        conn.query(csql, function (err, res) {
          if (err) throw err;
          if (res.length === 0) {
            conn.query(sql, function (err, result) {
              if (err) throw err;
            });
          }
        });

        csql_arr.push(csql);
        sql_arr.push(sql);
      }
      if (event === 'Registration') {
        conn.query(`SELECT count(*) as total from Registration Where referrer = '${referrer}'`,
          function (err, result) {
            if (err) throw err;
            console.log("Result Direct::", result[0].total, result);
            if (result) {
              conn.query(
                `Update Registration SET direct_member = '${result[0].total + 1}'  where user = '${referrer}'`,
                function (err, result) {
                  if (err) throw err;
                })
            }
          })
        let i = 1;
        conn.query(
          `Update Registration SET level = '${i}'  Where user = '${referrer}' and  level < '${i}'`,
          function (err, result) {
            if (err) throw err;
            if (result.changedRows > 0) {
              i++;
              recursive_data()
              function recursive_data() {
                conn.query(
                  `Select * from Registration where user = '${referrer}' and  user != '0x0000000000000000000000000000000000000000'`,
                  function (err, result) {
                    if (err) throw err;
                    console.log("ID  :: ", result)
                    if (result.length > 0) {
                      referrer = result[0].referrer;
                      conn.query(
                        `Update Registration SET level = '${i}'  Where user = '${referrer}' and  level < '${i}'`,
                        function (err, result) {
                          if (err) throw err;
                          if (result.changedRows == 0) {
                            return;
                          } else {
                            console.log("REF ID :: ", referrer, i);
                            i++;
                            if (i < 13) {
                              recursive_data()
                            }
                          }
                        }
                      );
                    } else {
                      return;
                    }
                  });
              }
            }
          }
        );
      }
      i++;
    }
  }
  return { csql: csql_arr, sql: sql_arr, result };
}

app.post("/api/income", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From userincome Where receiver='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 10, err: err });
      console.log("Retsuyh", result);
      if (result) {
        return res.status(200).json({
          status: 1,
          result: result,
        });
      }
    }
  );
});

app.post("/api/withdraw", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From withdrawn Where user ='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 10, err: err });
      if (result) {
        return res.status(200).json({
          status: 1,
          result: result,
        });
      }
    }
  );
});

app.post("/api/user", (req, res) => {
  user = req.body.user;
  contract.methods.users(user).call().then(d => {
    contract.methods.getUserDividends(user).call().then(roi => {
      conn.query(
        `Select * From Registration Where user='${user}'`,
        function (err, result) {
          if (err) res.json({ status: 0, err: err });
          return res.status(200).json({
            result: result,
            status: 1,
            data: d,
            roi: roi
          });
        }
      );
    }).catch(err => {
      console.log("Error:: ", err);
      return res.json({
        status: 0,
        error: err
      })
    })
  }).catch(e => {
    console.log("Error:: ", e);
    return res.json({
      status: 0,
      error: e
    })
  })
});

app.get("/api/calc-royalty-income", async (req, res) => {
  let response = await calcRoyalty();
  return res.json(response);
});

app.post("/api/get-level-access", async (req, res) => {
  let level = req.body.level ? req.body.level : 1;
  let response = await calcLevel(level);
  return res.json(response);
});

app.get("/api/send-royalty-income", async (req, res) => {
  let response = await calcRoyalty();
  console.log("Resposne :: ", response.result)
});

app.post("/api/direct-sponser", checkUser, (req, res) => {
  user = req.body.user;
  console.log(user);
  conn.query(
    `Select userId,user,block_timestamp From Registration Where referrer='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 0, err: err });
      return res.status(200).json({
        status: 1,
        result: result,
      });
    }
  );
});

app.post("/api/withdraw-history", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * from Withdraw where user='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 0, err: err });
      return res.json({
        status: 1,
        result: result,
      });
    }
  );
});

app.post("/api/royaltyWithdraw", async (req, res) => {
  let user = req.body.user;
  console.log("User Exist :: ", user)
  const ip = req.header("x-forwarded-for") || req.connection.remoteAddress;

  let provider = new HDWalletProvider(
    process.env.privatekey,
    "https://rpc01.bdltscan.io/"
  );
  web3.setProvider(provider);
  const accounts = await web3.eth.getAccounts();
  web3.eth.accounts.wallet.add(process.env.privatekey);
  contract.setProvider(provider);
  conn.query(
    `Select * From Registration Where user='${user}'`,
    function (err, result) {
      let total = result[0].royalty_wallet;
      console.log("total:::", total);
      if (true) {
        if (result[0].locked != "1") {
          if (total > 0) {
            conn.query(
              `Update Registration SET locked='1' where user='${user}'`,
              async function (err, r) {
                if (err) console.log(err);
                const gasPrice = await web3.eth.getGasPrice();
                let gas = await contract.methods
                  .SendRoyalityIncome(user, toFixed(total * 1e18))
                  .estimateGas({ value: 0, from: accounts[0] });
                contract.methods
                  .SendRoyalityIncome(user, toFixed(total * 1e18))
                  .send({
                    from: accounts[0],
                    value: 0,
                    gasPrice: gasPrice,
                    gas: gas,
                  })
                  .then((d) => {
                    console.log(d);
                    conn.query(
                      `INSERT INTO royalty_withdraw(user, ip_addr, withdraw_amt, transaction_id) VALUES ('${user}','${ip}','${total}', "Hey.....",)`,
                      function (err, re) {
                        if (err) console.log(err);
                        console.log(re);
                        if (re) {
                          conn.query(
                            `Update Registration SET locked='0', royalty_wallet='0' where user='${user}'`,
                            function (err, re) {
                              if (err) console.log(err);
                              console.log(re);
                              return res.json({
                                status: 1,
                                msg: "Successfully withdraw",
                              });
                            }
                          );
                        }
                      }
                    );

                  })
                  .catch((e) => {
                    console.log("Error::", e);
                    return res.json({
                      status: 0,
                      msg: e,
                    });
                  });
              }
            );
          } else {
            return res.json({
              status: 0,
              msg: "Your balance too low",
            });
          }
        } else {
          console.log("Already withdrawal processing");
          return res.json({
            status: 0,
            msg: "Already withdrawal processing",
          });
        }
      } else {
        res.json({
          status: 0,
          msg: "Cropping Limit Reached. Please Upgrade Package",
        });
      }
    }
  );
});

setInterval(() => {
  conn.query("select * from eventBlock", function (err, result) {
    if (err) throw err;
    web3.eth
      .getBlockNumber()
      .then((d) => {
        let current_block = d;
        console.log(result[0].latest_block);
        // console.log("contract",contract);
        contract
          .getPastEvents({
            fromBlock: Number(result[0].latest_block),
            toBlock: Number(result[0].latest_block) + 4000,
          })
          .then(async (events) => {
            let resu = await generateEventQuery(events);
            if (
              parseInt(result[0].latest_block) + 4000 <
              parseInt(current_block)
            ) {
              conn.query(
                `UPDATE eventBlock SET latest_block ='${parseInt(result[0].latest_block) + 4000
                }'`,
                function (err, result) {
                  if (err) throw err;
                  // console.log("Executed::", result);
                }
              );
            }
          })
          .catch((e) => {
            console.log("Error::", e);
          });
      })
      .catch((e) => {
        console.log("Error::", e);
      });
  });
}, 10000);


app.listen(8080);