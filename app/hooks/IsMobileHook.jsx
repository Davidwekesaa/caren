// "use client";
// import { useState, useEffect } from "react";
// import { useStateValue } from "@/app/store/StateProvider";
// import { actionType } from "@/app/store/reducer";
// const useIsMobile = () => {
//   const [navbarMobile, setNavbarMobile] = useState(false);
//   const [toClose, setToClose] = useState(true);
//   useEffect(() => {
//     const handleWindowResize = () => {
//       const windowWidth = window.innerWidth;
//       if (windowWidth <= 650) {
//         console.log("is mobile");
//         setNavbarMobile(true);
//       } else {
//         setNavbarMobile(false);
//         setToClose(false);
//       }
//     };
//     window.addEventListener("resize", handleWindowResize);

//     handleWindowResize();
//   }, []);
//   return { navbarMobile, toClose, setToClose };
// };

// export default useIsMobile;
