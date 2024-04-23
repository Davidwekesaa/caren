"use client";
import React, { useState, useEffect } from "react";
import BlogComment from "../BlogComment";
import Comment from "../Comment";
import ShareBlogPost from "../ShareBlogPost";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import CommentIcon from "@mui/icons-material/Comment";
import spinner from "@/public/assets/spinner.gif";
import axios from "axios";
import { formatDate } from "@/app/utils/Utils";
import RecentBlogs from "../RecentBlogs";
import Image from "next/image";

function Blog({ params }) {
  const [singlepageRefresh, setSinglePageRefresh] = useState("");
  const [searchedPost, setsearchedPost] = useState([]);

  useEffect(() => {
    const searchedPost = async () => {
      await axios
        .get(`/api/blog/${params?.blogheading}`)
        .then((category) => {
          setsearchedPost(category?.data?.Blogs);
          console.log("search data ", category?.data?.Blogs);
        })
        .catch((error) => {});
    };
    searchedPost();
  }, [singlepageRefresh]);

  if (searchedPost?.length === 0) {
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
      <div className=" w-full paddings mt-16">
        <div className="w-full flex items-start justify-between blogs mb-5">
          <div className="w-[60%] flex items-center justify-center left-blog ">
            {searchedPost?.map((blg) => (
              <div
                className="w-full shadow-lg shadow-indigo-300/50 p-4"
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
                    dangerouslySetInnerHTML={{ __html: blg?.blogBody }}
                  />
                </div>

                <div class="blog-comments">
                  <h4 class="comments-count">
                    {blg?.blogComments?.length} Comments
                  </h4>

                  <BlogComment
                    comments={blg?.blogComments}
                    searchId={blg?._id}
                    setSinglePageRefresh={setSinglePageRefresh}
                  />

                  <Comment
                    searchId={blg?._id}
                    setSinglePageRefresh={setSinglePageRefresh}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="w-[35%] right-recent shadow-lg shadow-indigo-300/50 p-4 mt-3">
            <RecentBlogs />
          </div>
        </div>
      </div>
    </>
  );
}

export default Blog;
