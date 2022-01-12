async function get_upline_downline_incomes(req, res) {
  try {
    for (let i = 1; i < 1388; i++) {
    const investorId = 1386;
    const ddd = await Transaction.aggregate([{
        $match: {
          investorId: investorId,
          income_type: {
            $in: [
              "SPONSORING INCOME",
              "COMMUNITY LEVELUP INCOME",
              "VIP 1 SPONSOR INCOME",
              "VIP 2 SPONSOR INCOME",
              "VIP 3 SPONSOR INCOME",
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$total_income",
          },
        },
      },
    ]);
    const sss = await Withdrawlhistory.aggregate([{
        $match: {
          investorId: investorId,
          withdrawal_type: "INCOME WITHDRAWAL",
        },
      },
      {
        $group: {
          _id: null,
          sum: {
            $sum: "$total_amount",
          },
        },
      },
    ]);
    let resu = await Registration.findOne({
        investorId: investorId,
      },
      "wallet_amount"
    );
    console.log("INVESTOR ID::", investorId, " | ACTUAL WALLET AMOUNT::", Number(ddd[0].sum ? ddd[0].sum : 0 - sss[0].sum ? sss[0].sum : 0).toFixed(2), " | WALLET AMOUNT::", Number(resu.wallet_amount).toFixed(2))
    }
  } catch (error) {
    console.log("Error in get_upline_downline_incomes Record!", error.message);
  }
}
async function get_upline_downline_incomess(req, res) {
  try {
    for (let i = 1; i < 1388; i++) {
      const investorId = i;
      const ddd = await Transaction.aggregate([{
          $match: {
            investorId: investorId,
            income_type: {
              $in: [
                "SPONSORING INCOME",
                "COMMUNITY LEVELUP INCOME",
                "VIP 1 SPONSOR INCOME",
                "VIP 2 SPONSOR INCOME",
                "VIP 3 SPONSOR INCOME",
              ],
            },
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$total_income",
            },
          },
        },
      ]);
      const sss = await Withdrawlhistory.aggregate([{
          $match: {
            investorId: investorId,
            withdrawal_type: "INCOME WITHDRAWAL",
          },
        },
        {
          $group: {
            _id: null,
            sum: {
              $sum: "$total_amount",
            },
          },
        },
      ]);
      // let resu = await Registration.findOne({
      //     investorId: investorId,
      //   },
      //   "wallet_amount"
      // );
      let xx = Number(ddd[0].sum ? ddd[0].sum : 0 - sss[0].sum ? sss[0].sum : 0);
      await Registration.updateOne({
        investorId: investorId,
      }, {
        $set: {
          wallet_amount: xx,
        }
      });
      console.log("INVESTOR ID::", investorId, " | ACTUAL WALLET AMOUNT::", Number(ddd[0].sum ? ddd[0].sum : 0 - sss[0].sum ? sss[0].sum : 0).toFixed(2), " | WALLET AMOUNT::", Number(resu.wallet_amount).toFixed(2))

    }

  } catch (error) {
    console.log("Error in get_upline_downline_incomes Record!", error.message);
  }
}
get_upline_downline_incomes();



async function updateWallet(req, res) {
  try {
    await Withdrawlhistory.find({
      payout_status: 0,
      waddress: {
        $eq: null
      }
    }, "investorId").then((ddd) => {
      let a = ddd.map(async (it) => {
        await Registration.findOne({
          investorId: it.investorId
        }).then(async (ss) => {
          await Withdrawlhistory.updateMany({
            investorId: it.investorId,
            payout_status: 0
          }, {
            $set: {
              waddress: ss.waddress,
            }
          }).then((a) => {
            console.log("Data::", it.investorId, ss.waddress, a)
          })
        })
      })
      Promise.all(a)
    })
  } catch (error) {
    console.log("Error in get_upline_downline_incomes Record!", error.message);
  }
}