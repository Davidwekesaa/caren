"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function UserExpenses() {
  const [noItems, setNoItems] = useState("");
  const [category, setCategory] = useState(null);
  const [categoryid, setCategoryid] = useState("");

  const emptyFields = () => toast.error("All the fields are required");
  const userAddSuccess = () => toast.success("Expense cost added successfuly");

  useEffect(() => {
    const getCategory = async () => {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}expenses`)
        .then((category) => {
          setCategory(category.data);
        })
        .catch((error) => {
          // wronUser();
        });
    };
    getCategory();
  }, []);

  const handleDataSubmit = async (e) => {
    e.preventDefault();
    if (noItems.trim().length == 0 || categoryid.trim().length == 0) {
      emptyFields();
    } else {
      await axios
        .put(`${process.env.REACT_APP_Server_Url}expenses/${categoryid}`, {
          cost: parseInt(noItems),
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
              <form className="form-select">
                <label htmlFor="sub-county">Expense:</label>
                <select
                  name="sub-county"
                  id="sub-county"
                  className="custome-select"
                  onChange={(e) => setCategoryid(e.target.value)}
                  value={categoryid}
                >
                  <option
                    key={"2446576899809809897"}
                    value={"2446576899809809897"}
                  >
                    {""}
                  </option>
                  {category?.map((data) => (
                    <option key={data._id} value={data._id}>
                      {data.expenseName}
                    </option>
                  ))}
                </select>
              </form>

              <div className="formInput">
                <label htmlFor="">Expense Cost</label>
                <input
                  id={`name`}
                  onChange={(e) => setNoItems(e.target.value)}
                  type="text"
                  placeholder={`enter the cost`}
                  className="dash-input"
                  value={noItems}
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

export default UserExpenses;
