"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import BlogsEdit component to ensure it's only loaded on the client-side
const BlogsEdit = dynamic(() => import("../components/Blog/BlogsEdit"), {
  ssr: false,
});
// import BlogsEdit from "../components/Blog/BlogsEdit";
const Blog = () => {
  useEffect(() => {
    const handleWindowResize = () => {
      // Ensure that code accessing document only runs on the client-side
      let divWidth = document?.getElementById("dash-sidebar")?.offsetWidth;
      let dash = document?.getElementById("dashboardd");
      dash.style.paddingLeft = `${divWidth + 5}px`;
    };

    // Add event listener only on the client-side

    window.addEventListener("resize", handleWindowResize);
    handleWindowResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <>
      <div
        id="dashboardd"
        className="paddings mt-16 flex justify-between  w-full dashboard-padding "
      >
        <BlogsEdit />
      </div>
    </>
  );
};

export default Blog;
