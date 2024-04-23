"use client";
import React, { useState } from "react";
import logo from "@/public/assets/logo.png";
import { useStateValue } from "@/app/store/StateProvider";
import { formatDate } from "@/app/utils/Utils";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ReplyIcon from "@mui/icons-material/Reply";
import Reply from "./Reply";
import Image from "next/image";
function GetComments({
  comment,
  replies,
  allComments,
  searchId,
  setSinglePageRefresh,
}) {
  const [viewReply, setViewReply] = useState(false);
  const [vReply, setVReply] = useState(false);
  const [{ user }, dispatch] = useStateValue();
  const getReplies = (commentId) => {
    return allComments?.filter(
      (backendComment) => backendComment?.parentId === commentId
    );
  };
  const handleToggle = () => {
    setViewReply(!viewReply); // Toggles the state
  };
  const handleToggleReply = () => {
    setVReply(!vReply); // Toggles the state
  };
  return (
    <div id="comment-1" className="comment" key={comment?.commentId}>
      <div class="flex mb-4">
        <div class="comment-img gg">
          <img
            src={user === null ? logo : user?.profile}
            alt=""
            className="img-comment"
          />
        </div>
        <div>
          <div className="dpf">
            <h5>{comment?.name}</h5>
            <time datetime="2020-01-01">
              {formatDate(comment?.commentDAte)}
            </time>
          </div>
          <p>{comment?.comment}</p>
          <div className="replysu">
            <div className="replysu hkuy" onClick={(e) => handleToggle()}>
              {viewReply ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              <h1>replies</h1>
            </div>
            <div className="replysu hkuy" onClick={(e) => handleToggleReply()}>
              <ReplyIcon />
              <h1>reply</h1>
            </div>
          </div>
        </div>
      </div>
      {vReply && (
        <Reply
          setSinglePageRefresh={setSinglePageRefresh}
          searchId={searchId}
          commentId={comment?.commentId}
        />
      )}
      {replies?.length > 0 && viewReply && (
        <div class="coent">
          {replies?.map((reply) => (
            <div key={reply?.commentId}>
              <GetComments
                comment={reply}
                replies={getReplies(reply?.commentId)}
                allComments={allComments}
                setSinglePageRefresh={setSinglePageRefresh}
                searchId={searchId}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GetComments;
