"use client";
import React, { useState, useEffect } from "react";
import { formatDate, updateSearchParams } from "../utils/Utils";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import spinner from "@/public/assets/spinner.gif";
function RecentBlogs(search) {
  const [recentblogs, setRecentblogs] = useState([]);
  useEffect(() => {
    const searchedPost = async () => {
      await axios
        .get(`/api/blog/recentblogs`)
        .then((category) => {
          setRecentblogs(category?.data?.getAllBlogs);
        })
        .catch((error) => {});
    };
    searchedPost();
  }, []);

  if (recentblogs?.length === 0) {
    return (
      <>
        <main id="main" className="do">
          <section id="breadcrumbs" className="breadcrumbs">
            <div className="container gifs" data-aos="fade-up">
              <Image src={spinner} alt="Your GIF" className="gifs" />
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <>
      <div className="w-full flex flex-col">
        <h3 className="sidebar-title">Recent Posts</h3>
        <div className="sidebar-item recent-posts w-full flex flex-col">
          {recentblogs?.map((rcb) => (
            <div className="post-item clearfix flex items-start" key={rcb?._id}>
              <img src={rcb?.blogImage} alt="" className="mr-2 recentt-img" />
              <div className="w-full flex flex-col">
                <Link className="recentb" href={`Blog/${rcb?.blogHeading}`}>
                  {rcb?.blogHeading}
                </Link>
                <time datetime="2020-01-01" className="italic text-xs tmo">
                  {formatDate(rcb?.blogDAte)}
                </time>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RecentBlogs;
