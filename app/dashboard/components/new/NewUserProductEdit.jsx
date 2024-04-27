"use client";
import React, { useState, useEffect } from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import axios from "axios";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";

function NewUserProductEdit({ id }) {
  const [file, setFile] = useState(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAMAAABCWSJWAAAARVBMVEXm6vJzgJXr7/Zue5Gdprbe4utodo2XobKAjJ9vfZLO1N52g5jj5+/HzdhqeY+gqbm9xNCutsSnr77W2+S1vMmPmauGkaTWvH5FAAADbklEQVR4nO2a23LjIAxAjTAYzCUOvvz/pxbHaZs0TQwKcl44L9vp7HTOCCEDUtNUKpVKpVKpVCqVyjMAwIqIjT98VqOf2nlRkWVup/5TOmCHjkuvtWaR+I+XvBvs8TIwngzn7A+cm9N4rAzYoP1fjw2vw6GRGeRDQG5CI4ejPEDMTyLyE5lZHBIY6M2LkFwDY/oDXGDges8kbig+kLvAkCBykaF2ASfTTBiTjtQF+lSRFdJ8AZO4PJclMoQq0O3s4nt8R+YCLsskutCli8pYnhWtiETgvFva/sLPRGExuSaMGRIRGJJLyi+SpNDZJTNTVvRiCVSyqtsvfXkTOGfu5A1PkLiQu5M3tCqvYjEiK8WTBfrsorLBi38U44kJqVJ8OyNK7VWlfN6eUFkb8/ZU2gQ6bFTKnxTwKqVNqkpVqSrvAPgSV7zwB2xUQnGVCasyFVdxWJXy1zKBVRGlTeLNHadCcIeHFhUW3hJchHLv7hvelTdphMKoqPKpgqws5avKBYG5M1MEBZW4JEm7IvKjQhMUxLWZ4sJ8xebdm7WieNHYgLzMlZRNB5gylsgX/ybfu4T0h3WaknLrkhgXT22yniyTXHzxc+R/LueENZJ02/jOxe21ybihbcDcuIyzfFFgtJwPbPDCoJ6uklT0vbo7Fzuox4732vNWxzfgoXGtl1z/rJTWXPrWNR8ZS4CmD/NitI9os8yh/4zHJgONFWMfGYVtPjo2UqlUKuWAb+xlLE4Ia39+dZxCE+urm87rQJxh3PMrnjOzjsedJxdrb0OpdAnBOIRuViZ++KKCfji0xE8i9/EjadTchWG0BDGKf1G4qVVerjN5r49w31Lr/1Xt5EQ5nTUW7qSY/icK+0JcM9W6NT4FRFxYmEwZtXrqwyVbgntTBvrg39K40fHhjd4qjB1DPpH+B2cd8vgNEHRBkYuMDphlgt6gniRf4xFjhPHeVSBFHtHZtzXU3EwamdM16LZ/ClmjATASmkSXjI1kafLkG22S3+gyhwLzSR8jdKQxWdGJTYismU2kSlqXKGOkFk/iMO5MHpQYljnFpCfO2Q2fMC+X/Br6pkrCWyqgmmH5JMzLjcjOaS5m3A0KtrWdi97dQ1kNhXfYb0agxyBy2W9wwukold0mALLJjlDZ7XBWlapSVapKVakqVaWqXPgCxAMyml95++4AAAAASUVORK5CYII="
  );
  const [productName, setproductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCapacity, setProductCapacity] = useState("");
  const [productQuantity, setproductQuantity] = useState("");
  const [noItems, setNoItems] = useState("");
  const [noItemsnew, setNoItemsNew] = useState(0);

  const emptyFields = () => toast.error("All the fields are required");
  const userAddSuccess = () => toast.success("Product Updated successfuly");

  useEffect(() => {
    const getProductById = async () => {
      await axios
        .get(`/api/products/${id}`)
        .then((logins) => {
          setFile(logins?.data?.Products?.imgSrc);
          setproductName(logins?.data?.Products?.name);
          setProductPrice(logins?.data?.Products?.price);
          setProductCapacity(logins?.data?.Products?.capacity);
          setproductQuantity(logins?.data?.Products?.kgs);
          setNoItems(logins?.data?.Products?.qty);
        })
        .catch((error) => {
          // wronUser();
        });
    };
    getProductById();
  }, []);

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (
      file.trim().length == 0 ||
      productName.trim().length == 0 ||
      productPrice.toString().trim().length == 0 ||
      productCapacity.trim().length == 0 ||
      productQuantity.trim().length == 0 ||
      noItems.toString().trim().length == 0 ||
      noItemsnew.toString().trim().length == 0
    ) {
      emptyFields();
    } else {
      await axios
        .put(`/api/products/${id}`, {
          name: productName,
          // itemId: "63f9e0e574ba5f2593ea675a",
          imgSrc: file,
          price: parseInt(productPrice),
          capacity: productCapacity,
          kgs: productQuantity,
          qty: parseInt(noItems) + parseInt(noItemsnew),
        })
        .then((logins) => {
          // localStorage.setItem('user',JSON.stringify(logins.data))
          // dispatch({
          //   type: actionType.SET_USER,
          //   user: logins.data,
          // });
          // navigate("/");
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
      const imageRef = ref(storage, `products/${selectedFile.name + v4()}`);
      uploadBytes(imageRef, selectedFile).then((snaphsot) => {
        getDownloadURL(snaphsot.ref).then((url) => {
          setFile(url);
        });
      });
    }
  };

  return (
    <div className="dash-new">
      {/* <Sidebar /> */}

      <div className="dash-newContainer">
        {/* <Navbar /> */}

        {/* <div className="dash-newTop">
          <h1 className="topTitle">{title}</h1>
        </div> */}
        <div className="dash-newBottom">
          <div className="bottomLeft">
            <img
              className="dash-leftimg"
              // src={file ? URL.createObjectURL(file) : img}
              src={file}
              alt="img"
            />
          </div>
          <div className="dash-bottomRight">
            <form className="dash-form-new-user">
              {/*  onSubmit={handleDataSubmit} */}
              <div className="dash-formInput">
                <label htmlFor="file" className="dash-label">
                  Product Image:
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
                <label htmlFor="name">Product</label>
                <input
                  id={`name`}
                  onChange={(e) => setproductName(e.target.value)}
                  type="text"
                  placeholder={`enter product name`}
                  className="dash-input"
                  value={productName}
                />
              </div>

              <div className="formInput">
                <label htmlFor="Email">Price</label>
                <input
                  id={`Email`}
                  onChange={(e) => setProductPrice(e.target.value)}
                  type="text"
                  placeholder={`enter product price`}
                  className="dash-input"
                  value={productPrice}
                />
              </div>
              <div className="formInput">
                <label htmlFor="Email">Quantity</label>
                <input
                  id={`Email`}
                  onChange={(e) => setproductQuantity(e.target.value)}
                  type="text"
                  placeholder={`enter  quantity e.g 250`}
                  className="dash-input"
                  value={productQuantity}
                />
              </div>
              <div className="formInput">
                <label htmlFor="">Capacity</label>
                <input
                  id={`name`}
                  onChange={(e) => setProductCapacity(e.target.value)}
                  type="text"
                  placeholder={` enter capacity e.g kg/g `}
                  className="dash-input"
                  value={productCapacity}
                />
              </div>
              <div className="formInput">
                <label htmlFor="">No. Items Remaining</label>
                <input
                  id={`name`}
                  onChange={(e) => setNoItems(e.target.value)}
                  type="text"
                  placeholder={`enter number of items`}
                  className="dash-input"
                  value={noItems}
                  disabled
                />
              </div>

              <div className="formInput">
                <label htmlFor=""> New No. Items</label>
                <input
                  id={`name`}
                  onChange={(e) => setNoItemsNew(e.target.value)}
                  type="text"
                  placeholder={`enter number of items`}
                  className="dash-input"
                  value={noItemsnew}
                />
              </div>
              <button
                type="submit"
                className="dash-button"
                onClick={handleDataSubmit}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewUserProductEdit;
