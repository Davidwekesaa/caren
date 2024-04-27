import React, { useState, useEffect } from "react";
import "./tablestyle.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import Expenser from "../../pages/new/Expense";
import UserExpenses from "../../pages/new/UserExpenses";
import axios from "axios";
import { useStateValue } from "../../../../store/StateProvider";

// popup

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Expense = ({ rows }) => {
  const [openEdit, setOpenEdit] = useState("");
  const [openAboutId, setOpenAboutId] = useState("");

  const emptyFields = () => toast.error("An error occured");
  const deleteSuccess = () => toast.success("Updated successfuly");

  useEffect(() => {
    const getAbout = async () => {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}about/`)
        .then((user) => {
          setOpenEdit(user?.data?.length !== 0 ? user.data[0]?.About : "");
          setOpenAboutId(user?.data?.length !== 0 ? user.data[0]?._id : "");
        })
        .catch((error) => {});
    };

    getAbout();
    // updateAbout()
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`${process.env.REACT_APP_Server_Url}about/${openAboutId}`, {
        About: openEdit,
      })
      .then((useroders) => {
        // (useroders.data)
        deleteSuccess();
      })
      .catch((error) => {});
  };

  const handleSend = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_Server_Url}about/`, {
        About: openEdit,
      })
      .then((useroders) => {
        // (useroders.data)
        deleteSuccess();
      })
      .catch((error) => {});
  };

  return (
    <div className="dash-table-data">
      <div className="text-inpt">
        <h4>Edit about Page</h4>
        <textarea
          type="text"
          className="dash-input-box"
          value={openEdit}
          onChange={(e) => setOpenEdit(e.target.value)}
        />
        <div className="submit-text">
          <button
            onClick={handleUpdate}
            className={
              openAboutId?.trim().length === 0 ? "bt-nt-show" : "  bt-show"
            }
          >
            update
          </button>
          <button
            onClick={handleSend}
            className={
              openAboutId?.trim().length === 0 ? "bt-show" : "bt-nt-show"
            }
          >
            send
          </button>
        </div>
        <div></div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Expense;
