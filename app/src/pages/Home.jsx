import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { NotificationManager } from "react-notifications";
import { BiSupport } from "react-icons/bi";
import { useSelector } from "react-redux";
import {
  BsTelegram,
  BsWhatsapp,
  BsFacebook,
  BsInstagram,
} from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import {BiCopy} from "react-icons/bi"


// import { CONTRACT_ADDRESS } from "../HelperFunction/config"
import {
  getIncome,
  getTeam,
  getUserInfo,
  getWithdraw,
  onConnect,
  royaltyWithdraw,
  userIdByWallet,
  globalStat,
  getRequiredMembers,
} from "../HelperFunction/script";
import {
  onConnectTron,
  CONTRACT_ADDRESS,
  getTronContract,
} from "../HelperFunction/tronhelperFunction";

export default function Home() {
  const state = useSelector((state) => state);
  const [wallet_address, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [team, setTeam] = useState([]);
  const [requiredMember, getRequiredMember] = useState([]);
  const [income, setIncome] = useState([]);
  const [withdrawalAmt, setWithdrawAmt] = useState(0);
  const [withdraw, setWithdraw] = useState([]);
  const [contract, setContract] = useState("");
  const [joinAmount, setjoinAmount] = useState(100);
  const [ref_id, setref_id] = useState(0);
  const [levelIncome, setLevelIncome] = useState(0);
  const [directIncome, setDirectIncome] = useState(0);
  const [joiningPackage, setJoiningPackage] = useState(0);
  const [refferer, setRefferer] = useState("0x00");
  const [royaltyWallet, setRoyaltyWallet] = useState(0);
  const [roi, setRoi] = useState(0);
  const [direct_sponcer, setDirectSponcer] = useState(0);
  const [reflect, setReflect] = useState(true);
  const [ref_id1, setref_id1] = useState();
  const [spin, setspin] = useState("");
  const [spin2, setspin2] = useState("");
  const [spin3, setspin3] = useState("");
  const [vsi, setvsi] = useState(0);
  const [show, setShow] = useState(false);
  const [total_member, setTotalmember] = useState(0);
  const [total_investment, setTotalInv] = useState(0);
  const [total_withdraw, setTotalWithdraw] = useState(0);
  const [price, setPrice] = useState(0);
  const [avlIncome, setAvlIncome] = useState(0);
  const [disable, setdisable] = useState(false);
  const [viewmode, setViewMode] = useState(1);
  const [viewmodeflag, setViewModeFlag] = useState(0);
  const [smartBalance, setSmartBalance] = useState(0);
  const [userInvestment, setUserInvestment] = useState({
    userID: 0,
    referBy: 0,
    referByAddress: "0x000000000000000000000000000000000000000",
    UserAmount: 0,
    UserWithdrawl: 0,
    userLastTimeRestakingAmount: 0,
    totaldirect: 0,
    totalIncentiveEarned: 0,
    oldUser: false,
    totalAmountInvested: 0,
    totalWithdrawlAMount: 0,
  }); 
  const[topDAta,setTopData] =useState({globalCommunity:0,totalInvestment:0,totalWithdrawl:0})
  const [tTable,setTTable] = useState([])
  

  const ref_addr = window.location.href;
  const reflink = useRef();


  function round(number) {
    return Math.round(number * 1000) / 1000;
  }

  useEffect(() => {
    const url_address = window?.frames?.location?.href;
    // console.log("url address: ", url_address.split("?"), window);
    const url = url_address ? url_address.split("?")[1] : "";
    // console.log("embue1::", url_address);
    if (url && url.length > 21) {
      setWalletAddress(url);
    }

    console.log("Referrer Id", ref_addr);
    let nnnnn = ref_addr.split("?referralId=");
    setref_id1(nnnnn[1]);
    globalStat()
      .then((d) => {
        console.log("global Data", d);
        setTotalmember(d.result.totalUser);
        setTotalInv(d.result.totalPayout);
        setPrice(d?.price ?? 0);
        setSmartBalance(d?.contract_balance);
        setTotalWithdraw(d?.withdraw ?? 0);
      })
      .catch((e) => console.log(e));

      // try {
      //   (async()=>{
        
      //     await onConnectTron().then((d) => {
      //       setBalance(d.walletBalance);
  
      //       setContract(d?.contract);
      //       setWalletAddress(d.walletAddress);
      //       setJoiningPackage(d?.joiningPackage);
      //       setSmartBalance(d.contract_balance);
      //     });
      //   })()
        
      // } catch (error) {
      //   console.log(error)
      // }
     

 
   
  }, []);
 useEffect(()=>{
  console.log(wallet_address,"aasfas");
  if(wallet_address){
 ( async () => {
    const t = await getTronContract();
     t.userInvestmentDetail(wallet_address).call().then((d) => {
     
      setUserInvestment({
        userID: Number(d?.userID._hex),
        referBy: Number(d?.referBy._hex),
        referByAddress: d?.referByAddress,
        UserAmount:Number (d?.UserAmount._hex),
        UserWithdrawl:Number (d?.UserWithdrawl._hex),
        userLastTimeRestakingAmount:Number (d?.userLastTimeRestakingAmount._hex),
        totaldirect: Number(d?.totaldirect._hex),
        totalIncentiveEarned: Number(d?.totalIncentiveEarned._hex),
        oldUser: d?.oldUser,
        totalAmountInvested: Number(d?.totalAmountInvested._hex),
        totalWithdrawlAMount: Number(d?.totalAmountInvested._hex),
      })
     
    });
     const investment = await t.totalInvestment().call()
  const withdrawal =  await t.totalWithdrwal().call()
   const lastId =  await t.idProvider().call()
    console.log( (Number(lastId._hex)-1)-3999,"lastId");
    setTopData({globalCommunity:(Number(lastId._hex)-1)-3999,totalInvestment:Number(investment._hex/1e6),totalWithdrawl:Number(withdrawal._hex/1e6)})
    // let tab =[]
    // for(var i=1; i<=6;i++){
    //   const table = await t.getTableData(1,wallet_address).call()
    // tab = [...tab,table]
    // }
    // setTTable(tab)
  })()
}
 },[wallet_address,reflect])



 

  let j = 2;
  const requiredmembercolumn = [
    {
      name: "Level",
      selector: (row) => row.level,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Required Members",
      selector: (row) => row.required_member + " Members",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Actual Members",
      selector: (row) => row.total_member + " Members",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Target Status",
      selector: "vip2",
      sortable: true,
      cell: (data) => (
        <span
          className={`badge text-white ${
            data.total_member > data.required_member
              ? "bg-success"
              : "bg-danger"
          }`}
        >
          {data.total_member > data.required_member
            ? "Achieved"
            : "Not Achieved"}
        </span>
      ),
    },
  ];

  const teamcolumn = [
    {
      name: "Stair",
      selector: (row) => row.level,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },

    {
      name: "User Id",
      selector: (row) => row.user_id,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Wallet Address",
      selector: (row) => (
        <a
          href={`https://explorer.bdltscan.io/address/${row.user}/transactions`}
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          {row.user
            ? row.user.substr(0, 7) + "......." + row.user.substr(35, 43)
            : "--"}
          <FiExternalLink size={18} className="mx-1 pb-1" color="white" />
        </a>
      ),
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },

    {
      name: "Timestamp",
      selector: (row) => row.registration_date,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
  ];

  const incomecolumn = [
    {
      name: "Stair",
      selector: (row) => row.level,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Sender",
      selector: (row) => (
        <a
          href={`https://explorer.bdltscan.io/address/${row.sender}/transactions`}
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          {row.sender
            ? row.sender.substr(0, 7) + "......." + row.sender.substr(35, 43)
            : "--"}
          <FiExternalLink size={18} className="mx-1 pb-1" color="white" />
        </a>
      ),
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Amount",
      selector: (row) => (Number(row.amount) / 1e18).toFixed(2) + " BDLT",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Income Type",
      selector: (row) =>
        row._for == "direct_sponcer" ? "Sponsor Income" : "Stair Income",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Timestamp",
      selector: (row) =>
        new Date(Number(row.block_timestamp) * 1000).toLocaleString(),
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },

    {
      name: "Transaction Id",
      selector: (row) => (
        <a
          href={`https://explorer.bdltscan.io/tx/${row.transaction_id}/internal-transactions`}
          target="_blank"
          style={{ color: "white", textDecoration: "none" }}
        >
          {row.transaction_id
            ? row.transaction_id.substr(0, 10) +
              "......." +
              row.transaction_id.substr(
                row.transaction_id.length - 10,
                row.transaction_id.length
              )
            : "--"}
          <FiExternalLink size={18} className="mx-1 pb-1" color="white" />
        </a>
      ),
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
  ];

  // const withdrawcolumn = [
  //   {
  //     name: "SR No.",
  //     selector: (row, i) => i + 1,
  //     sortable: true,
  //     style: {
  //       backgroundColor: "transparent",
  //       color: "rgba(63, 195, 128, 0.9)",
  //     },
  //   },
  //   {
  //     name: "Amount",
  //     selector: (row) => (Number(row.amount) / 1e18).toFixed(2) + " BDLT",
  //     sortable: true,
  //     style: {
  //       backgroundColor: "transparent",
  //       color: "black",
  //     },
  //   },
  //   {
  //     name: "Timestamp",
  //     selector: (row) => new Date(Number(row.block_timestamp) * 1000).toLocaleString(),
  //     sortable: true,
  //     style: {
  //       backgroundColor: "transparent",
  //       color: "black",
  //     },
  //   },

  //   {
  //     name: "Transaction Id",
  //     selector: (row) => (
  //       <a
  //         href={`https://explorer.bdltscan.io/tx/${row.transaction_id}/internal-transactions`}
  //         target="_blank"
  //         style={{ color: "white", textDecoration: "none" }}
  //       >
  //         {
  //           row.transaction_id
  //             ? row.transaction_id.substr(0, 10) +
  //             "......." +
  //             row.transaction_id.substr((row.transaction_id).length - 10, (row.transaction_id).length)
  //             : "--"}
  //         <FiExternalLink size={18} className="mx-1 pb-1" color="white" />

  //       </a>
  //     ),
  //     sortable: true,
  //     style: {
  //       backgroundColor: "transparent",
  //       color: "black",
  //     },
  //   },
  // ];

  // const customStyles = {
  //   rows: {
  //     style: {
  //       minHeight: "52px", // override the row height
  //     },
  //   },
  //   headCells: {
  //     style: {
  //       fontSize: "14px",
  //       fontWeight: "500",
  //       textTransform: "uppercase",
  //       paddingLeft: "0 8px",
  //     },
  //   },
  //   cells: {
  //     style: {
  //       fontSize: "14px",
  //       paddingLeft: "0 8px",
  //     },
  //   },
  // };

  useEffect(() => {
    if (wallet_address) {
      // getUserInfo(wallet_address)
      //   .then((d) => {
      //     console.log(d);
      //     if (d.status == 1) {
      //       setref_id(d.data.id);
      //       setDirectIncome(
      //         d.data.sponcerIncome
      //           ? round(Number(d.data.sponcerIncome) / 1e18)
      //           : 0
      //       );
      //       setLevelIncome(
      //         d.data.levelIncome ? round(Number(d.data.levelIncome) / 1e18) : 0
      //       );
      //       setRoi(
      //         d.roi
      //           ? Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000
      //           : 0
      //       );
      //       setRefferer(d.data.referrer);
      //       console.log("Royalty Wallet :: ", d.result[0].royalty_wallet)
      //       setRoyaltyWallet(d.result[0].royalty_wallet);
      //       setjoinAmount(d.data.joiningAmt);
      //       setDirectSponcer(d.data.partnersCount);
      //       setWithdrawAmt(
      //         d.data.withdrawn ? round(Number(d.data.withdrawn) / 1e18) + d.withdraw : 0
      //       );
      //       console.log((Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000) + Number(d.result[0].royalty_wallet))
      //     } else {
      //       console.log("Error:::", d.err);
      //     }
      //   })
      //   .catch((e) => {
      //     console.log(e);
      //   });
      // getRequiredMembers(wallet_address).then((ss) => {
      //   if (ss) {
      //     getRequiredMember(ss);
      //   }
      // }).catch((e) => {
      //   console.log(e);
      // });
      // getTeam(wallet_address).then((ss) => {
      //   if (ss) {
      //     setTeam(ss);
      //   }
      // }).catch((e) => {
      //   console.log(e);
      // });
      // getIncome(wallet_address).then((ss) => {
      //   if (ss) {
      //     setIncome(ss.result);
      //   }
      // }).catch((e) => {
      //   console.log(e);
      // });
      // getWithdraw(wallet_address).then((ss) => {
      //   if (ss) {
      //     console.log("DATA :: ", ss);
      //     setWithdraw(ss.result);
      //   }
      // }).catch((e) => {
      //   console.log(e);
      // });
    }
   
  }, [wallet_address]);

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

  async function onRegistration() {
    const tContract = await getTronContract();
    setspin("spinner-border spinner-border-sm");
    try {
      if (balance >= joinAmount) {


        console.log(
          "refferal Id::",
          ref_id1,
          joinAmount,
          wallet_address,
          contract
        );
        tContract
          .isExist(ref_id1)
          .call()
          .then((is_exist) => {
            console.log(is_exist, "is_exist");
            if (is_exist) {
              console.log(ref_id1, "ref_id1");
              tContract
                .userInvestmentDetail (wallet_address)
                .call()
                .then((d) => {
                  console.log(
                    
                    wallet_address ,d ,"userInvestmentDetail"
                  );
                  if (d?.oldUser==false) {
                    if(Number.isInteger(Number(ref_id1))==true){
                   const invest =  tContract
                      .Invest(10000000,ref_id1)
                      .send({
                        feeLimit: 80000000,
                        callValue: 10000000,
                      })
                      .then(async (d) => {
                        console.log(d, "ddd");
                        setspin("");
                        setdisable(false);
                        setReflect(!reflect);
                        const transaction =
                          await window.tronWeb.trx.getTransaction(d);
                        console.log(
                          transaction.ret[0].contractRet,
                          transaction,
                          "transaction"
                        );
                        if (transaction.ret[0].contractRet == "REVERT") {
                          NotificationManager.error("Execution Reverted.");
                        }else if(transaction.ret[0].contractRet == "SUCCESS"){
                          NotificationManager.success("Transaction Successfull.");
                        }else{
                          NotificationManager.info(transaction.ret[0].contractRet)
                        }
                      })
                     
                      .catch((e) => {
                        console.log("Error :: ", e);
                        setspin("");
                        setdisable(false);
                        setReflect(!reflect);
                      });
                    }else{
                      NotificationManager.error(
                        "Invalid UserId",
                        "Transaction Detail"
            
                      ); 
                    }
                  } else {
                    NotificationManager.error(
                      "User Already Exists.",
                      "Transaction Detail"
          
                    );
                    setspin("");
                    setdisable(false);
                    setReflect(!reflect);
                  }
                })
                .catch((e) => {
                  console.log("Error:: ", e);
                  NotificationManager.error(e);
                  setspin("");
                  setdisable(false);
                });
            } else {
              NotificationManager.error("Referral not exists.", "Invalid Referral");
              setspin("");
              setdisable(false);
            }
          })
          .catch((e) => {
            console.log(e);
            setspin("");
            setdisable(false);
          });
      } else {
        NotificationManager.error("Low Balance ", "Error");
        setspin("");
        setdisable(false);
      }
    } catch (error) {
      alert(error);
    }
    // balance >= joinAmount
  }

  async function onRoyaltyWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info("Withdraw is not available in view mode!");
    } else {
      setspin3("spinner-border spinner-border-sm");
      royaltyWithdraw(wallet_address)
        .then((d) => {
          if (d.status) {
            NotificationManager.info(d.result);
          }
          console.log("Data:", d);
          setspin3("");
          setReflect(!reflect);
        })
        .catch((e) => {
          console.log("Error:: ", e);
          setspin3("");
          setReflect(!reflect);
        });
    }
  }

  async function openViewMode(viewmode) {
    const close = document.getElementById("closeModal");
    setspin3("spinner-border spinner-border-sm");
    userIdByWallet(viewmode)
      .then((d) => {
        if (d.status) {
          close.click();
          setWalletAddress(d.result[0].user);
          setViewModeFlag(1);
          setspin3("");
          setReflect(!reflect);
        } else {
          NotificationManager.info("No ID found!");
        }
      })
      .catch((e) => {
        setspin3("");
        setReflect(!reflect);
      });
  }

  async function exitViewMode() {
    window.location.reload(false);
  }

  async function onWithdraw() {
    const tContract = await getTronContract();
    // if (viewmodeflag) {
    //   NotificationManager.info(
    //     "Withdraw is not available in view mode!"
    //   );
    // } else {
   
    if(wallet_address){
      setspin3("spinner-border spinner-border-sm");
      console.log(wallet_address,"wallet")
     if(userInvestment.totalIncentiveEarned>=Number(withdrawalAmt)){
     console.log(userInvestment.totalIncentiveEarned,Number(withdrawalAmt),"amt")

      await tContract
      ?.Withdraw(withdrawalAmt*1e6)
      .send({ feeLimit: 5000000, callValue: 0 })
      .then(async (d) => {
        console.log("Data12:", d);
        setspin3("");
        setReflect(!reflect);
        const transaction = await window.tronWeb.trx.getTransaction(d);
        console.log(transaction, "transaction12");
        if (transaction.ret[0].contractRet == "OUT_OF_ENERGY") {
          NotificationManager.error(transaction.ret[0].contractRet);
        }else{
          NotificationManager.success("Withdrawal Successfull","Transaction Detail");
        }
      })
      .catch((e) => {
        console.log("Error:: ", e);
        NotificationManager.error(e);
        setspin3("");
        setReflect(!reflect);
        NotificationManager.error(e);
      });
     }else{
      NotificationManager.info("Entered wrong incentive amount.")
      setspin3("")
     }


    }else{
      NotificationManager.info("wallet not connected")
      setspin3("")
    }

    // }
  }

  return (
    <>
      <div className="container text-center mt-4">
        <div className="row">
          <div
            className="col-md-12 col-sm-12 col-lg-6 d-flex justify-content-start  "
            style={{ fontSize: "30px" }}
          >
            <img
              src="./img/logo.png"
              className="img img-fluid"
              style={{ width: "250px" }}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6">
            <div className="row justify-content-end">
              {/* <div
                className="col-md-6 col-lg-6 col-sm-12 asm d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a class="grad_btn btn-block text-light my-2" style={{fontSize:"0.875rem"}} onClick={()=>onConnectTron()}>
                  <img class="mr-1" width={24} src="./img/logo.abadbf5d.svg" alt="TronLink"/> Add to TronLink
                </a>

              </div> */}
              <div
                className="col-md-6 col-lg-6 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                 href="/www.supertron.club.pdf"
                  className="grad_btn btn-block text-light my-2 "
                  style={{ padding: "10px 55px" }}
                  target="_blank"
                >
                  Download Plan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container main_banner position-relative">
        <img src="./img/earth.png" alt="" />

      </div> */}

      <section className="banner_section pt_50 pb_50 mt-5">
        <div className="container">
          <div className="banner_text text-center middle_text">
            <h1 className="tirw">SuperTron COMMUNITY DEVELOPMENT PROGRAM</h1>
            {/* <h5>BDLT COMMUNITY DEVELOPMENT PROGRAM</h5> */}
            <p>
              {" "}
              Supertron is a crowd funding market with a unique platform which
              brings the transparency with the secured and promising network.
              All Funds are store in Smart Contract and members can withdraw
              their reward directly from Smart contract.
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row cus_row">
            <div className=" col-12  ">
              <div className="Personal_Details_inner Personal_Details_inner_large position-relative ">
              <img src="/img/Asset3.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4> Smart Contract Address </h4>
                <h5>
                  <a
                    href={`https://shasta.tronscan.org/#/contract/${CONTRACT_ADDRESS}/transactions`}
                    target={"_blank"}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {CONTRACT_ADDRESS.substr(0, 5)}....
                    {CONTRACT_ADDRESS.substr(-8)}
                    <FiExternalLink
                      size={18}
                      className="mx-1 pb-1"
                      color="white"
                    />
                  </a>
                </h5>
                </div>
              </div>
            </div>

            {/* <div className="col-md-6 col-sm-6 col-12">
              <div className="Personal_Details_inner">
                <h4>Contract Balance </h4>
                <h5>{round(smartBalance)} trx</h5>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <section className="pb_50">
        <div className="container">
          <div className="row cus_row justify-content-center">
            <div className="col-md-4 col-sm-3 col-12">
              <div className="Personal_Details_inner Personal_Details_inner_sm position-relative">
                <img src="/img/Asset1.png" alt="img" className="position-absolute img-fluid" style={{top:"0px", left:"0px",width:"100%"}}/>
                <div className="position-relative index ">
                <h4>Global Community</h4>
                <h5>{topDAta?.globalCommunity}+</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-3 col-12">
              <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute img-fluid" style={{top:"0px", left:"0px",width:"100%"}}/>
              <div className="position-relative index ">
                <h4> Total Investment </h4>
                <h5>{round(topDAta.totalInvestment)} trx</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-3 col-12">
              <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute img-fluid" style={{top:"0px", left:"0px",width:"100%"}}/>
              <div className="position-relative index ">
                <h4> Total Withdrawal Distributed</h4>
                <h5>{round(topDAta.totalWithdrawl)} trx</h5>
                </div>
              </div>
            </div>
            {/* <div className="col-md-3 col-sm-3 col-6">
              <div className="Personal_Details_inner">
                <h4>Available Balance </h4>
                <h5>$ {round(price)}</h5>
              </div>
            </div> */}
          </div>
        </div>
      </section>
      {ref_id == 0 ? (
        <section className="pt_50 pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>

          <div className="container">
            <div className="all_heading text-center">
              <h2>
                <span>Join Us now</span>&nbsp;
              </h2>
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h6 style={{ fontWeight: 600, color: "#17b895" }}>
                  Wallet address -{" "}
                  <span style={{ fontSize: "15px", color: "#fff" }}>
                    {wallet_address
                      ? wallet_address.substr(0, 10) +
                        "......." +
                        wallet_address.substr(25) 
                      : "Press Refresh for Wallet Address if TronLink is connected"}
                     
                  </span>
                </h6>
                {!wallet_address ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      if(window.tronWeb != undefined){
                      onConnectTron().then((d) => {
                        setBalance(d.walletBalance);

                        setContract(d?.contract);
                        setWalletAddress(d.walletAddress);
                        setJoiningPackage(d?.joiningPackage);
                        setSmartBalance(d.contract_balance);
                      });
                    }else{
                      NotificationManager.info("TronLink Wallet is not installed.","Info")
                    }
                    }}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div
                  className="text-light"
                  style={{ margin: "10px 0px", fontSize: "15px" }}
                >
                  <span style={{ fontWeight: 600, color: "#17b895" }}>
                    {" "}
                    Wallet Balance:{" "}
                  </span>
                  {" " + balance + " "} trx &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                  <span style={{ fontWeight: 600, color: "#17b895" }}>
                    Joining Package{" "}
                  </span>
                  {": " + 100} trx
                  {/* ($ 100) */}
                </div>
                <div className="col-md-8 col-lg-8 col-sm-8">
                  <div className="form-group">
                    {ref_id != 0 ? null : (
                      <input
                        className="cus_input"
                        type="text"
                        name="sponsor_address"
                        placeholder="Enter Refferer Id "
                        onChange={(e) => {
                          setref_id1(e.target.value);
                        }}
                        value={ref_id1 ? ref_id1 : ""}
                      />
                    )}
                  </div>
                </div>
                <div className="col-md-4 col-lg-4 col-sm-4">
                  <div className="form-group">
                    {ref_id != 0 ? null : (
                      <button
                        className="grad_btn btn-block"
                        style={{ padding: "10px 95px" }}
                        onClick={() => {
                          if (wallet_address) {
                            if (ref_id1) {
                              setdisable(true);
                              onRegistration(contract, wallet_address);
                            } else {
                              NotificationManager.info(
                                "Please provide Referral Id"
                              );
                            }
                          } else {
                            NotificationManager.info(
                              "Please Connect  Wallet!!"
                            );
                          }
                        }}
                        disabled={disable}
                      >
                        <span className={`${spin} mx-2`}></span>
                        Join Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="pt_50 pb_50">
          <div
            className="row"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          ></div>

          <div className="container">
            <div className="all_heading text-center">
              {/* <h2>
                <span></span>&nbsp;
              </h2> */}
              <div
                className="small_heading my-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h6>
                  Your Wallet address -{" "}
                  <span style={{ fontSize: "15px" }}>
                    {wallet_address
                      ? wallet_address.substr(0, 10) +
                        "......." +
                        wallet_address.substr(25)
                      : "Press Refresh for Wallet Address if Metamask is connected"}
                  </span>{" "}
                </h6>
                <h6>
                  Your Wallet Balance -{" "}
                  <span style={{ fontSize: "15px" }}>{balance ?? 0} trx</span>{" "}
                </h6>
                {viewmodeflag == 0 ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      // onConnect()
                      //   .then((d) => {
                      //     console.log(d);
                      //     setBalance(round(d?.balance));
                      //     setContract(d?.contract);
                      //     setWalletAddress(d?.userAddress);
                      //     setJoiningPackage(d?.joiningPackage);
                      //   })
                      //   .catch((e) => console.log(e));
                      onConnectTron().then((d) => {
                        setBalance(round(d?.balance));
                        setContract(d?.contract);
                        setWalletAddress(d?.userAddress);
                        setJoiningPackage(d?.joiningPackage);
                        setSmartBalance(d.contract_balance);
                      });
                    }}
                  >
                    Connect Wallet
                  </button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Dashboard</span>
            </h2>
          </div>
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
            <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4>User Id</h4>
                <h5>{userInvestment.userID}</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4> Total Direct </h4>
                <h5>{(userInvestment.totaldirect)}</h5>
              </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-4 col-12">
            <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4>Total Incentive Earned</h4>
                <h5>{userInvestment?.totalIncentiveEarned.toFixed(2)} trx</h5>
                </div>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-12">
            <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div>
                <h4>Referred By</h4>
                <h5>
                  {userInvestment.referByAddress.substr(0, 5)}......{userInvestment.referByAddress.substr(-8)}
                </h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
            <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4>Total Investment</h4>
                <h5>{(userInvestment.UserAmount/1e6).toFixed(2)} trx</h5>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
            <div className="Personal_Details_inner position-relative">
              <img src="/img/Asset1.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">
                <h4>Total Withdrawal</h4>
                <h5>
                  {
                   
                      (Number(userInvestment.totalWithdrawlAMount/1e6).toFixed(2) )
                  }{" "}
                  trx
                </h5>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Total Income</h4>
                <h5>{round((roi ? Number(roi) : 0) + (royaltyWallet ? Number(royaltyWallet) : 0) + Number(withdrawalAmt)).toFixed(2)} trx</h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner">
                <h4>Total Withdrawal</h4>
                <h5>{round(withdrawalAmt ? Number(withdrawalAmt).toFixed(2) : 0)} trx</h5>
              </div>
            </div>
          </div> */}
           <div className="row cus_row">

           <div className="col-md-6 col-sm-12 col-lg-6">
              <div
                className="Personal_Details_inner Personal_bg  Personal_Details_inner_large position-relative"
                style={{ minHeight: "50px" }}
              >
                 <img src="/img/Asset3.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">

                <h4 className="text-center">My Community:</h4>
                   <h5>0</h5>
                    </div>
                 
              </div>
            </div>

            <div className="col-md-6 col-sm-12 col-lg-6">
              <div
                className="Personal_Details_inner Personal_bg  Personal_Details_inner_large position-relative"
                style={{ minHeight: "50px" }}
              >
                 <img src="/img/Asset3.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div className="position-relative index ">

                <h4 className="text-center">Referral Link:</h4>
                
                
                
                
                  {/* <a href={ `http://localhost:3000?referralId=${userInvestment?.userID}`} >{ `http://localhost:3000?referralId=${userInvestment?.userID}`} 
                  <FiExternalLink
                      size={18}
                      className="mx-1 pb-1"
                      color="white"
                    /></a> */}
                    <span style={{color:"#fff", fontSize:"20px", cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText(`http://localhost:3000?referralId=${userInvestment?.userID}`).then((d)=>{NotificationManager.success("Text Copied")})}}>{ `http://localhost:3000?referralId=${userInvestment?.userID}`} 
                    <FiExternalLink
                      size={20}
                      className="mx-1 pb-1"
                      color="white"
                    /></span>
                    </div>
                 
              </div>
            </div>
           
            {/* <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Royalty Income</h4>
                <h5>{royaltyWallet ? royaltyWallet : 0} trx</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Royalty
                </button>
              </div>
            </div> */}
          </div>

          <div className="row cus_row">
            <div className="col-md-12 col-sm-12 col-lg-12">
            <div className="all_heading text-center">
            <h2>
              <span>Withdraw</span>
            </h2>
          </div>
              <div
                className="Personal_Details_inner Personal_bg withdraw_bg Personal_Details_inner_large"
                style={{ minHeight: "200px" }}
              >
                 <img src="/img/Asset3.png" alt="img" className="position-absolute" style={{top:"0px", left:"0px",width:"100%", height:"100%"}}/>
                <div > 
                {/* <h4 className="text-center">Withdraw</h4> */}
                <div className="row gy-2">
                  <div className="col-md-4 col-12">
                    <label>Total Earning:</label>
                    <br />
                    <input
                      type="number"
                      className="withdrawal_input_1 position-relative"
                      onChange = {(e)=>setWithdrawAmt(e.target.value?.trim())}
                      
                      value={withdrawalAmt}
                    />
                  </div>
                 
                  <div className="col-md-4 col-12">
                    <label>Withdrawable Amount:</label>
                    <br />
                    <input
                      type="text"
                      className="withdrawal_input"
                      disabled
                      value={(Number(withdrawalAmt) *(80/100))}
                    />
                  </div>
                  <div className="col-md-4 col-12">
                    <label>Reinvestment:</label>
                    <br />
                    <input
                      type="text"
                      className="withdrawal_input"
                      disabled
                      value={(Number(withdrawalAmt ) *(20/100))}
                    />
                  </div>
                </div>

                <button className={`grad_btn my-2`} onClick={onWithdraw}>
                <span className={`${spin3} mx-2`}></span>
                  Withdraw
                </button>
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Royalty Income</h4>
                <h5>{royaltyWallet ? royaltyWallet : 0} trx</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Royalty
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>My Team Downline </span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner table-responsive">
              {/* <div className="table-responsive gridtable">
                <DataTable
                  columns={requiredmembercolumn}
                  data={
                    requiredMember ? requiredMember.length > 0
                      ? requiredMember
                      : [] : []
                  }
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div> */}
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Level</th>
                    <th scope="col">Count</th>
                    <th scope="col">Investment</th>
                    <th scope="col">Bonus</th>
                    <th scope="col" className="text-center">
                      Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tTable && tTable.map((ele,i)=>{
                    return (<>
                     <tr>
                    <td>1</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      {" "}
                      <button className="grad_btn">View More</button>{" "}
                    </td>
                  </tr>
                    </>)
                  })}
                  <tr>
                    <td>1</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      {" "}
                      <button className="grad_btn">View More</button>{" "}
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      <button className="grad_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                    </td>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style = {{color:"#fff", listStyle:"none"}}>Team</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body d-flex justify-content-center">
        <ul className="d-flex justify-content-center flex-column" style = {{color:"#000", listStyle:"none", padding:"0px", fontSize:"20px"}}>
          <li style={{cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText('TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt').then(()=>{NotificationManager.info("Copied")})}}>TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt   <BiCopy size={20} className="mx-1 pb-1"  /></li>
          <li style={{cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText('TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt').then(()=>{NotificationManager.info("Copied")})}}>TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt   <BiCopy size={20} className="mx-1 pb-1"  /></li>
          <li style={{cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText('TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt').then(()=>{NotificationManager.info("Copied")})}}>TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt   <BiCopy size={20} className="mx-1 pb-1"  /></li>
          <li style={{cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText('TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt').then(()=>{NotificationManager.info("Copied")})}}>TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt   <BiCopy size={20} className="mx-1 pb-1"  /></li>
          <li style={{cursor:"pointer"}} onClick={()=>{navigator.clipboard.writeText('TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt').then(()=>{NotificationManager.info("Copied")})}}>TTK6TjtNgHNf91Crjn2qMr1PiV1zUAHcdt   <BiCopy size={20} className="mx-1 pb-1" /></li>
        </ul>
      </div>
     
    </div>
  </div>
</div>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      <button className="grad_btn " data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      <button className="grad_btn" data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      <button className="grad_btn " data-bs-toggle="modal" data-bs-target="#exampleModal">View More</button>
                    </td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>12</td>
                    <td>100</td>
                    <td>2</td>
                    <td className="d-flex justify-content-center">
                      <button className="grad_btn ">View More</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      {/*
      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Team Members</span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={teamcolumn}
                  data={
                    team ? team.length > 0
                      ? team
                      : [] : []
                  }
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Rewards</span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={incomecolumn}
                  data={
                    income ? income.length > 0
                      ? income
                      : [] : []
                  }
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Withdrawal History</span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <DataTable
                  columns={withdrawcolumn}
                  data={withdraw ? withdraw : []}
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Your Referral Link</span>
            </h2>
          </div>
          <div className="referal_inner text-center">
            {ref_id != 0 ? (
              <>
                <input
                  className="word-break refinpt"
                  ref={reflink}
                  defaultValue={`http://bdltcommunity.io/?ref_id=${ref_id}`}
                  style={{
                    background: "transparent",
                    color: "white",
                    border: "none",
                    outline: "none",
                    width: "100%",
                    textAlign: "center",
                    fontSize: "20px",
                  }}
                  readOnly={true}
                />
                <br />
                <button
                  title="copy Link"
                  className="grad_btn my-2"
                  onClick={() => {
                    reflink.current.select();
                    document.execCommand("copy");
                    // This is just personal preference.
                    // I prefer to not show the whole text area selected.
                  }}
                >
                  Copy Link
                </button>
                <div className="share-with">
                  <span>Share With</span>
                  <div className="py-2">
                    <a className="p-2 mx-2" href={`https://telegram.me/share/url?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`} target="_blank"><BsTelegram size={24} color="white" /></a>
                    <a className="p-2 mx-2" href={`whatsapp://send?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`} target="_blank"><BsWhatsapp size={24} color="white" /></a>
                    <a className="p-2 mx-2" href={`https://www.facebook.com/sharer/sharer.php?u=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`} target="_blank"><BsFacebook size={24} color="white" /></a>
                    <a className="p-2 mx-2" href={`https://www.instagram.com/?url=http://bdltcommunity.io/?ref_id=${ref_id}&text= Join BDLT Community`}><BsInstagram size={24} color="white" /></a>

                  </div>
                </div>
              </>
            ) : (
              <h5>Join first, then you can get your referral id.</h5>
            )}
          </div>
        </div>
      </section> */}

      <div>
        <section className="pb_50">
          <div className="container">
            <div className="all_heading text-center">
              <h2>
                <span>FAQS</span>
              </h2>
            </div>
            <div className="row  justify-content-center">
              <div className="col-md-8 col-12 ">
                <div
                  class="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div class="accordion-item my-4">
                    <h2 class="accordion-header" id="flush-headingOne">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        What is SuperTron?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingOne"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        SuperTron is an independent that runs in tandem with the
                        Tron Network. TRON is a decentralized, blockchain-based
                        operating system with smart contract functionality,
                        proof-of-stake principles as its consensus algorithm and
                        a cryptocurrency native to the system, known as Tronix
                        (TRX).
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item my-4">
                    <h2 class="accordion-header" id="flush-headingTwo">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Is Supertron need to register?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingTwo"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        To register you will need only a wallet Tron wallet - a
                        Google Chrome extension (PC) and/or some other
                        applications for mobile devices.
                      </div>
                    </div>
                  </div>
                  <div class="accordion-item my-4">
                    <h2 class="accordion-header" id="flush-headingThree">
                      <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        What is needed to participate in the project?
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      class="accordion-collapse collapse"
                      aria-labelledby="flush-headingThree"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        Enough to have nearly any device with access to the
                        Internet, smartphone, tablet, laptop or simply computer.
                        Installed on the device and recharged Tron wallet. For
                        communication with partners and support project
                        recommend to install Telegram.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer>
          <div class="container">
            <div class="mt_20">
              {/* <h2> TronLine</h2> */}
              <img
                src="./img/logo.png"
                className="img img-fluid"
                style={{ width: "220px", marginBottom: "10px" }}
              />
            </div>

            <div
              className="row"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="col-sm-12"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <a
                  style={{ borderRadius: "10px" }}
                  className="grad_btn px-3 text-light mx-2"
                  href={`https://shasta.tronscan.org/#/contract/${CONTRACT_ADDRESS}/transactions`}
                  target="_blank"
                >
                  {/* <img
                    src="/icon_lg.png"
                    className="mx-2"
                    style={{ width: "30px" }}
                  /> */}
                  Smart Contract info
                </a>
                <a
                  class="grad_btn my-3 mt-4"
                  href={`https://shasta.tronscan.org/#/contract/${CONTRACT_ADDRESS}/transactions`}
                  target="_blank"
                >
                  <span className="mx-2">
                    <BiSupport size={24} color="white" />
                  </span>
                  Support
                </a>
                <div
                  className="m-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background: "#da934a",
                    padding: "8px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <span className="mx-2">
                    <BsTelegram size={24} color="white" />
                  </span>
                  <a href="#" className="text-light" target="_blank">
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <p>
              © {new Date().getFullYear()} SuperTron Community | All Rights
              Reserved.{" "}
            </p>
          </div>
        </footer>
      




      </div>
    </>
  );
}
