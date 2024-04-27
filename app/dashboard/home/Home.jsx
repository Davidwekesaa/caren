"use client";
import React, { useEffect, useState } from "react";
// import Feature from "../../components/feature/Feature";
import Chart from "../components/chart/Chart";
import Table from "../components/table/Table";
import axios from "axios";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
import TimeOders from "../components/tomeOders/TimeOders";
import Widget from "../components/widget/Widget";

function Home() {
  const [users, setUsers] = useState("");
  const [countOrders, setcountOrders] = useState("");
  const [ordersTotal, setOrdersTotal] = useState("");
  const [orders, setOrders] = useState(null);
  const [dataAmout, setDataAmout] = useState(null);

  const [todayOrder, setTodayOrder] = useState(null);
  const [weekOrder, setWeekOrder] = useState(null);
  const [monthOrder, setMonthOrder] = useState(null);

  const [filterr, setFilterr] = useState("");
  const [filterrData, setFilterrData] = useState(null);

  // const emptyFiled = () => toast.error("All checkout fields are required");

  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // get total users
    const getTotalUsers = async () => {
      await axios
        .get(`/api/user/`)
        .then((user) => {
          setUsers(user?.data?.getAllUsers?.length);
        })
        .catch((error) => {});
    };
    const getTotalOders = async () => {
      await axios
        .get(`/api/order/`)
        .then((oders) => {
          console.log("oders ", oders.data.orders);
          setcountOrders(oders.data.orders.length);
          setOrdersTotal(oders.data.totalSum);
        })
        .catch((error) => {});
    };

    const getUserOders = async () => {
      await axios
        .get(`/api/UserOrders/`)
        .then((useroders) => {
          setOrders(useroders?.data?.getAllUserOrderss);
        })
        .catch((error) => {});
    };

    const getMonthAmount = async () => {
      await axios
        .get(`/api/order/month/`)
        .then((useroders) => {
          // (useroders.data)
          setDataAmout(useroders?.data?.ordersByMonthWithNames);
        })
        .catch((error) => {});
    };

    const getTodayOeders = async () => {
      await axios
        .get(`/api/order/TodayOders/`)
        .then((useroders) => {
          setTodayOrder(useroders?.data?.orders);
        })
        .catch((error) => {});
    };

    const getWeekOeders = async () => {
      await axios
        .get(`/api/order/WeekOder/`)
        .then((useroders) => {
          // (useroders.data)
          console.log("week order ", useroders?.data?.orders);
          setWeekOrder(useroders?.data?.orders);
        })
        .catch((error) => {});
    };

    const getMonthOeders = async () => {
      await axios
        .get(`/api/order/MonthOder`)
        .then((useroders) => {
          // (useroders.data)
          setMonthOrder(useroders?.data?.orders);
          console.log("month oder", monthOrder);
        })
        .catch((error) => {});
    };
    getTotalUsers();
    getTotalOders();
    getUserOders();
    getMonthAmount();
    getTodayOeders();
    getWeekOeders();
    getMonthOeders();
  }, []);

  useEffect(() => {
    let oder = orders?.filter(
      (item) =>
        item?.userName
          ?.toLowerCase()
          .toString()
          .includes(filterr.toString().toLowerCase()) ||
        item.phone
          ?.toString()
          .toLowerCase()
          .includes(filterr.toString().toLowerCase()) ||
        item.status
          ?.toString()
          .toLowerCase()
          .includes(filterr.toString().toLowerCase()) ||
        item.payment
          ?.toString()
          .toLowerCase()
          .includes(filterr.toString().toLowerCase()) ||
        item.address
          ?.toString()
          .toLowerCase()
          .includes(filterr.toString().toLowerCase()) ||
        item.OrderFor?.toString()
          .toLowerCase()
          .includes(filterr.toString().toLowerCase())
    );
    setFilterrData(oder);
  }, [filterr]);
  // socket.on("receive_order", (data) => {

  //   // const audio = new Audio(notification);
  //   // audio.addEventListener("ended", () => {
  //   //   audio.currentTime = 0; // Reset the audio to the beginning
  //   //   audio.pause(); // Pause the audio
  //   // });

  //   // // Add an event listener to play the audio when the toast is opened
  //   // const onToastOpen = () => {
  //   //   audio.play();
  //   // };

  //   // const tastsuc = () =>
  //   //   toast.success("",{
  //   //     autoClose: 3000,
  //   //     position: toast.POSITION.BOTTOM_RIGHT,
  //   //     pauseOnFocusLoss: false,
  //   //     hideProgressBar: true,
  //   //     closeOnClick: true,
  //   //     draggable: false,
  //   //     pauseOnHover: true,
  //   //     progressStyle: { visibility: "hidden" },
  //   //     bodyClassName: "custom-toast-body",
  //   //     toastClassName: "custom-toast",
  //   //     closeButton: false,
  //   //     icon: false,
  //   //     onOpen: onToastOpen, // Add the event listener here
  //   //   });

  //   // tastsuc();

  //   emptyFiled()

  // });

  const monthOrders = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    December: 11,
  };
  return (
    <>
      <div className="dash-home">
        <div className="dash-homecontainer">
          <div className="dash-widgetcontainer">
            <Widget type="users" title={"USERS"} numbers={users ? users : 0} />
            <Widget
              type="orders"
              title={"ORDER"}
              numbers={countOrders ? countOrders : 0}
            />

            {user?.userRights !== 1 ? (
              <Widget
                type="earning"
                title={"EARNING"}
                isMoney={true}
                numbers={ordersTotal ? ordersTotal : 0}
              />
            ) : (
              ""
            )}
            {/* <Widget type="balance" /> */}
          </div>
          {user?.userRights !== 1 ? (
            <div className="dash-widgetcontainer">
              <TimeOders title={`Today Sales`} data={todayOrder} />
              <TimeOders title={`Last Week Sales`} data={weekOrder} />
              <TimeOders title={`Last Month Sales`} data={monthOrder} />
            </div>
          ) : (
            ""
          )}
          <div className="dash-charts">
            {/* <Feature /> */}

            {user?.userRights !== 1 ? (
              <Chart
                aspect={2 / 1}
                title={"Total  Revenue Per Month"}
                data={dataAmout?.sort(
                  (a, b) => monthOrders[a.name] - monthOrders[b.name]
                )}
              />
            ) : (
              ""
            )}
          </div>

          <div className="dash-tablecontainer">
            <div className="dash-tableTitle">
              <p>Latest Transactions</p>
              <div className="dash-search dash-p">
                <input
                  className="dash-search-input filtering"
                  type="text"
                  placeholder="filter by name | phone | Payment | status | address |order for"
                  onChange={(e) => setFilterr(e.target.value)}
                  value={filterr}
                />
                <SearchRoundedIcon className="dash-navbaricon dash-searchicon" />
              </div>
            </div>

            {orders === null ? (
              <div className="dash-circular">
                <CircularProgress />
              </div>
            ) : (
              <Table
                rows={
                  filterr.trim().length != 0 && filterrData
                    ? filterrData
                    : orders
                }
              />
            )}
          </div>
          {/* <div className="dash-circular"><CircularProgress/></div> */}
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default Home;
