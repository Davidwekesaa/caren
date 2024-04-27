"use client";
import React, { useState } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "@/app/store/StateProvider";
import BlogTable from "../table/BlogTable";
import TextEditor from "./TextEditor";

function BlogsEdit() {
  const [{ user }, dispatch] = useStateValue();
  const [file, setFile] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAARVBMVEXm6vJzgJXr7/Zue5Gdprbe4utodo2XobKAjJ9vfZLO1N52g5jj5+/HzdhqeY+gqbm9xNCutsSnr77W2+S1vMmPmauGkaTWvH5FAAADbklEQVR4nO2a23LjIAxAjTAYzCUOvvz/pxbHaZs0TQwKcl44L9vp7HTOCCEDUtNUKpVKpVKpVCqVyjMAwIqIjT98VqOf2nlRkWVup/5TOmCHjkuvtWaR+I+XvBvs8TIwngzn7A+cm9N4rAzYoP1fjw2vw6GRGeRDQG5CI4ejPEDMTyLyE5lZHBIY6M2LkFwDY/oDXGDges8kbig+kLvAkCBykaF2ASfTTBiTjtQF+lSRFdJ8AZO4PJclMoQq0O3s4nt8R+YCLsskutCli8pYnhWtiETgvFva/sLPRGExuSaMGRIRGJJLyi+SpNDZJTNTVvRiCVSyqtsvfXkTOGfu5A1PkLiQu5M3tCqvYjEiK8WTBfrsorLBi38U44kJqVJ8OyNK7VWlfN6eUFkb8/ZU2gQ6bFTKnxTwKqVNqkpVqSrvAPgSV7zwB2xUQnGVCasyFVdxWJXy1zKBVRGlTeLNHadCcIeHFhUW3hJchHLv7hvelTdphMKoqPKpgqws5avKBYG5M1MEBZW4JEm7IvKjQhMUxLWZ4sJ8xebdm7WieNHYgLzMlZRNB5gylsgX/ybfu4T0h3WaknLrkhgXT22yniyTXHzxc+R/LueENZJ02/jOxe21ybihbcDcuIyzfFFgtJwPbPDCoJ6uklT0vbo7Fzuox4732vNWxzfgoXGtl1z/rJTWXPrWNR8ZS4CmD/NitI9os8yh/4zHJgONFWMfGYVtPjo2UqlUKuWAb+xlLE4Ia39+dZxCE+urm87rQJxh3PMrnjOzjsedJxdrb0OpdAnBOIRuViZ++KKCfji0xE8i9/EjadTchWG0BDGKf1G4qVVerjN5r49w31Lr/1Xt5EQ5nTUW7qSY/icK+0JcM9W6NT4FRFxYmEwZtXrqwyVbgntTBvrg39K40fHhjd4qjB1DPpH+B2cd8vgNEHRBkYuMDphlgt6gniRf4xFjhPHeVSBFHtHZtzXU3EwamdM16LZ/ClmjATASmkSXjI1kafLkG22S3+gyhwLzSR8jdKQxWdGJTYismU2kSlqXKGOkFk/iMO5MHpQYljnFpCfO2Q2fMC+X/Br6pkrCWyqgmmH5JMzLjcjOaS5m3A0KtrWdi97dQ1kNhXfYb0agxyBy2W9wwukold0mALLJjlDZ7XBWlapSVapKVakqVaWqXPgCxAMyml95++4AAAAASUVORK5CYII="
  );
  const [blogHeading, setBlogHeading] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [toRefresh, setToRefresh] = useState("");
  const [blogToEditt, setblogToEditt] = useState("");

  const emptyFields = () => toast.error("All the fields are required");
  const userAddSuccess = () => toast.success("Blog added successfuly");

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (
      file.trim().length == 0 ||
      blogHeading.trim().length == 0 ||
      blogBody.trim().length == 0
    ) {
      console.log("blog body", blogBody);
      emptyFields();
    } else {
      await axios
        .post(`/api/blog/`, {
          blogImage: file,
          blogHeading: blogHeading,
          blogBody: blogBody,
          blogOwner: user === null ? "" : user?.userName,
        })
        .then((logins) => {
          userAddSuccess();
          clearInputs();
          setToRefresh(v4());
        })
        .catch((error) => {
          // wronUser();
        });
    }
  };

  const handleDataEdit = async (e) => {
    e.preventDefault();
    if (
      file.trim().length == 0 ||
      blogHeading.trim().length == 0 ||
      blogBody.trim().length == 0
    ) {
      emptyFields();
    } else {
      await axios
        .put(`/api/blog/${blogToEditt}`, {
          blogImage: file,
          blogHeading: blogHeading,
          blogBody: blogBody,
          // blogOwner: user === null ? "" : user?.userName,
        })
        .then((logins) => {
          userAddSuccess();
          clearInputs();
          setToRefresh(v4());
        })
        .catch((error) => {
          // wronUser();
        });
    }
  };

  const hundleFileUpload = (e) => {
    e.preventDefault();
    // setImgUpload(e.target.files[0]);
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
    } else {
      const imageRef = ref(storage, `blog/${selectedFile.name + v4()}`);
      uploadBytes(imageRef, selectedFile).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          setFile(url);
        });
      });
    }
  };

  const clearInputs = () => {
    setBlogHeading("");
    setBlogBody("");
  };
  return (
    <>
      <div className="w-full">
        <div className="dash-blogger">
          <di className="blog-image-upload">
            <div className="bottomLeft">
              <img
                className="dash-leftimg"
                // src={file ? URL.createObjectURL(file) : img}
                src={file}
                alt="img"
              />
            </div>
            <div className="dash-formInput-blog">
              <label htmlFor="file" className="dash-label-blog">
                Blog Image:
                <FileUploadRoundedIcon className="dash-icon" />
              </label>
              <input
                onChange={hundleFileUpload}
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
          </di>
          <div class="reply-form reply-form-blog">
            <div className="blog-inputt">
              <div class="row ">
                <div class="col form-group">
                  <input
                    name="name"
                    type="text"
                    class="form-control blog-input"
                    placeholder="Blog Heading"
                    value={blogHeading}
                    onChange={(e) => setBlogHeading(e.target.value)}
                  />
                </div>
                <div class="row">
                  <div class="col form-group">
                    {/* <textarea
                    name="comment"
                    class="form-control blog-input"
                    placeholder="Blog Content"
                    value={blogBody}
                    onChange={(e) => setBlogBody(e.target.value)}
                  /> */}
                    <TextEditor value={blogBody} setValue={setBlogBody} />
                  </div>
                </div>
                <div className="to-post">
                  <button
                    onClick={(e) => handleDataSubmit(e)}
                    class="btn btn-primary post-button"
                  >
                    Post
                  </button>

                  <button
                    onClick={(e) => handleDataEdit(e)}
                    class="btn btn-primary post-button"
                  >
                    Edit Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <BlogTable
          setBlogHeading={setBlogHeading}
          setBlogBody={setBlogBody}
          setFile={setFile}
          toRefreshl={toRefresh}
          setblogToEditt={setblogToEditt}
        />
        <ToastContainer />
      </div>
    </>
  );
}

export default BlogsEdit;
