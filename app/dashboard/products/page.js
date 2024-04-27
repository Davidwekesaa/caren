"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import TableListProduct from "../components/table/TableListProduct";
import TableListCategory from "../components/table/TableListCategory";
// import Home from "./home/Home";
export default function Dashboard() {
  useEffect(() => {
    const handleWindowResize = () => {
      let divWidth = document.getElementById("dash-sidebar").offsetWidth;
      let dash = document.getElementById("dashboardd");
      dash.style.paddingLeft = `${divWidth + 5}px`;
    };
    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();
  }, []);
  return (
    <>
      <div
        id="dashboardd"
        className="paddings mt-16 flex justify-between flex-col w-full dashboard-padding "
      >
        {/* <Home /> */}
        <TableListProduct />
        <TableListCategory />
      </div>
    </>
  );
}
