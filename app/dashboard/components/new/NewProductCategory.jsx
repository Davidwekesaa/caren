"use client";
import React, { useState, useEffect } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

function NewProductCategory({ img, title, inputs }) {
  const [file, setFile] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAARVBMVEXm6vJzgJXr7/Zue5Gdprbe4utodo2XobKAjJ9vfZLO1N52g5jj5+/HzdhqeY+gqbm9xNCutsSnr77W2+S1vMmPmauGkaTWvH5FAAADbklEQVR4nO2a23LjIAxAjTAYzCUOvvz/pxbHaZs0TQwKcl44L9vp7HTOCCEDUtNUKpVKpVKpVCqVyjMAwIqIjT98VqOf2nlRkWVup/5TOmCHjkuvtWaR+I+XvBvs8TIwngzn7A+cm9N4rAzYoP1fjw2vw6GRGeRDQG5CI4ejPEDMTyLyE5lZHBIY6M2LkFwDY/oDXGDges8kbig+kLvAkCBykaF2ASfTTBiTjtQF+lSRFdJ8AZO4PJclMoQq0O3s4nt8R+YCLsskutCli8pYnhWtiETgvFva/sLPRGExuSaMGRIRGJJLyi+SpNDZJTNTVvRiCVSyqtsvfXkTOGfu5A1PkLiQu5M3tCqvYjEiK8WTBfrsorLBi38U44kJqVJ8OyNK7VWlfN6eUFkb8/ZU2gQ6bFTKnxTwKqVNqkpVqSrvAPgSV7zwB2xUQnGVCasyFVdxWJXy1zKBVRGlTeLNHadCcIeHFhUW3hJchHLv7hvelTdphMKoqPKpgqws5avKBYG5M1MEBZW4JEm7IvKjQhMUxLWZ4sJ8xebdm7WieNHYgLzMlZRNB5gylsgX/ybfu4T0h3WaknLrkhgXT22yniyTXHzxc+R/LueENZJ02/jOxe21ybihbcDcuIyzfFFgtJwPbPDCoJ6uklT0vbo7Fzuox4732vNWxzfgoXGtl1z/rJTWXPrWNR8ZS4CmD/NitI9os8yh/4zHJgONFWMfGYVtPjo2UqlUKuWAb+xlLE4Ia39+dZxCE+urm87rQJxh3PMrnjOzjsedJxdrb0OpdAnBOIRuViZ++KKCfji0xE8i9/EjadTchWG0BDGKf1G4qVVerjN5r49w31Lr/1Xt5EQ5nTUW7qSY/icK+0JcM9W6NT4FRFxYmEwZtXrqwyVbgntTBvrg39K40fHhjd4qjB1DPpH+B2cd8vgNEHRBkYuMDphlgt6gniRf4xFjhPHeVSBFHtHZtzXU3EwamdM16LZ/ClmjATASmkSXjI1kafLkG22S3+gyhwLzSR8jdKQxWdGJTYismU2kSlqXKGOkFk/iMO5MHpQYljnFpCfO2Q2fMC+X/Br6pkrCWyqgmmH5JMzLjcjOaS5m3A0KtrWdi97dQ1kNhXfYb0agxyBy2W9wwukold0mALLJjlDZ7XBWlapSVapKVakqVaWqXPgCxAMyml95++4AAAAASUVORK5CYII="
  );
  const [name, setName] = useState("");

  const emptyFields = () => toast.error("All the fields are required");
  const userAddSuccess = () => toast.success("Category added successfuly");

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (file.trim().length == 0 || name.trim().length == 0) {
      emptyFields();
    } else {
      await axios
        .post(`/api/products/category`, {
          name: name,
          imgSrc: file,
        })
        .then((logins) => {
          userAddSuccess();
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
      const imageRef = ref(storage, `category/${selectedFile.name + v4()}`);
      uploadBytes(imageRef, selectedFile).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          setFile(url);
        });
      });
    }
  };

  return (
    <div className="dash-new">
      <div className="dash-newContainer">
        <div className="dash-newBottom">
          <div className="bottomLeft">
            <img className="dash-leftimg" src={file} alt="img" />
          </div>
          <div className="dash-bottomRight">
            <form className="dash-form-new-user">
              <div className="dash-formInput">
                <label htmlFor="file" className="dash-label">
                  Category Image:
                  <FileUploadRoundedIcon className="dash-icon" />
                </label>
                <input
                  onChange={hundleFileUpload}
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label htmlFor="name">Category Name</label>
                <input
                  id={`name`}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={`enter product name`}
                  className="dash-input"
                  value={name}
                />
              </div>
              <button
                type="submit"
                className="dash-button"
                onClick={handleDataSubmit}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewProductCategory;
