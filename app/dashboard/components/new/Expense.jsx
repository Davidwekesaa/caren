"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function NewProductCategory({ img, title, inputs }) {
  const [name, setName] = useState("");
  const emptyFields = () => toast.error("All the fields are required");
  const userAddSuccess = () => toast.success("Expenses added successfuly");
  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length == 0) {
      emptyFields();
    } else {
      await axios
        .post(`${process.env.REACT_APP_Server_Url}expenses/`, {
          expenseName: name,
        })
        .then((logins) => {
          userAddSuccess();
        })
        .catch((error) => {
          // wronUser();
        });
    }
  };

  return (
    <div className="dash-new">
      <div className="dash-newContainer">
        <div className="dash-newBottom">
          <div className="dash-bottomRight">
            <form className="dash-form-new-user">
              <div className="formInput">
                <label htmlFor="name">Expense Name</label>
                <input
                  id={`name`}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={`enter expense name`}
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
