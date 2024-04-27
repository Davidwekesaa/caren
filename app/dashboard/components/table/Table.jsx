import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import ClearIcon from "@mui/icons-material/Clear";
import { ToastContainer, toast } from "react-toastify";
import { useStateValue } from "@/app/store/StateProvider";

// popup
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BasicTable = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [arrayOrderData, arratOrderData] = useState(null);
  const [status, setStatus] = useState(null);
  const [updateId, setUpdateId] = useState(null);
  const [{ user }, dispatch] = useStateValue();

  const orderSuccess = () => toast.success("Status Updated Successfuly");
  const orderDeleteSuccess = () => toast.success("Order deleted Successfuly");
  const orderError = () => toast.error("Error occured");

  const orderstatus = [
    { id: 10, name: "" },
    { id: 1, name: "delivered" },
    { id: 2, name: "declined" },
    { id: 3, name: "pending" },
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const hundleRowClick = async (e, id, idRowDialog) => {
    e.preventDefault();
    setUpdateId(idRowDialog);
    await axios
      .post(`/api/order/OrderArray/`, {
        orderIds: id,
      })
      .then((user) => {
        console.log("array user ", user);
        arratOrderData(user?.data?.orders);
        handleClickOpen();
      })
      .catch((error) => {
        orderError();
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/UserOrders/${updateId}`, {
        status: status.toString(),
      })
      .then((user) => {
        orderSuccess();
        handleClose();
      })
      .catch((error) => {});
  };

  const hundleRowDelete = async (e) => {
    e.preventDefault();

    await axios
      .delete(`/api/UserOrders/${updateId}`)
      .then((user) => {
        orderDeleteSuccess();
        handleClose();
      })
      .catch((error) => {});
  };

  function formatDate(isoDateString) {
    const date = new Date(isoDateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
  }
  return (
    <div>
      <TableContainer component={Paper} className="dash-table">
        <Table
          className="dash-table-table"
          sx={{ minWidth: 650, textAlign: "center" }}
          aria-label="simple table"
        >
          <TableHead className="dash-tableHead">
            <TableRow>
              {/* <TableCell className="dash-tableCell">Tracking ID</TableCell> */}
              <TableCell className="dash-tableCell">Customer</TableCell>
              <TableCell className="dash-tableCell">Date</TableCell>
              <TableCell className="dash-tableCell">Phone</TableCell>
              <TableCell className="dash-tableCell">Order For</TableCell>
              <TableCell className="dash-tableCell">Address</TableCell>
              <TableCell className="dash-tableCell">Amount</TableCell>
              <TableCell className="dash-tableCell">Delivey Fee</TableCell>
              <TableCell className="dash-tableCell">Orders</TableCell>
              <TableCell className="dash-tableCell">Payment</TableCell>
              <TableCell className="dash-tableCell">Transaction Id</TableCell>
              <TableCell className="dash-tableCell">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              ?.sort((a, b) => {
                return new Date(b.createdAt) - new Date(a.createdAt);
              })
              ?.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={(e) => hundleRowClick(e, row.orders, row._id)}
                  className="dash-table-row"
                >
                  <TableCell className="dash-tableCell">
                    <div className="dash-productimgwrapper">
                      <div className="dash-l-image">
                        <img
                          className="dash-image"
                          src={row.userProfile}
                          alt="productimg"
                        />
                      </div>
                      {row.userName}
                    </div>
                  </TableCell>
                  <TableCell className="dash-tableCell dash-tableCell-date">
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell className="dash-tableCell">{row.phone}</TableCell>
                  <TableCell className="dash-tableCell">
                    {row.OrderFor}
                  </TableCell>
                  <TableCell className="dash-tableCell">
                    {row.address}
                  </TableCell>
                  <TableCell className="dash-tableCell">{`Ksh ${row.total}`}</TableCell>
                  <TableCell className="dash-tableCell">{`Ksh ${
                    row.delivery ? row.delivery : 0
                  }`}</TableCell>
                  <TableCell className="dash-tableCell">{`${row.orders.length}`}</TableCell>
                  <TableCell className="dash-tableCell dash-tableCell-date">{`${
                    row.payment === "cash" ? "On Delivery" : "Before Delivery"
                  }`}</TableCell>
                  <TableCell className="dash-tableCell">{`${
                    row.transactionId ? row.transactionId : ""
                  }`}</TableCell>
                  <TableCell className="dash-tableCell">
                    <span
                      className={`dash-status ${row.status}`}
                      onClick={`${row.status}`}
                    >
                      {row.status}
                    </span>{" "}
                  </TableCell>
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
          <TableContainer component={Paper} className="dash-table">
            <Table
              sx={{ minWidth: 650, textAlign: "center" }}
              aria-label="simple table"
            >
              <TableHead className="dash-tableHead">
                <TableRow>
                  <TableCell className="dash-tableCell">Product</TableCell>
                  <TableCell className="dash-tableCell">Amout</TableCell>
                  <TableCell className="dash-tableCell">Quantity</TableCell>
                  <TableCell className="dash-tableCell">Kg/g</TableCell>
                  {/* <TableCell className="dash-tableCell">Orders</TableCell>
                  <TableCell className="dash-tableCell">Status</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {arrayOrderData === null ? (
                  ""
                ) : (
                  <>
                    {arrayOrderData?.map((row) => (
                      <TableRow
                        key={row._id}
                        // onClick={(e) => hundleRowClick(e, row._id)}
                        className="dash-table-row"
                      >
                        <TableCell className="dash-tableCell">
                          <div className="dash-productimgwrapper">
                            <div className="dash-l-image">
                              <img
                                className="dash-image"
                                src={row.imgSrc}
                                alt="productimg"
                              />
                            </div>
                            {row.itemName}
                          </div>
                        </TableCell>
                        <TableCell className="dash-tableCell">
                          {row.total}
                        </TableCell>
                        <TableCell className="dash-tableCell">
                          {row.qty}
                        </TableCell>
                        <TableCell className="dash-tableCell">{`${row.kgs} ${row.capacity}`}</TableCell>
                        {/* <TableCell className="dash-tableCell">{`${row.orders.length}`}</TableCell>

                        <TableCell className="dash-tableCell">
                          <span className={`dash-status ${row.status}`}>
                            {row.status}
                          </span>{" "}
                        </TableCell> */}
                      </TableRow>
                    ))}
                  </>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="dailog-dash-status">
          {/* <Button onClick={handleClose} autoFocus>
            Agree
          </Button> */}
          <form className="dialog-dash-form-select">
            <label htmlFor="sub-county">Status</label>
            <select
              name="sub-county"
              id="sub-county"
              className="dialog-dash-custome-select"
              onChange={(e) => setStatus(e.target.value)}
            >
              {orderstatus?.map((data) => (
                <option key={data.id} value={data.name}>
                  {data.name}
                </option>
              ))}
            </select>
          </form>
          <Button
            onClick={handleUpdate}
            disabled={
              status == null || updateId == null || status.trim().length == 0
                ? true
                : false
            }
          >
            Update
          </Button>

          {user?.userRights !== 1 ? (
            <span
              className={`dash-status declined order-del`}
              onClick={hundleRowDelete}
            >
              Delete
            </span>
          ) : (
            ""
          )}
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default BasicTable;
