const Web3 = require("web3");
const express = require("express");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const cors = require("cors");
const app = express();
const mysql = require('mysql');

app.use(express.json());
app.use(cors());

const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

const dexABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"PriceChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"referrer","type":"address"},{"indexed":true,"internalType":"uint256","name":"userId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"referrerId","type":"uint256"}],"name":"Registration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint8","name":"package","type":"uint8"}],"name":"Upgrade","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"sender","type":"address"},{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint8","name":"level","type":"uint8"},{"indexed":false,"internalType":"string","name":"_for","type":"string"}],"name":"UserIncome","type":"event"},{"inputs":[{"internalType":"uint256","name":"bdltInUsd","type":"uint256"}],"name":"ChangePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"TIME_STEP","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"},{"internalType":"uint8","name":"package","type":"uint8"}],"name":"UpgradePackage","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint8","name":"","type":"uint8"}],"name":"defaultPakcage","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"dev","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"userAddress","type":"address"}],"name":"getUserDividends","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"idToAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_ownerAddress","type":"address"},{"internalType":"address","name":"_devwallet","type":"address"},{"internalType":"uint256","name":"bdltInUsd","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"user","type":"address"}],"name":"isUserExists","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUserId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"referrerAddress","type":"address"},{"internalType":"uint8","name":"package","type":"uint8"}],"name":"registrationExt","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"users","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"referrer","type":"address"},{"internalType":"uint256","name":"partnersCount","type":"uint256"},{"internalType":"uint256","name":"checkpoint","type":"uint256"},{"internalType":"uint256","name":"withdrawn","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amt","type":"uint256"},{"internalType":"address payable","name":"adr","type":"address"}],"name":"withdrawETH","outputs":[],"stateMutability":"payable","type":"function"}];

const contract_address = "0x16e00Ed356eF9f2B6A146042BEb318Df52973708";
const contract = new web3.eth.Contract(dexABI, contract_address);

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
  });


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
      j = 0;
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
      if (event === "ClubBuy") {
        conn.query(
          `Update Registration SET club_expiredAt = '${result[i]["returnValues"]["_expireAt"]}' Where user='${result[i]["returnValues"]["user"]}'`,
          function (err, result) {
            if (err) throw err;
          }
        );
      }
      if (event === "UpgradePackage") {
        conn.query(
          `Update Registration SET __package = '${result[i]["returnValues"]["package"]}',withdrawal='0'  Where user='${result[i]["returnValues"]["user"]}'`,
          function (err, result) {
            if (err) throw err;
          }
        );
      }
      i++;
    }
  }
  return { csql: csql_arr, sql: sql_arr, result };
}

app.post("/api/user", checkUser, (req, res) => {
  user = req.body.user;
  conn.query(
    `Select * From Registration Where user='${user}'`,
    function (err, result) {
      if (err) res.json({ status: 0, err: err });
      return res.status(200).json({
        id: result[0].userId,
        user: user,
        referrer: result[0].referrer,
        direct: result[0].direct_sponser,
        currentPackage: result[0].__package,
        join_timestamp: result[0].block_timestamp,
        club_expiry: result[0].club_expiredAt,
        totalWithdraw: result[0].withdrawal,
        available_income: round(
          Number(result[0].community) +
            Number(result[0].club) +
            Number(result[0].leadership) +
            Number(result[0].levelIncome)
        ),
        communityIncome: round(result[0].community),
        clubIncome: round(result[0].club),
        leadershipIncome: round(result[0].leadership),
        levelIncome: round(result[0].levelIncome),
      });
    }
  );
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

app.post("/api/level-income", checkUser, (req, res) => {
  user = req.body.user;
  conn.query(
    `Select user From Registration Where referrer='${user}'`,
    function (err, result1) {
      if (err) res.json({ status: 0, err: err });
    }
  );
});

app.post("/api/withdraw-history", checkUser, (req, res) => {
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

app.post("/api/view", function (req, res) {
  let userId = req.body.user_id;
  conn.query(
    `SELECT * from Registration where userId=${userId}`,
    function (err, result) {
      if (err)
        res.json({
          status: 0,
          msg: err,
        });
      if (result.length)
        res.json({
          status: 1,
          id: userId,
          user: result[0].user,
        });
      else
        res.json({
          status: 0,
          msg: "User not Exist",
        });
    }
  );
});

app.post("/api/income", checkUser, async (req, res) => {
  let user = req.body.user;
  conn.query(
    `Select * From income Where user='${user}'`,
    function (err, result) {
      if (err) return res.json({ status: 0, msg: err });
      else {
        conn.query(
          `Select * From LevelDistribution where user='${user}'`,
          function (err, data) {
            if (err) return res.json({ status: 0, msg: err });
            return res.json({
              status: 1,
              result: [
                ...result.map((d) => {
                  return {
                    type: d.type,
                    amount: round(Number(d.amount)),
                    timestamp: parseInt(new Date(d.date) / 1000),
                  };
                }),
                ...data.map((d) => {
                  return {
                    type: "Level " + d.level,
                    amount: round(Number(d._amt) / 1e18),
                    timestamp: d.block_timestamp,
                  };
                }),
              ],
            });
          }
        );
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
            toBlock: Number(result[0].latest_block) + 1000,
          })
          .then(async (events) => {
            let resu = await generateEventQuery(events);
            if (
              parseInt(result[0].latest_block) + 1000 <
              parseInt(current_block)
            ) {
              conn.query(
                `UPDATE eventBlock SET latest_block ='${
                  parseInt(result[0].latest_block) + 1000
                }'`,
                function (err, result) {
                  if (err) throw err;
                  console.log("Executed::", result);
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