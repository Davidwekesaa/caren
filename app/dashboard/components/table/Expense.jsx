"use client";
import React, { useState } from "react";
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
import { useStateValue } from "@/app/store/StateProvider";

// popup

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Expense = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const emptyFields = () => toast.error("An error occured");
  const deleteSuccess = () => toast.success("Expense deleted successfuly");

  const [{ user }, dispatch] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenCategory = () => {
    setOpenCategory(true);
  };

  const handleClickCloseCategory = () => {
    setOpenCategory(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const hundleRowDelete = async (e, rowdel) => {
    await axios
      .delete(`${process.env.REACT_APP_Server_Url}expenses/${rowdel}`)
      .then((user) => {
        deleteSuccess();
      })
      .catch((error) => {
        emptyFields();
      });
  };

  return (
    <div className="dash-table-data">
      <div className="dash-user-add-user">
        <div
          className="dash-user-add-user-add add-category"
          onClick={handleClickOpenCategory}
        >
          <LibraryAddIcon />
          <p>Add Expense</p>
        </div>

        <div className="dash-user-add-user-add" onClick={handleClickOpen}>
          <LibraryAddIcon />
          <p>Add Expense Cost</p>
        </div>
      </div>
      <TableContainer component={Paper} className="dash-table">
        <Table
          sx={{ minWidth: 650, textAlign: "center" }}
          aria-label="simple table"
        >
          <TableHead className="dash-tableHead">
            <TableRow>
              <TableCell className="dash-tableCell">Expense</TableCell>
              <TableCell className="dash-tableCell">Total Cost(ksh)</TableCell>
              {user.userRights !== 1 ? (
                <TableCell className="dash-tableCell">Action</TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id} className="dash-table-row">
                <TableCell className="dash-tableCell">
                  <div className="dash-productimgwrapper">
                    {row.expenseName}
                  </div>
                </TableCell>
                <TableCell className="dash-tableCell">
                  {`${row.expenses?.reduce((acc, curr) => {
                    return acc + curr;
                  }, 0)}`}
                </TableCell>
                {user.userRights !== 1 ? (
                  <TableCell className="dash-tableCell">
                    <span
                      className={`dash-status declined`}
                      // onClick={(`${row.status}`)}
                      onClick={(e) => hundleRowDelete(e, row._id)}
                    >
                      Delete
                    </span>
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="dash-dialog"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-dish-clear">
          <ClearIcon onClick={handleClose} />
        </DialogTitle>
        <DialogContent>
          <UserExpenses />
        </DialogContent>
        <DialogActions className="dailog-dash-status"></DialogActions>
      </Dialog>

      <Dialog
        open={openCategory}
        onClose={handleClickCloseCategory}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="dash-dialog"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-dish-clear">
          <ClearIcon onClick={handleClickCloseCategory} />
        </DialogTitle>
        <DialogContent>
          <Expenser />
        </DialogContent>
        <DialogActions className="dailog-dash-status"></DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default Expense;
