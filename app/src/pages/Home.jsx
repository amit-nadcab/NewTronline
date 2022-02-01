import React, { useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { NotificationManager } from "react-notifications";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CardIdinfo from "../Component/Card_Id_info";
import { BsTelegram } from "react-icons/bs";
import { BiSupport } from "react-icons/bi";
import { onConnect, onRegistration } from "../HelperFunction/script";


export default function Home() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [wallet_address, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(0);
  const [contract, setContract] = useState({});
  const [pkg500, setpkg500] = useState(50);
  const [joinAmount, setjoinAmount] = useState(50);
  const [ref_id, setref_id] = useState(false);
  const [ref_id1, setref_id1] = useState();
  const [spin, setspin] = useState("");
  const [vsi, setvsi] = useState(0);
  const [disable, setdisable] = useState(false);

  const sponsorcolumn = [
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
      name: "USER Id",
      selector: (row) => row.income_from_random_id,
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "rgba(63, 195, 128, 0.9)",
      },
    },
    {
      name: "Sponsor Rewards",
      selector: (row) => row.total_income.toFixed(2),
      sortable: true,
      style: {
        backgroundColor: "transparent",
        color: "black",
      },
    },
    {
      name: "Timestamp",
      selector: (row) => new Date(row.income_date).toLocaleString(),
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

  const ref_addr = window.location.href;
  const reflink = useRef();

  useEffect(()=>{
    console.log("Referrer Id",ref_addr);
    let nnnnn =ref_addr.split("?ref_id=");
    setref_id1(nnnnn[1]);
  },[]);
  async function onRegistration() {
    setspin("spinner-border spinner-border-sm");
    // balance >= joinAmount
    if (true) {
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
                    .registrationExt(d, pkg500 == 50 ? 1 : 2)
                    .send({
                      from: wallet_address,
                      value: 0,
                    })
                    .then((d) => {
                      setspin("");
                      setdisable(false);
                    })
                    .catch((e) => {
                      console.log("Error :: ", e);
                      setspin("");
                      setdisable(false);
                    });
                } else {
                  NotificationManager.error(
                    "Refferal Not Exist",
                    "Invalid Referrel"
                  );
                  setspin("");
                  setdisable(false);
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
    }else {
      NotificationManager.error("Low Balance ","Error");
      setspin("");setdisable(false);
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
              src="./img/tronline.png"
              className="img img-fluid"
              style={{ height: "176px" }}
            />
          </div>
          <div className="col-md-12 col-sm-12 col-lg-6 mt-5">
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
                  href="/business_plan_tronline_2021.pdf"
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
            <h1 className="tirw">World's First 100% Tron Funding Program!</h1>
            <p>
              World's First Single line plan in which all the joining and Vip
              funds are stored in Smart Contract and members can withdraw their
              reward directly from Smart contract. 100% Distribution Plan. Now
              Get Rewarded from 20 people in community. Join VIP clubs and get
              your daily shares.
            </p>
          </div>
        </div>
      </section>

      <section className="pt_50 pb_50">
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
            <div
              className="m-2"
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                background: "linear-gradient(to right, #32defa, #6d2de7)",
                padding: "8px 15px",
                borderRadius: "10px",
              }}
            >
              <span className="mx-2">
                <BsTelegram size={24} color="white" />
              </span>
              <a
                href="https://t.me/Tronline_Admin"
                className="text-light"
                target="_blank"
              >
                Telegram
              </a>
            </div>
          </div>
        </div>

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
                    : "Press Refresh for Wallet Address if Tronlink is connected"}
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
                        setBalance(d?.balance);
                        setContract(d?.contract);
                        setWalletAddress(d?.userAddress);
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
              <div className="text-light" style={{ margin: "10px 0px" }}>
                Wallet Balance: {" " + balance + " "}&nbsp;&nbsp; Selected
                Package {": " + joinAmount}
              </div>
              <div className="col-md-8 col-lg-8 col-sm-8">
                <div className="form-group">
                  {ref_id ? null : (
                    <input
                      className="cus_input"
                      type="text"
                      name="sponsor_address"
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
                  {ref_id ? null : (
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
                          NotificationManager.info("Please Connect  Wallet!!");
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
            <div className="row">
              {!ref_id ? (
                <>
                  <div className="col-lg-2 col-md-3 col-sm-12">
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
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-12">
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
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* <div className="mt-5">
        <div className="container">
          <div className="row cus_row">
            <CardIdinfo
              CommunityLevel="Community Level Rewards"
              // UplineIncome="Income"
              trx={state.upline ? Number(state.upline).toFixed(2) : 0}
            />
            <CardIdinfo
              CommunityLevel="7 level Sponsor Rewards"
              // UplineIncome="Income"
              trx={state.sponsor ? Number(state.sponsor).toFixed(2) : 0}
            />
            <CardIdinfo
              CommunityLevel="Available Wallet Balance"
              // UplineIncome="Wallet Balance"
              trx={balance}
            />
          </div>
        </div>
      </div> */}

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Personal Details</span>
            </h2>
          </div>
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>My TRX Buy</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.total_deposited
                          ? Number(state.personaldetails.total_deposited) /
                              1e6 +
                            " TRX"
                          : 0 + " TRX"
                        : 0 + " TRX"
                      : 0 + " TRX"
                    : 0 + " TRX"}
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>My Withdrawals</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.total_withdraw
                          ? Number(state.personaldetails.total_withdraw) +
                            " TRX"
                          : 0 + " TRX"
                        : 0 + " TRX"
                      : 0 + " TRX"
                    : 0 + " TRX"}
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Referred By</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.referred_by
                          ? state.personaldetails.referred_by
                          : "----"
                        : "----"
                      : "----"
                    : "----"}
                </h5>
              </div>
            </div>
          </div>
          {/* second row */}
          <div className="row cus_row">
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>My ReBuy</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.total_reinvest
                          ? (
                              Number(state.personaldetails.total_reinvest) / 1e6
                            ).toFixed(2) + " TRX"
                          : 0 + " TRX"
                        : 0 + " TRX"
                      : 0 + " TRX"
                    : 0 + " TRX"}
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-6">
              <div className="Personal_Details_inner">
                <h4>My Directs </h4>
                <h5>
                  {state.personaldetails
                    ? state.investor_id > 0
                      ? state.personaldetails.myCommunity
                        ? state.personaldetails.myCommunity
                        : 0
                      : 0
                    : 0}
                </h5>
              </div>
            </div>
            <div className="col-md-4 col-sm-4 col-12">
              <div className="Personal_Details_inner">
                <h4>Total Community</h4>
                <h5>
                  {state.personaldetails
                    ? state.personaldetails.total_community
                      ? state.personaldetails.total_community
                      : 0
                    : 0}
                </h5>
              </div>
            </div>
          </div>
          {/* Third row */}
          <div className="row cus_row">
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner Personal_bg">
                <h4>My Income withdrawals</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.income_withdraw
                          ? Number(state.personaldetails.income_withdraw) +
                            " TRX"
                          : 0 + " TRX"
                        : 0 + " TRX"
                      : 0 + " TRX"
                    : 0 + " TRX"}
                </h5>
              </div>
            </div>
            <div className="col-md-6 col-sm-6 col-lg-6">
              <div className="Personal_Details_inner">
                <h4>My VIP Withdrawals</h4>
                <h5>
                  {state
                    ? state.investor_id > 0
                      ? state.personaldetails
                        ? state.personaldetails.vip_withdraw
                          ? Number(state.personaldetails.vip_withdraw) + " TRX"
                          : 0 + " TRX"
                        : 0 + " TRX"
                      : 0 + " TRX"
                    : 0 + " TRX"}
                </h5>
              </div>
            </div>
          </div>

          <div className="row cus_row">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="Personal_Details_inner">
                <h4>My VIP Sponsor Rewards</h4>
                <h5>{vsi ? vsi : 0}</h5>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="Personal_Details_inner">
                <h4>Total Community Deposits</h4>
                <h5>
                  {state.personaldetails
                    ? state.personaldetails.communitydeposit
                      ? (state.personaldetails.communitydeposit / 1e6).toFixed(
                          0
                        ) + " TRX"
                      : 0
                    : 0}
                </h5>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="Personal_Details_inner">
                <h4>Total Community withdrawn</h4>
                <h5>
                  {state.personaldetails
                    ? state.personaldetails.communitywithdrawal
                      ? state.personaldetails.communitywithdrawal.toFixed(0) +
                        " TRX"
                      : 0
                    : 0}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>Community Level</span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                <table className="my-5" style={{ textAlign: "center" }}>
                  <thead style={{ textAlign: "center" }}>
                    <tr className="hrrr">
                      <th>Level</th>
                      <th>UserID</th>
                      <th>TRX Buy</th>
                      <th>VIP Buy</th>
                      <th>TRX Rebuy</th>
                    </tr>
                  </thead>
                  {/* {state.community.leveldown.length !== 0 ? (
                    <tbody style={{ textAlign: "center", minWidth: "650px" }}>
                      {state.community.levelup &&
                        state.community.levelup.length > 0
                        ? state.community.levelup.map((item, i) => {
                          return (
                            <tr
                              className={`${item.level === 0 ? "mrrr" : "trrr"
                                }`}
                            >
                              <td>LEVEL {item.level}</td>
                              <td>{item.id}</td>
                              <td>{item.deposit}</td>
                              <td>{item.reinvest}</td>
                              <td>{item.reinvestment}</td>
                            </tr>
                          );
                        })
                        : null}
                      {state.community.leveldown &&
                      state.community.leveldown.length > 0
                        ? state.community.leveldown.map((item, i) => {
                            return (
                              <tr className="trrr">
                                <td>
                                  {item.level === 0
                                    ? "SELF"
                                    : "LEVEL" + item.level}
                                </td>
                                <td>{item.id}</td>
                                <td>{item.deposit}</td>
                                <td>{item.reinvest}</td>
                                <td>{item.reinvestment}</td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  ) : (
                    <span className="m-5">
                      no data found for community level
                    </span>
                  )} */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb_50">
        <div className="container">
          <div className="all_heading text-center">
            <h2>
              <span>SPONSOR Level</span>
            </h2>
          </div>
          <div className="sm_container">
            <div className="table_inner">
              <div className="table-responsive gridtable">
                {/* <DataTable
                  columns={sponsorcolumn}
                  data={
                    state.community.sponsor_level &&
                    state.community.sponsor_level.length !== 0
                      ? state.community.sponsor_level
                      : []
                  }
                  pagination
                  paginationPerPage={4}
                  progressPending={false}
                  customStyles={customStyles}
                /> */}
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
                  defaultValue={`https://tronline.io?ref_id=${ref_id}`}
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
                src="./img/tronline.png"
                className="img img-fluid"
                style={{ height: "130px" }}
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
                  href="https://tronscan.org/#/contract/TXW3Zht4JHynh7n9kwFZAM7jPwRkk3kqcJ"
                  target="_blank"
                  style={{ borderRadius: "10px" }}
                >
                  <img
                    src="https://coin.top/production/logo/trx.png"
                    className="mx-2"
                    style={{ width: "13%" }}
                  />
                  Smart Contract info
                </a>
                <a
                  class="grad_btn my-3 mt-4"
                  href="https://support.tronline.io/"
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
                    background: "linear-gradient(to right, #32defa, #6d2de7)",
                    padding: "8px 15px",
                    borderRadius: "10px",
                  }}
                >
                  <span className="mx-2">
                    <BsTelegram size={24} color="white" />
                  </span>
                  <a
                    href="https://t.me/Tronline_Admin"
                    className="text-light"
                    target="_blank"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
            <hr />
            <p>© 2021 TronLine | All Rights Reserved. </p>
          </div>
        </footer>
      </div>
    </>
  );
}
