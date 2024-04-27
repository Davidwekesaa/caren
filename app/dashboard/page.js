"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Home from "./home/Home";
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
        className="paddings mt-16 flex justify-between w-full dashboard-padding "
      >
        <Home />
      </div>
    </>
  );
}
