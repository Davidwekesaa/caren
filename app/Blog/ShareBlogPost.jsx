"use client";
import React, { useState, useEffect } from "react";
import ShareIcon from "@mui/icons-material/Share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
function ShareBlogPost({ blogHeading }) {
  const [copyValue, setCopyValue] = useState("share");
  const [copied, setCopied] = useState(false);
  const copiedToClip = () => toast.success("Copied to clipboard");
  useEffect(() => {
    const currentUr = window.location.href;
    var pathname = new URL(currentUr).pathname;
    var pathAfterBlog = pathname.substring("/Blog/".length);
    if (pathAfterBlog.trim().length > 0) {
      console.log("There is a path name after '/Blog/':", currentUr);
      setCopyValue(currentUr);
    } else {
      var updatedURL = `${currentUr}/${blogHeading}`;

      setCopyValue(updatedURL);
      console.log("There is no path name after '/Blog/'.", updatedURL);
    }
  }, []);

  useEffect(() => {
    if (copied) {
      copiedToClip();
      setTimeout(() => setCopied(false), 2500);
    }
  }, [copied]);
  return (
    <>
      <div className="d-flex align-items-center">
        <CopyToClipboard text={copyValue} onCopy={() => setCopied(true)}>
          {/* <ShareIcon /> share */}
          <button className="sharebtn">
            <ShareIcon />
          </button>
        </CopyToClipboard>
      </div>
      <ToastContainer />
    </>
  );
}

export default ShareBlogPost;
