"use client";
import React, { useContext, useEffect } from "react";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import Link from "next/link";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import logo from "@/public/assets/logo.png";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";

const Sidebar = () => {
  const [{ user }, dispatch] = useStateValue();

  const hundleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div id="dash-sidebar" className="dash-sidebar mt-16  static-div  ">
      <div className="dash-center">
        <ul>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <li>
              <GridViewRoundedIcon className="dash-sidebaricon" />
              <span>Home</span>
            </li>
          </Link>
          {user?.userRights !== 1 ? (
            <Link href="/dashboard/Users" style={{ textDecoration: "none" }}>
              {" "}
              <li>
                <GroupRoundedIcon className="dash-sidebaricon" />
                <span>Users</span>
              </li>
            </Link>
          ) : (
            ""
          )}
          <Link href="/dashboard/products" style={{ textDecoration: "none" }}>
            {" "}
            <li>
              <LocalShippingIcon className="dash-sidebaricon" />
              <span>Products</span>
            </li>
          </Link>

          <Link href="/dashboard/expenses" style={{ textDecoration: "none" }}>
            {" "}
            <li>
              <LocalMallRoundedIcon className="dash-sidebaricon" />
              <span>Expenses</span>
            </li>
          </Link>
          {/* {user?.userRights !== 1 ? (
            <Link href="/dashboard/edits" style={{ textDecoration: "none" }}>
              {" "}
              <li>
                <CreditCardIcon className="dash-sidebaricon" />
                <span>Edits</span>
              </li>
            </Link>
          ) : (
            ""
          )} */}
          <hr className="dash-horizontal-line" />
          <Link href="/dashboard/blogs" style={{ textDecoration: "none" }}>
            {" "}
            <li>
              <LocalShippingIcon className="dash-sidebaricon" />
              <span>Blogs</span>
            </li>
          </Link>
          <div className="user">
            <Link href="/logout" style={{ textDecoration: "none" }}>
              {" "}
              <li onClick={hundleLogout}>
                <ExitToAppIcon className="dash-sidebaricon" />
                <span>Logout</span>
              </li>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
