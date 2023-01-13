const Web3 = require("web3");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mysql = require('mysql');
const fetch = require('cross-fetch');
const HDWalletProvider = require("@truffle/hdwallet-provider");
app.use(express.json());
app.use(cors());
console.log(process.env.privatekey);
const web3 = new Web3("https://rpc01.bdltscan.io/");

const dexABI = [{ "type": "event", "name": "PriceChanged", "inputs": [{ "type": "uint256", "name": "newPrice", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Registration", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": true }, { "type": "address", "name": "referrer", "internalType": "address", "indexed": true }, { "type": "uint256", "name": "userId", "internalType": "uint256", "indexed": true }, { "type": "uint256", "name": "referrerId", "internalType": "uint256", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoyalityIncome", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "RoyaltyDeduction", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "event", "name": "UserIncome", "inputs": [{ "type": "address", "name": "sender", "internalType": "address", "indexed": false }, { "type": "address", "name": "receiver", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }, { "type": "uint8", "name": "level", "internalType": "uint8", "indexed": false }, { "type": "string", "name": "_for", "internalType": "string", "indexed": false }], "anonymous": false }, { "type": "event", "name": "Withdrawn", "inputs": [{ "type": "address", "name": "user", "internalType": "address", "indexed": false }, { "type": "uint256", "name": "amount", "internalType": "uint256", "indexed": false }], "anonymous": false }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "ChangePrice", "inputs": [{ "type": "uint256", "name": "bdltInUsd", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "SendRoyalityIncome", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }, { "type": "uint256", "name": "amount", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "TIME_STEP", "inputs": [] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "changeDevwallet", "inputs": [{ "type": "address", "name": "newWallet", "internalType": "address" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "changeOwnership", "inputs": [{ "type": "address", "name": "newWallet", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "dev", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "getUserDividends", "inputs": [{ "type": "address", "name": "userAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "idToAddress", "inputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "nonpayable", "outputs": [], "name": "initialize", "inputs": [{ "type": "address", "name": "_ownerAddress", "internalType": "address" }, { "type": "address", "name": "_devwallet", "internalType": "address" }, { "type": "uint256", "name": "bdltInUsd", "internalType": "uint256" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "bool", "name": "", "internalType": "bool" }], "name": "isUserExists", "inputs": [{ "type": "address", "name": "user", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "joiningPackage", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "lastUserId", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "address", "name": "", "internalType": "address" }], "name": "owner", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "price", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "registrationExt", "inputs": [{ "type": "address", "name": "referrerAddress", "internalType": "address" }] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "", "internalType": "uint256" }], "name": "totalRoyality", "inputs": [] }, { "type": "function", "stateMutability": "view", "outputs": [{ "type": "uint256", "name": "id", "internalType": "uint256" }, { "type": "address", "name": "referrer", "internalType": "address" }, { "type": "uint256", "name": "partnersCount", "internalType": "uint256" }, { "type": "uint256", "name": "levelIncome", "internalType": "uint256" }, { "type": "uint256", "name": "sponcerIncome", "internalType": "uint256" }, { "type": "uint256", "name": "checkpoint", "internalType": "uint256" }, { "type": "uint256", "name": "start", "internalType": "uint256" }, { "type": "uint256", "name": "joiningAmt", "internalType": "uint256" }, { "type": "uint256", "name": "end", "internalType": "uint256" }, { "type": "uint256", "name": "withdrawn", "internalType": "uint256" }], "name": "users", "inputs": [{ "type": "address", "name": "", "internalType": "address" }] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "withdraw", "inputs": [] }, { "type": "function", "stateMutability": "payable", "outputs": [], "name": "withdrawETH", "inputs": [{ "type": "address", "name": "_receiver", "internalType": "address payable" }, { "type": "uint256", "name": "amt", "internalType": "uint256" }] }, { "type": "receive", "stateMutability": "payable" }];

const contract_address = "0xadB85c76Fb169bad8B6dD9DBc6267AefaF5B2B79";
const contract = new web3.eth.Contract(dexABI, contract_address);

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bdlt",
});
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

function round(number) {
  return Math.round(number * 1000) / 1000;
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
      `Select sum(amount) as total from registration where block_timestamp >'${date}'`,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
        let amt = 0;
        if (result) {
          amt = result[0].total + amt;
          resolve({
            result: amt / 1e18,
          });
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
function calcMemberLevel(level, total_member) {
  return new Promise((resolve, reject) => {
    console.log(level);
    conn.query(
      `Select * from tbl_member_level where level_name ='${level}' and total_member >='${total_member}' `,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
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

app.post("/api/getUserIdByWallet", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From Registration Where userId='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 10, err: err });
      if (result.length > 0) {
        return res.status(200).json({
          status: 1,
          result: result,
        });
      } else {
        return res.status(200).json({
          status: 0,
          result: [],
        });
      }
    }
  );
});

app.post("/api/income", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From UserIncome Where receiver='${user}'`,
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


function getTotalWithdraw() {
  return new Promise((resolve, reject) => {
    conn.query("SELECT IFNULL(sum(amount)/1e18,0) as total FROM Withdrawn", function (err, rew) {
      if (err) reject(err)
      conn.query("SELECT IFNULL(sum(amount)/1e18,0) as total FROM UserIncome", function (er, rs) {
        if (er) reject(er)
        conn.query("SELECT IFNULL(sum(amount)/1e18,0) as total FROM RoyalityIncome", function (ee, sd) {
          if (ee) reject(ee)
          resolve(rew[0].total + rs[0].total + sd[0].total);
        })
      })
    })
  });
}

// app.get("/api/global-stats", function (req, res) {
//   conn.query("Select count(*) as totalUser,IFNULL(sum(amount)/1e18,0) as totalPayout From Registration", function (err, result) {
//     if (err) res.json({ status: 0, msg: err });
//     contract.methods.price().call().then(async d => {
//       let total = await getTotalWithdraw();
//       let contract_balance = await web3.eth.getBalance(contract_address);
//       res.json({
//         status: 1,
//         result: result[0],
//         price: d / 1e18,
//         withdraw: total,
//         contract_balance: contract_balance / 1e18
//       })
//     }).catch(e => {
//       res.json({
//         status: 0,
//         err: e
//       })
//     })

//   })
// })

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
      if (typeof result !== 'undefined' && result.length > 0) {
        // the array is defined and has at least one element
        console.log("User Exist in Royalty Wallet :: result")
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
                      console.log("Transaction Details ::", d);
                      conn.query(
                        `Update Registration SET locked='0', royalty_wallet='0' where user='${user}'`,
                        function (err, re) {
                          if (err) console.log(err);
                          console.log(re);
                          return res.json({
                            status: 1,
                            msg: "Withdrawal Successfully! ",
                          });
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
      } else {
        return res.status(200).json({
          status: 1,
          result: "User does not exist!",
        });
      }
    }
  );
});

app.post("/api/withdraw", (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From Withdrawn Where user ='${user}'`,
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
          conn.query(`SELECT IFNULL(sum(amount)/1e18,0) as total FROM UserIncome where receiver='${user}'`, function (err, result) {
            if (err) res.json({ status: 0, err: err });
            return res.status(200).json({
              result: result,
              status: 1,
              data: d,
              roi: roi,
              withdraw: result[0].total
            });
          })
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
  try {
    let response = await calcRoyalty();
    return res.json(response);
  } catch (error) {
    console.log("Error in Login  API::", error.message)
    return res.status(400).json({
      status: false,
      message: "Something went wrong!",
    });
  }
});

app.post("/api/get-level-access", async (req, res) => {
  let level = req.body.level ? req.body.level : 1;
  let response = await calcLevel(level);
  return res.json(response);
});

async function royalty_inc_func(user, amt) {
  return new Promise((resolve, reject) => {
    conn.query(
      `Update Registration set royalty_wallet= '${amt}' where user ='${user}'`,
      function (err, result) {
        if (err) reject({ status: 0, err: err });
        if (result) {
          resolve({
            result: result,
          });
        }
      }
    );
  })
}

async function getSiteData(req, res) {
  try {
    await SiteData.find({}).then((result) => {
      res.status(200).send({
        data: result,
      });
    })
      .catch((error) => {
        res.status(400).send({
          message: error.message,
        });
      });
  }
  catch (error) {
    console.log("Error in getBlockedUsersetails!", error.message);
    return res.status(400).json({
      error: error.message,
    });
  }
}

app.get("/api/send-royalty-income", async (req, res) => {
  console.log("Calling Send Royalty Income:: ");
  let date = new Date().getDate();
  if (date == 7) {
    // if (1) {
    await calcRoyalty().then(async (response) => {

      // Stair 7 Royalty Send 

      await calcMemberLevel(7, 128).then(async (stair7) => {
        if (stair7.result.length > 0) {
          let royalty_amt_for_stair7 = (response.result * 0.05) / stair7.result.length;
          let a = stair7.result.map(async (it) => {
            console.log("IT7 :: ", royalty_amt_for_stair7, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair7)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair7.result.length)
        }
      })

      // Stair 8 Royalty Send 

      await calcMemberLevel(8, 256).then(async (stair8) => {
        if (stair8.result.length > 0) {
          let royalty_amt_for_stair8 = (response.result * 0.04) / stair8.result.length;
          let a = stair8.result.map(async (it) => {
            console.log("IT8 :: ", royalty_amt_for_stair8, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair8)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair8.result.length)
        }
      })

      // Stair 9 Royalty Send 

      await calcMemberLevel(9, 512).then(async (stair9) => {
        if (stair9.result.length > 0) {
          let royalty_amt_for_stair9 = (response.result * 0.03) / stair9.result.length;
          let a = stair9.result.map(async (it) => {
            console.log("IT9 :: ", royalty_amt_for_stair9, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair9)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair9.result.length)
        }
      })

      // Stair 10 Royalty Send 

      await calcMemberLevel(10, 1024).then(async (stair10) => {
        if (stair10.result.length > 0) {
          let royalty_amt_for_stair10 = (response.result * 0.03) / stair10.result.length;
          let a = stair10.result.map(async (it) => {
            console.log("IT10 :: ", royalty_amt_for_stair10, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair10)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair10.result.length)
        }
      })

      // Stair 11 Royalty Send 

      await calcMemberLevel(11, 2048).then(async (stair11) => {
        if (stair11.result.length > 0) {
          let royalty_amt_for_stair11 = (response.result * 0.03) / stair11.result.length;
          let a = stair11.result.map(async (it) => {
            console.log("IT11 :: ", royalty_amt_for_stair11, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair11)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair11.result.length)
        }
      })

      // Stair 12 Royalty Send 

      await calcMemberLevel(12, 4096).then(async (stair12) => {
        if (stair12.result.length > 0) {
          let royalty_amt_for_stair12 = (response.result * 0.03) / stair12.result.length;
          let a = stair12.result.map(async (it) => {
            console.log("IT12 :: ", royalty_amt_for_stair12, it.user)
            royalty_inc_func(it.user, royalty_amt_for_stair12)
          })
          Promise.all(a);
        } else {
          console.log("No value :: ", stair12.result.length)
        }
      })

    });

    // return res.json(response.result);
  } else {
    return res.json("Date not matched!");
  }



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
    `Select * from Withdrawn where user='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 0, err: err });
      return res.json({
        status: 1,
        result: result,
      });
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