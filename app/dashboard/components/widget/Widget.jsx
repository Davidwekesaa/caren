import React from "react";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import { TrendingUpRounded } from "@mui/icons-material";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import AccountBalanceWalletRoundedIcon from "@mui/icons-material/AccountBalanceWalletRounded";

export default function Widget({ type, title, numbers, isMoney }) {
  let data = {
    title: title,
    numbers: numbers,
    isMoney: isMoney,
    link: String(title).toLowerCase(),
    icon:
      String(title) == "USERS" ? (
        <PersonRoundedIcon className="dash-wicon" style={{ color: "white" }} />
      ) : String(title) == "ORDER" ? (
        <ShoppingCartRoundedIcon
          className="dash-wicon"
          style={{ color: "white" }}
        />
      ) : String(title) == "EARNING" ? (
        <AttachMoneyRoundedIcon
          className="dash-wicon"
          style={{ color: "white" }}
        />
      ) : (
        ""
      ),
    status:
      String(title) == "USERS"
        ? "positive"
        : String(title) == "ORDER"
        ? "negative"
        : String(title) == "EARNING"
        ? "positive"
        : "",
  };

  // switch (type) {
  //   case "users":
  //     data = {
  //       title: "USERS",
  //       numbers: "+25000",
  //       isMoney: false,
  //       link: "see all users",
  //       icon: (
  //         <PersonRoundedIcon
  //           className="dash-wicon"
  //           style={{ color: "white" }}
  //         />
  //       ),
  //       status: "positive",
  //     };
  //     break;

  //   case "orders":
  //     data = {
  //       title: "ORDER",
  //       numbers: "-12000",
  //       isMoney: false,
  //       link: "see all order",
  //       icon: (
  //         <ShoppingCartRoundedIcon
  //           className="dash-wicon"
  //           style={{ color: "white" }}
  //         />
  //       ),
  //       status: "negative",
  //     };
  //     break;

  //   case "earning":
  //     data = {
  //       title: "EARNING",
  //       numbers: "456000",
  //       isMoney: TrendingUpRounded,
  //       link: "see net earning",
  //       icon: (
  //         <AttachMoneyRoundedIcon
  //           className="dash-wicon"
  //           style={{ color: "white" }}
  //         />
  //       ),
  //       status: "positive",
  //     };
  //     break;

  //   case "balance":
  //     data = {
  //       title: "BALANCE",
  //       numbers: 3489840,
  //       isMoney: true,
  //       link: "see total balance",
  //       icon: (
  //         <AccountBalanceWalletRoundedIcon
  //           className="dash-wicon"
  //           style={{ color: "white" }}
  //         />
  //       ),
  //       status: "positive",
  //     };
  //     break;

  //   default:
  //     return (
  //       <PersonRoundedIcon
  //         className="dash-wicon"
  //         style={{ background: "#d3d3d333", color: "white" }}
  //       />
  //     );
  // }

  return (
    <div className={`dash-widget ${data.title} `}>
      <div className="dash-left">
        <span className="dash-widgetTitle">
          {String(title) === "EARNING" ? "TOTAL ORDERS AMOUNT" : data.title}
        </span>
        <span className={`dash-widgetNumbers ${data.title}`}>
          {data.isMoney && "Ksh"} {data.numbers}
        </span>
        <span className="dash-widgetLink">{`see all ${data.link}`}</span>
      </div>
      <div className="dash-right">
        <div className={`dash-percentage ${data.status}`}>
          {data.status === "positive" ? (
            <ArrowDropUpRoundedIcon
              style={{
                color: "white",
                background: "#ffffff4d",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
          ) : (
            <ArrowDropDownRoundedIcon
              style={{
                color: "white",
                background: "#ffffff4d",
                borderRadius: "5px",
                padding: "5px",
              }}
            />
          )}
        </div>
        {data.icon}
      </div>
    </div>
  );
}
