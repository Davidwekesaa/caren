"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/assets/logo.png";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
import CartIcon from "../components/CartIcon";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
// import useIsMobile from "../hooks/IsMobileHook";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
function Navbar() {
  const [{ user, isMobile }, dispatch] = useStateValue();
  // const [navbarMobile, setNavbarMobile] = useState(false);
  const [toClose, setToClose] = useState(true);
  useEffect(() => {
    const handleWindowResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 650) {
        console.log("is mobile");
        dispatch({
          type: actionType.SET_MOBILE,
          isMobile: true,
        });
        // setNavbarMobile(true);
      } else {
        dispatch({
          type: actionType.SET_MOBILE,
          isMobile: false,
        });
        setToClose(false);
      }
    };
    window.addEventListener("resize", handleWindowResize);

    handleWindowResize();
  }, []);
  const pathname = usePathname();
  // let { navbarMobile, toClose, setToClose } = useIsMobile();
  return (
    <>
      <div className=" w-full flex items-center justify-center paddings mt-0 z-nav-index relative shadow-lg shadow-indigo-300/60">
        <div className="w-full flex items-center justify-between">
          {/* logo */}
          <div className="float-left ">
            <Link href="/">
              <Image src={logo} width={150} height={150} alt="nurse caren" />
            </Link>
          </div>
          {/* logo */}

          {/* nav items */}
          <div
            id="navbar"
            className="float-right flex items-center justify-center"
          >
            <ul
              className={`flex items-center justify-between nav-uls ${
                toClose ? `hidden` : ``
              }`}
            >
              <li>
                <Link
                  href="/"
                  className={`nav-link ${pathname === "/" ? `active` : ""}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${pathname === "/Blog" ? `active` : ""}`}
                  href="/Blog"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/Courses"
                  className={`nav-link ${
                    pathname === "/Courses" ? `active` : ""
                  }`}
                >
                  Courses
                </Link>
              </li>

              <li>
                <Link
                  className={`nav-link ${
                    pathname === "/Wellness-products" ? `active` : ""
                  }`}
                  href="/Wellness-products"
                >
                  <span>Wellnes Products</span>{" "}
                </Link>
              </li>
            </ul>
            <div className="flex items-center justify-center">
              <CartIcon />
              <Stack direction="row" spacing={2} className="mr-3 ml-3">
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                  {user == ""
                    ? notImge
                    : user?.userName?.charAt(0)?.toUpperCase()}
                </Avatar>
              </Stack>
            </div>
            <div className="menues">
              {isMobile ? (
                toClose ? (
                  <MenuIcon
                    className="text-black"
                    onClick={(e) => setToClose(false)}
                  />
                ) : (
                  <CloseIcon
                    className="text-black"
                    onClick={(e) => setToClose(true)}
                  />
                )
              ) : (
                ""
              )}
            </div>
          </div>
          {/* nav items */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
