import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { BsTelegram, BsWhatsapp, BsFacebook, BsInstagram, } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

import { CONTRACT_ADDRESS } from "../HelperFunction/config"
import { getIncome, getTeam, getUserInfo, getWithdraw, onConnect, royaltyWithdraw, userIdByWallet, globalStat, getRequiredMembers } from "../HelperFunction/script";

export default function Home() {
  const state = useSelector((state) => state);
  const [wallet_address, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [team, setTeam] = useState([]);
  const [requiredMember, getRequiredMember] = useState([]);
  const [income, setIncome] = useState([]);
  const [withdrawalAmt, setWithdrawAmt] = useState(0);
  const [withdraw, setWithdraw] = useState([]);
  const [contract, setContract] = useState({});
  const [joinAmount, setjoinAmount] = useState(0);
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

  const ref_addr = window.location.href;
  const reflink = useRef();

  function round(number) {
    return Math.round(number * 1000) / 1000;
  }

  useEffect(() => {

    const url_address = window?.frames?.location?.href;
    // console.log("url address: ", url_address.split("?"), window);
    const url = url_address ? url_address.split("?")[1] : "";
    console.log("embue1::", url);
    if (url && url.length > 21) {
      setWalletAddress(url);
    }

    console.log("Referrer Id", ref_addr);
    let nnnnn = ref_addr.split("?ref_id=");
    setref_id1(nnnnn[1]);
    globalStat().then(d => {
      console.log("global Data", d);
      setTotalmember(d.result.totalUser);
      setTotalInv(d.result.totalPayout);
      setPrice(d?.price ?? 0);
      setSmartBalance(d?.contract_balance);
      setTotalWithdraw(d?.withdraw ?? 0);
    }).catch(e => console.log(e));
  }, []);
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
      cell: data => <span className={`badge text-white ${data.total_member > data.required_member ? 'bg-success' : 'bg-danger'}`}>{(data.total_member > data.required_member ? "Achieved" : "Not Achieved")}</span>
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
          {
            row.user
              ? row.user.substr(0, 7) +
              "......." +
              row.user.substr(35, 43)
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
          {
            row.sender
              ? row.sender.substr(0, 7) +
              "......." +
              row.sender.substr(35, 43)
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
      selector: (row) => row._for == "direct_sponcer" ? "Sponsor Income" : "Stair Income",
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Timestamp",
      selector: (row) => new Date(Number(row.block_timestamp) * 1000).toLocaleString(),
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
          {
            row.transaction_id
              ? row.transaction_id.substr(0, 10) +
              "......." +
              row.transaction_id.substr((row.transaction_id).length - 10, (row.transaction_id).length)
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

  const withdrawcolumn = [
    {
      name: "SR No.",
      selector: (row, i) => i + 1,
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
      name: "Timestamp",
      selector: (row) => new Date(Number(row.block_timestamp) * 1000).toLocaleString(),
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
          {
            row.transaction_id
              ? row.transaction_id.substr(0, 10) +
              "......." +
              row.transaction_id.substr((row.transaction_id).length - 10, (row.transaction_id).length)
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

  const customStyles = {
    rows: {
      style: {
        minHeight: "52px", // override the row height
      },
    },
    headCells: {
      style: {
        fontSize: "14px",
        fontWeight: "500",
        textTransform: "uppercase",
        paddingLeft: "0 8px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        paddingLeft: "0 8px",
      },
    },
  };

  useEffect(() => {
    if (wallet_address) {
      getUserInfo(wallet_address)
        .then((d) => {
          console.log(d);
          if (d.status == 1) {
            setref_id(d.data.id);
            setDirectIncome(
              d.data.sponcerIncome
                ? round(Number(d.data.sponcerIncome) / 1e18)
                : 0
            );
            setLevelIncome(
              d.data.levelIncome ? round(Number(d.data.levelIncome) / 1e18) : 0
            );
            setRoi(
              d.roi
                ? Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000
                : 0
            );
            setRefferer(d.data.referrer);
            console.log("Royalty Wallet :: ", d.result[0].royalty_wallet)
            setRoyaltyWallet(d.result[0].royalty_wallet);
            setjoinAmount(d.data.joiningAmt);
            setDirectSponcer(d.data.partnersCount);
            setWithdrawAmt(
              d.data.withdrawn ? round(Number(d.data.withdrawn) / 1e18) + d.withdraw : 0
            );
            console.log((Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000) + Number(d.result[0].royalty_wallet))
          } else {
            console.log("Error:::", d.err);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      getRequiredMembers(wallet_address).then((ss) => {
        if (ss) {
          getRequiredMember(ss);
        }
      }).catch((e) => {
        console.log(e);
      });
      getTeam(wallet_address).then((ss) => {
        if (ss) {
          setTeam(ss);
        }
      }).catch((e) => {
        console.log(e);
      });
      getIncome(wallet_address).then((ss) => {
        if (ss) {
          setIncome(ss.result);
        }
      }).catch((e) => {
        console.log(e);
      });
      getWithdraw(wallet_address).then((ss) => {
        if (ss) {
          console.log("DATA :: ", ss);
          setWithdraw(ss.result);
        }
      }).catch((e) => {
        console.log(e);
      });
    }
  }, [wallet_address, reflect]);

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
    setspin("spinner-border spinner-border-sm");
    // balance >= joinAmount
    if (balance >= joinAmount) {
      console.log("refferal Id::", ref_id1, joinAmount);
      contract.methods
        .isUserExists(wallet_address)
        .call()
        .then((is_exist) => {
          if (!is_exist) {
            contract.methods
              .idToAddress(ref_id1)
              .call()
              .then((d) => {
                console.log("Refferal Address ::", d);
                if (d !== "0x0000000000000000000000000000000000000000") {
                  contract.methods
                    .registrationExt(d)
                    .send({
                      from: wallet_address,
                      value: joiningPackage,
                      // value: 0,
                    })
                    .then((d) => {
                      setspin("");
                      setdisable(false);
                      setReflect(!reflect);
                    })
                    .catch((e) => {
                      console.log("Error :: ", e);
                      setspin("");
                      setdisable(false);
                      setReflect(!reflect);
                    });
                } else {
                  NotificationManager.error(
                    "Refferal Not Exist",
                    "Invalid Referrel"
                  );
                  setspin("");
                  setdisable(false);
                  setReflect(!reflect);
                }
              })
              .catch((e) => {
                console.log("Error:: ", e);
                setspin("");
                setdisable(false);
              });
          } else {
            NotificationManager.error("user already Join", "Already Exist");
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
  }

  async function onRoyaltyWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info(
        "Withdraw is not available in view mode!"
      );
    } else {
      setspin3("spinner-border spinner-border-sm");
      royaltyWithdraw(wallet_address)
        .then((d) => {
          if (d.status) {
            NotificationManager.info(
              d.result
            );
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
          NotificationManager.info(
            "No ID found!"
          );
        }
      })
      .catch((e) => {
        console.log("Error:: ", e);
        setspin3("");
        setReflect(!reflect);
      });
  }

  async function exitViewMode() {
    window.location.reload(false);
  }

  async function onWithdraw() {
    if (viewmodeflag) {
      NotificationManager.info(
        "Withdraw is not available in view mode!"
      );
    } else {
      setspin3("spinner-border spinner-border-sm");
      contract?.methods
        ?.withdraw()
        .send({ from: wallet_address, value: 0 })
        .then((d) => {
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

  return (
    <>
      <div className="container text-center mt-4">
        <div className="row">
          <div
            className="col-md-12 col-sm-12 col-lg-6"
            style={{ fontSize: "30px" }}
          >
            <img
              src="./img/logo-black.png"
              className="img img-fluid"
              style={{ width: "150px" }}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6">
            <div className="row">
              <div
                className="col-md-6 col-lg-6 col-sm-12 asm d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >

              </div>
              <div
                className="col-md-6 col-lg-6 col-sm-12 d-flex justify-content-center"
                style={{ flexDirection: "column" }}
              >
                <a
                  href="/BDLT.pdf"
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

      <section className="banner_section pt_50 pb_50 mt-5">
        <div className="container">
          <div className="banner_text text-center middle_text">
            <h1 className="tirw">BDLT COMMUNITY DEVELOPMENT PROGRAM</h1>
            {/* <h5>BDLT COMMUNITY DEVELOPMENT PROGRAM</h5> */}
            <p>
              {" "}
              World First Decentralized Program on BDLT Blockchain. All Funds
              are store in Smart Contract and members can withdraw their reward
              directly from Smart contract. Get 200% Return On Investment .
            </p>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4> Smart Contract Address </h4>
                <h5><a href={`https://explorer.bdltscan.io/address/${CONTRACT_ADDRESS}/contracts`} target={"_blank"} style={{ color: "white", textDecoration: "none" }}>{CONTRACT_ADDRESS.substr(0, 5)}....{CONTRACT_ADDRESS.substr(-8)}<FiExternalLink size={18} className="mx-1 pb-1" color="white" /></a></h5>
              </div>
            </div>

            <div className="col-md-6 col-sm-6 col-6">
              <div className="Personal_Details_inner">
                <h4>Contract Balance </h4>
                <h5>{round(smartBalance)} BDLT</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pb_50">
        <div className="container">
          <div className="row cus_row">
            <div className="col-md-3 col-sm-3 col-6">
              <div className="Personal_Details_inner">
                <h4>Total Community Member</h4>
                <h5>{total_member}+</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-6">
              <div className="Personal_Details_inner">
                <h4> Total Staking </h4>
                <h5>{round(total_investment)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-6">
              <div className="Personal_Details_inner">
                <h4> Total Withdrawal Distributed</h4>
                <h5>{round(total_withdraw)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-3 col-sm-3 col-6">
              <div className="Personal_Details_inner">
                <h4>BDLT Price </h4>
                <h5>$ {round(price)}</h5>
              </div>
            </div>
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
                <h6>
                  Wallet address -{" "}
                  <span style={{ fontSize: "15px" }}>
                    {wallet_address
                      ? wallet_address.substr(0, 10) +
                      "......." +
                      wallet_address.substr(25)
                      : "Press Refresh for Wallet Address if Metamask is connected"}
                  </span>{" "}
                </h6>
                {!wallet_address ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      onConnect()
                        .then((d) => {
                          console.log(d);
                          setBalance(round(d?.balance));
                          setContract(d?.contract);
                          setWalletAddress(d?.userAddress);
                          setJoiningPackage(d?.joiningPackage);
                        })
                        .catch((e) => console.log(e));
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
                  Wallet Balance: {" " + balance + " "} BDLT
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Joining Package{" "}
                  {": " + parseInt(joiningPackage / 1e18)} BDLT ($ 100)
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
                  <span style={{ fontSize: "15px" }}>
                    {balance ?? 0} BDLT
                  </span>{" "}
                </h6>
                {viewmodeflag == 0 ? (
                  <button
                    className="grad_btn btn-block mx-4"
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      onConnect()
                        .then((d) => {
                          console.log(d);
                          setBalance(round(d?.balance));
                          setContract(d?.contract);
                          setWalletAddress(d?.userAddress);
                          setJoiningPackage(d?.joiningPackage);
                        })
                        .catch((e) => console.log(e));
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
              <div className="Personal_Details_inner Personal_bg">
                <h4>User Id</h4>
                <h5>{ref_id}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4> Direct Sponsor </h4>
                <h5>{direct_sponcer}</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Referred By</h4>
                <h5>
                  {refferer.substr(0, 5)}......{refferer.substr(-8)}
                </h5>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Direct Sponsor Income</h4>
                <h5>{(directIncome).toFixed(2)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>Stair Income</h4>
                <h5>{(levelIncome).toFixed(2)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Total Available Income</h4>
                <h5>{round((roi ? Number(roi).toFixed(2) : 0) + (royaltyWallet ? Number(royaltyWallet).toFixed(2) : 0))} BDLT</h5>
              </div>
            </div>
          </div>
          {/* Third row */}
          <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Total Income</h4>
                <h5>{round((roi ? Number(roi) : 0) + (royaltyWallet ? Number(royaltyWallet) : 0) + Number(withdrawalAmt)).toFixed(2)} BDLT</h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner">
                <h4>Total Withdrawal</h4>
                <h5>{round(withdrawalAmt ? Number(withdrawalAmt).toFixed(2) : 0)} BDLT</h5>
              </div>
            </div>
          </div>
          {/* fourth row*/}
          <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Roi Income</h4>
                <h5>{Number(roi).toFixed(2)} BDLT</h5>
                <button className="grad_btn my-2" onClick={onWithdraw}>
                  Withdraw Roi
                </button>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Royalty Income</h4>
                <h5>{royaltyWallet ? royaltyWallet : 0} BDLT</h5>
                <button className="grad_btn my-2" onClick={onRoyaltyWithdraw}>
                  Withdraw Royalty
                </button>
              </div>
            </div>
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
            <div className="table_inner">
              <div className="table-responsive gridtable">
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
              </div>
            </div>
          </div>
        </div>
      </section>

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
      </section>

      <div>
        <footer>
          <div class="container">
            <div class="mt_20">
              {/* <h2> TronLine</h2> */}
              <img
                src="./img/logo-black.png"
                className="img img-fluid"
                style={{ width: "150px" }}
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
                  href={`https://explorer.bdltscan.io/address/${CONTRACT_ADDRESS}/contracts`}
                  target="_blank"
                >
                  <img
                    src="/icon_lg.png"
                    className="mx-2"
                    style={{ width: "30px" }}
                  />
                  Smart Contract info
                </a>
                {/* <a
                  class="grad_btn my-3 mt-4"
                  href="https://support.tronline.io/"
                  target="_blank"
                >
                  <span className="mx-2">
                    <BiSupport size={24} color="white" />
                  </span>
                  Support
                </a> */}
                <div
                  className="m-2"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    background:
                      "linear-gradient(to right, rgb(183 183 183), rgb(92 91 94))",
                    padding: "8px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <span className="mx-2">
                    <BsTelegram size={24} color="white" />
                  </span>
                  <a
                    href="https://t.me/+7tHV4QkwDeEyOGM9"
                    className="text-light"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <p>© 2022 BDLT Community | All Rights Reserved. </p>
          </div>
        </footer>
      </div>
    </>
  );
}
