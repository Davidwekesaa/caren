import React, { useState, useEffect } from "react";
import "./tablestyle.css";
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
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import NewUserProduct from "../new/NewUserProduct";
import NewUserProductEdit from "../new/NewUserProductEdit";
import NewProductCategory from "../new/NewProductCategory";
import EditNewProductCategory from "../new/EditNewProductCategory";
import { useStateValue } from "@/app/store/StateProvider";

// popup
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const TableListCategory = ({ rows }) => {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [arrayOrderData, arratOrderData] = useState(null);
  const [status, setStatus] = useState(null);
  const [updateId, setUpdateId] = useState(null);

  const [category, setCategory] = useState(null);
  useEffect(() => {
    const getTotalCategory = async () => {
      await axios
        .get(`/api/products/category/`)
        .then((user) => {
          setCategory(user?.data?.getAllCategory);
        })
        .catch((error) => {});
    };

    getTotalCategory();
  }, []);

  const orderSuccess = () => toast.success("Cagetory Deleted Successfuly");
  const orderError = () => toast.error("Error occured");

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

  const handleClickOpenEdit = (e, id) => {
    e.preventDefault();
    setUpdateId(id);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const hundleRowClick = async (e, id, idRowDialog) => {
    e.preventDefault();
    // setUpdateId(idRowDialog);
    // await axios
    //   .post(`${process.env.REACT_APP_Server_Url}getUserArray/`, {
    //     orderIds: id,
    //   })
    //   .then((user) => {
    //     arratOrderData(user.data);
    //     handleClickOpen();
    //   })
    //   .catch((error) => {
    //     orderError();
    //   });
  };

  const hundleRowDelete = async (e, id) => {
    e.preventDefault();
    // setUpdateId(idRowDialog);

    await axios
      .delete(`/api/products/category/${id}`)
      .then((user) => {
        orderSuccess();
      })
      .catch((error) => {
        orderError();
      });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    // (updateId);
    // await axios
    //   .put(`${process.env.REACT_APP_Server_Url}UserOrders/${updateId}`, {
    //     status: status.toString(),
    //   })
    //   .then((user) => {
    //     orderSuccess();
    //     handleClose();
    //   })
    //   .catch((error) => {
    //     (error);
    //   });
  };
  return (
    <div className="dash-table-data">
      <div className="dash-user-add-user">
        <div
          className="dash-user-add-user-add add-category"
          onClick={handleClickOpenCategory}
        >
          <LibraryAddIcon />
          <p>Add Category</p>
        </div>

        {/* <div className="dash-user-add-user-add" onClick={handleClickOpen}>
          <LibraryAddIcon />
          <p>Add Product</p>
        </div> */}
      </div>
      <TableContainer component={Paper} className="dash-table">
        <Table
          sx={{ minWidth: 650, textAlign: "center" }}
          aria-label="simple table"
        >
          <TableHead className="dash-tableHead">
            <TableRow>
              {/* <TableCell className="dash-tableCell">Tracking ID</TableCell> */}
              <TableCell className="dash-tableCell">Category Name</TableCell>
              {user?.userRights !== 1 ? (
                <TableCell className="dash-tableCell">Actions</TableCell>
              ) : (
                ""
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {category?.map((row) => (
              <TableRow
                key={row._id}
                // onClick={(e) => hundleRowClick(e, row.orders, row._id)}
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
                    {row.name}
                  </div>
                </TableCell>

                {user?.userRights !== 1 ? (
                  <TableCell className="dash-tableCell">
                    <span
                      className={`dash-status edit`}
                      // onClick={(`${row.status}`)}
                      onClick={(e) => handleClickOpenEdit(e, row._id)}
                    >
                      Edit
                    </span>
                    {"   "}
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
          <NewUserProduct />
        </DialogContent>
        <DialogActions className="dailog-dash-status"></DialogActions>
      </Dialog>

      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="dash-dialog"
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title" className="dialog-dish-clear">
          <ClearIcon onClick={handleCloseEdit} />
        </DialogTitle>
        <DialogContent>
          <EditNewProductCategory id={updateId} />
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
          <NewProductCategory />
        </DialogContent>
        <DialogActions className="dailog-dash-status"></DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
};

export default TableListCategory;
