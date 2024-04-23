"use client";
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { v4 } from "uuid";
import { useStateValue } from "@/app/store/StateProvider";

function Reply({ searchId, setSinglePageRefresh, commentId }) {
  const [{ user }, dispatch] = useStateValue();
  const [userName, setUserName] = useState(user?.userName);
  const [userComment, setUserComment] = useState("");
  const commentAdded = () => toast.success("comment added");
  const addComment = async (e) => {
    e.preventDefault();
    if (userName.trim().length === 0 && userComment.trim().length === 0) {
    } else {
      console.log("searchId ", searchId);
      await axios
        .put(`/api/blog/comment/${searchId}`, {
          name: userName,
          userComment: userComment,
          parentId: commentId,
        })
        .then((product) => {
          commentAdded();
          setUserName("");
          setUserComment("");
          setSinglePageRefresh(v4());
        })
        .catch((error) => {});
    }
  };
  return (
    <>
      <div class="reply-form">
        <h4>Leave a Reply</h4>
        <p>Required fields are marked * </p>
        <div>
          <div class="row">
            <div class="col-md-6 form-group">
              <input
                name="name"
                type="text"
                class="form-control"
                placeholder="Your Name*"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div class="row">
            <div class="col form-group">
              <textarea
                name="comment"
                class="form-control"
                placeholder="Your Comment*"
                value={userComment}
                onChange={(e) => setUserComment(e.target.value)}
              />
            </div>
          </div>
          <button onClick={(e) => addComment(e)} class="btn btn-primary">
            Post Comment
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Reply;
