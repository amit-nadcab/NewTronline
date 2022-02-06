import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { NotificationManager } from "react-notifications";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { BsTelegram } from "react-icons/bs";

import { getUserInfo, onConnect } from "../HelperFunction/script";

export default function Home() {
  const state = useSelector((state) => state);
  const [wallet_address, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState({});
  const [joinAmount, setjoinAmount] = useState(0);
  const [ref_id, setref_id] = useState(0);
  const [levelIncome, setLevelIncome] = useState(0);
  const [directIncome, setDirectIncome] = useState(0);
  const [joiningPackage, setJoiningPackage] = useState(0);
  const [withdraw, setWithdraw] = useState(0);
  const [_package, setPackage] = useState(0);
  const [refferer, setRefferer] = useState("0x00");
  const [roi, setRoi] = useState(0);
  const [direct_sponcer, setDirectSponcer] = useState(0);
  const [reflect, setReflect] = useState(true);
  const [ref_id1, setref_id1] = useState();
  const [spin, setspin] = useState("");
  const [spin2, setspin2] = useState("");
  const [spin3, setspin3] = useState("");
  const [vsi, setvsi] = useState(0);
  const [disable, setdisable] = useState(false);

  const ref_addr = window.location.href;
  const reflink = useRef();

  function round(number) {
    return Math.round(number * 1000) / 1000;
  }
  useEffect(() => {
    console.log("Referrer Id", ref_addr);
    let nnnnn = ref_addr.split("?ref_id=");
    setref_id1(nnnnn[1]);
  }, []);

  useEffect(() => {
    if (contract?._address&&wallet_address) {
      contract.methods
        .users(wallet_address)
        .call()
        .then((data) => {
          contract.methods
            .getUserDividends(wallet_address)
            .call()
            .then((roi) => {
              setref_id(data.id);
              setDirectIncome(
                data.sponcerIncome
                  ? round(Number(data.sponcerIncome) / 1e18)
                  : 0
              );
              setLevelIncome(
                data.levelIncome ? round(Number(data.levelIncome) / 1e18) : 0
              );
              setRoi(
                roi
                  ? Math.round((Number(roi) / 1e18) * 1000000000) / 1000000000
                  : 0
              );
              setRefferer(data.referrer);
              setjoinAmount(data.joiningAmt);
              setDirectSponcer(data.partnersCount);
              setWithdraw(
                data.withdrawn ? round(Number(data.withdrawn) / 1e18) : 0
              );
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [contract,wallet_address,reflect]);

  // useEffect(() => {
  //   if (wallet_address) {
  //     getUserInfo(wallet_address)
  //       .then((d) => {
  //         console.log(d);
  //         if (d.status == 1) {
  //           setref_id(d.data.id);
  //           setDirectIncome(
  //             d.data.sponcerIncome
  //               ? round(Number(d.data.sponcerIncome) / 1e18)
  //               : 0
  //           );
  //           setLevelIncome(
  //             d.data.levelIncome ? round(Number(d.data.levelIncome) / 1e18) : 0
  //           );
  //           setRoi(
  //             d.roi
  //               ? Math.round((Number(d.roi) / 1e18) * 1000000000) / 1000000000
  //               : 0
  //           );
  //           setRefferer(d.data.referrer);
  //           setjoinAmount(d.data.joiningAmt);
  //           setDirectSponcer(d.data.partnersCount);
  //           setWithdraw(
  //             d.data.withdrawn ? round(Number(d.data.withdrawn) / 1e18) : 0
  //           );
  //         } else {
  //           console.log("Error:::", d.err);
  //         }
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   }
  // }, [wallet_address, reflect]);

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

  async function onWithdraw() {
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
                {/* <div className="form-group"> */}
                <Link
                  className="grad_btn btn-block text-light my-2"
                  style={{ padding: "10px 55px" }}
                  to="/accountsummary"
                >
                  Account Summary
                </Link>

                {/* </div> */}
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
            <h1 className="tirw">BDLT CROWD FUNDING PROGRAM </h1> <h5>BDLT COMMUNITY DEVELOPMENT PROGRAM</h5>
            <p>
              {" "}
              World First Decentralized Program on BDLT Blockchain. All Funds
              are store in Smart Contract and members can withdraw their reward
              directly from Smart contract. Get 200% Return On Investment .
            </p>
            {/* <p>
              World's First Single line plan in which all the joining and Vip
              funds are stored in Smart Contract and members can withdraw their
              reward directly from Smart contract. 100% Distribution Plan. Now
              Get Rewarded from 20 people in community. Join VIP clubs and get
              your daily shares.
            </p> */}
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
              {/* <div className="row">
              <>
               {_package!="1"&&_package!="2"? <div className="col-lg-2 col-md-3 col-sm-12">
                  <button
                    className={`btn btn-light my-2 ${
                      pkg500 === 50 ? "bg-info" : ""
                    }`}
                    style={{ width: "100%" }}
                    onClick={() => {
                      setpkg500(50);
                      setjoinAmount(50);
                    }}
                  >
                    $ 50
                  </button>
                </div>:<></>}
                {_package!="2"? <div className="col-lg-2 col-md-3 col-sm-12">
                  <button
                    className={`btn btn-light my-2 ${
                      pkg500 === 100 ? "bg-info" : ""
                    }`}
                    style={{ width: "100%" }}
                    onClick={() => {
                      setpkg500(100);
                      setjoinAmount(100);
                    }}
                  >
                    $ 100
                  </button>
                </div>:<></>}
              </>

              {ref_id!=0 && _package!=2 ? (
                <div className="col-lg-2 col-md-3 col-sm-12 mt-1">
                  <button
                    className="grad_btn btn-block d-flex"
                    style={{ padding: "10px 95px" }}
                    onClick={onUpgrade}
                  >
                    <span
                      className={`${spin2} mx-2`}
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span style={{ whiteSpace: "nowrap" }}>Upgrade Package</span>
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div> */}
            </div>
          </div>
        </section>
      ) : (
        <></>
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
                <h4>My Directs </h4>
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
                <h4>My Direct Income</h4>
                <h5>{directIncome} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>My Level Income</h4>
                <h5>{levelIncome} BDLT</h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>ROI Reward</h4>
                <h5>{roi} BDLT</h5>
              </div>
            </div>
          </div>
          {/* Third row */}
          <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>My Royalty Income</h4>
                <h5>{0} BDLT</h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner">
                <h4>My Total Withdrawal</h4>
                <h5>{withdraw} BDLT</h5>
              </div>
            </div>
          </div>
          {/* fourth row*/}
          <div className="row cus_row">
            <div className="offset-md-3 col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>Withdraw Roi Income</h4>
                <button className="grad_btn my-2" onClick={onWithdraw}>
                  Withdraw Roi
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
              <span>Your Referral Link</span>
            </h2>
          </div>
          <div className="referal_inner text-center">
            {ref_id ? (
              <>
                <input
                  className="word-break refinpt"
                  ref={reflink}
                  defaultValue={`http://demo.bdltcommunity.io/?ref_id=${ref_id}`}
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
                  className="grad_btn px-0 text-light"
                  // href="https://tronscan.org/#/contract/TXW3Zht4JHynh7n9kwFZAM7jPwRkk3kqcJ"
                  target="_blank"
                  style={{ borderRadius: "10px" }}
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
                    // href="https://t.me/Tronline_Admin"
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
