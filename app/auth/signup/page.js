"use client";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { actionType } from "@/app/store/reducer";
import { useStateValue } from "@/app/store/StateProvider";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { storage } from "@/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import Link from "next/link";

function Register() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [imgUpload, setImgUpload] = useState(null);
  const [{}, dispatch] = useStateValue();

  const emptyFields = () => toast.error("All the fields are required");
  const wronUser = () => toast.error("An Error Occured");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      userName.trim().length === 0
    ) {
      emptyFields();
    } else {
      await axios
        .post(`/api/auth/register`, {
          userEmail: email,
          userPassword: password,
          userName: userName,
          profile:
            imgUpload == null
              ? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAIsAiwMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAAAQIDBAUHCAb/xAA2EAACAQMBBAgEBAcBAAAAAAAAAQIDBBEFBhIhMQcTMkFRYXGRF1JVkxQigbEkMzRCU2LBFv/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABETH/2gAMAwEAAhEDEQA/APXAAbYAAAAAAAIGAABgCMkgAAAAAAAAAAAHMc+ReEQKqLLbhoo4WXyIdSC7mwqm75Dd8i/Wx+VjrY/KwKbo3SzqLwZG+vBgV3SMFt/yKtgCCckBAAAAAAAAExRtHCWXyM4F6rxD1Cs5yc3/AMKgBAAAAdDd7a7MWVw7e512whVi8OKqqWH4PGcHbWN9aahbRubC5o3NCXKpRqKcfdAcgAAAwRLkAySimS0eQEgAAAALwL1eyvUpAvV7K9QrEABA8j6c9rbmxjQ2f0+vKjKvT627nB4bg3iMM9yeG36JHrj5HgnT9plaltLaalut29zbKmpdynBvK9miVY8tP0uwe1d1sprdC5pVZ/hKk1G6oZ/LUhni8eK5pn5o5WmWFfU9QtrG1g51rirGnBJZ4t4MtPsKEozipQeYyWU/IkztqXUW9KjnPVwjDPjhYNDbARPgiStXsMCmS8ORgmbQ5FFwAQAABeBNR8F6lYkzfBBVAAEMnQ7W/wDm7vTp6dtPd2NKhV4qNxcRpyT+aOXnK8Ufg+l3pEuNKrz0HQarpXaj/FXUXxp5XCEfCWOLfd3ceXh9atVr1ZVa9SdWrN5lOct5yfm2S1ZHpV50dbLu4k7HpB0qNBvhGtOnKcV6qaT9kfttgdF2G2Yrxq220Om6hqk1uKvO6pprPdCO9wz+r8z58BFx9mpppOLymspoHzHsHt/qeyt5ThOtUudLbSq2k5ZSXjDPZa9n3n0rYXdC/s6F5aVFUt69ONSnNd8Wso1KzY3M7jhSkaGV28W835FHGhI5dPkdfSllnPpdktGgAMgAAJRMuOCEGwID9MrwBIHx/rd3VvtYvrqu26ta4nOTb73JnBPdNq+hmnqWq17/AEbUadpCvNznb1abcYyfF7rT5Z7scDpPgZqf1qz+3MzjWvJges/AzU/rVn9uY+Bmp/WrP7cxhryY+jeg67q3OwlKnVbatripSg38vCWPeTPx1LoLv3NKrrlrGGeLjRlJr0WV+567s1oVns3o1vpenxfU0k8zk/zTk+Lk/Nssha7Qwvv6Wp6G5hfNfhZ/p+5phwaHM7Gl2Trrc7Gl2S3o0ABlQAAAAABDG8u8CRgrvx8SOtgv7kBfAwZuvSXOaKu6oLnURRsDH8Xb/wCREO8oY/meyYwbnX6hVUpKjHjh5kK17KS3aCa/2ZjSptvL5lkRrbxOfBcDGjDByESqAAgAAAAAKvzKM1ayRuoDCSM5JnJcRuIo4MoZKOjk7Dq0OqRdHXdR5BUPI7HqkOrXgNqOFGh5HJp0sGygi2CaqIrBIBAAAAAAAAAAAAAAAAAAAAAAAAAAAH//2Q=="
              : imgUpload,
        })
        .then((logins) => {
          localStorage.setItem("user", JSON.stringify(logins.data));
          dispatch({
            type: actionType.SET_USER,
            user: logins.data,
          });
          // navigate("/");
        })
        .catch((error) => {
          wronUser();
        });
    }
  };
  const hundleFileUpload = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    if (!selectedFile) {
    } else {
      const imageRef = ref(storage, `profile/${selectedFile.name + v4()}`);
      uploadBytes(imageRef, selectedFile).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          setImgUpload(url);
        });
      });
    }
  };

  return (
    <div className="login">
      <div className="l-image">
        <div className="imgBox logo-image">
          <img
            src={imgUpload == null ? "" : imgUpload}
            alt="profile"
            className="profilePic"
          />
        </div>
        <AddAPhotoIcon
          className="camera-icon"
          onClick={() => document.getElementById("fileInput").click()}
        />
        <input
          type="file"
          id="fileInput"
          className="fileInputText"
          onChange={hundleFileUpload}
        />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          placeholder="userName"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="userEmail"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <div className="submit-register">
          <button
            type="submit"
            className="login-form-button "
            onClick={handleSubmit}
          >
            Register
          </button>
          <Link href={"/auth/login"} className="login-form-button padf">
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
