"use client";
import React from "react";
import { useStateValue } from "@/app/store/StateProvider";
import GetComments from "./GetComments";

function BlogComment({ comments, searchId, setSinglePageRefresh }) {
  const [{ user }, dispatch] = useStateValue();
  const rootComments = comments?.filter(
    (backendComment) => backendComment?.parentId === null
  );
  const getReplies = (commentId) => {
    return comments?.filter(
      (backendComment) => backendComment?.parentId === commentId
    );
  };
  return (
    <>
      {rootComments?.map((comment) => (
        <div key={comment?.commentId}>
          <GetComments
            comment={comment}
            replies={getReplies(comment?.commentId)}
            allComments={comments}
            setSinglePageRefresh={setSinglePageRefresh}
            searchId={searchId}
          />
        </div>
      ))}
    </>
  );
}

export default BlogComment;
