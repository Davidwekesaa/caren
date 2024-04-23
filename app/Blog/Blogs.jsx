"use client";
import React, { useState, useEffect } from "react";
import { formatDate, trancateWords, updateSearchParams } from "../utils/Utils";
import ShareBlogPost from "./ShareBlogPost";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import PageTo from "./PageTo";
import axios from "axios";
import Link from "next/link";
import spinner from "@/public/assets/spinner.gif";
import Image from "next/image";
import RecentBlogs from "./RecentBlogs";
function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [recentblogs, setrecentBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(3);
  const [pages, setPages] = useState();

  useEffect(() => {
    const fetchBlogs = async () => {
      await axios
        .get(`api/blog?p=${parseInt(page)}&limit=${parseInt(rowsPerPage)}`)
        .then((product) => {
          setBlogs(product?.data?.getAllBlogs);
          setPages(product?.data?.numberOfPages);
          console.log("blogs", product);
        })
        .catch((error) => {});
    };
    const fetchRecentPosts = async () => {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}Blog/recent/blogs`)
        .then((product) => {
          setrecentBlogs(product.data);
          console.log("blogs", blogs);
        })
        .catch((error) => {});
    };

    fetchBlogs();
    fetchRecentPosts();
  }, [page, rowsPerPage]);

  if (blogs?.length === 0) {
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
      <div className="w-full flex items-start justify-between blogs mb-5">
        <div className="w-[60%] flex items-center justify-center left-blog flex-col">
          {blogs?.map((blg) => (
            <div
              className="w-full shadow-lg shadow-indigo-300/50 p-4 mb-10"
              key={blg?._id}
            >
              <div className="w-full imgwithsdiv">
                <img src={blg?.blogImage} alt="" className="imgwithsd" />
              </div>
              <div className="w-full mt-2 blog-heading">
                <h2>
                  <b>{blg?.blogHeading}</b>
                </h2>
              </div>
              <div className="w-full mt-2">
                <ul className="flex items-center ul-list">
                  <li class="flex items-center justify-between mr-2">
                    <PersonIcon className="mr-2" /> {blg?.blogOwner}
                  </li>
                  <li class="flex items-center justify-between mr-2">
                    <AccessTimeIcon className="mr-2" />
                    <time datetime="2020-01-01">
                      {formatDate(blg?.blogDAte)}
                    </time>
                  </li>
                  <li class="flex items-center justify-between mr-2">
                    <CommentIcon className="mr-2" />{" "}
                    {`${blg?.blogComments?.length} Comments`}
                  </li>

                  <li className="flex items-center justify-between mr-2">
                    <ShareBlogPost blogHeading={blg?.blogHeading} />
                  </li>
                </ul>
              </div>
              <div className="mb-5">
                <p
                  className="entry-content styleptag"
                  dangerouslySetInnerHTML={{
                    __html: trancateWords(blg?.blogBody),
                  }}
                />
              </div>

              <div className="mt-2 mb-2">
                <Link
                  // onClick={(e) => updateSearchParams(e, blg?.blogHeading)}
                  className="text-red-600 p-2 float-right"
                  href={`Blog/${blg?.blogHeading}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}

          <PageTo
            setPage={setPage}
            setrowsPerPage={setrowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            totalPages={pages}
          />
        </div>
        <div className="w-[35%] right-recent shadow-lg shadow-indigo-300/50 p-4 mt-3">
          <RecentBlogs />
        </div>
      </div>
    </>
  );
}

export default Blogs;
