"use client";
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { v4 } from "uuid";

import { ToastContainer, toast } from "react-toastify";
const BlogTable = ({
  setBlogHeading,
  setBlogBody,
  setFile,
  toRefreshl,
  setblogToEditt,
}) => {
  const [blog, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setrowsPerPage] = useState(100);
  const [pages, setPages] = useState();
  const [blogId, setblogId] = useState("");
  const [toRefresh, setToRefresh] = useState("");
  const orderSuccess = () => toast.success("blog Deleted Successfuly");
  const orderError = () => toast.error("Error occured");

  useEffect(() => {
    const getBlogs = async () => {
      await axios
        .get(`/api/blog?p=${parseInt(page)}&limit=${parseInt(rowsPerPage)}`)
        .then((product) => {
          setBlogs(product?.data?.getAllBlogs);
          setPages(product?.data?.numberOfPages);
        })
        .catch((error) => {
          orderError();
        });
    };

    getBlogs();
  }, [toRefresh, toRefreshl]);

  useEffect(() => {
    const getBlogs = async () => {
      if (blogId?.trim()?.length === 0) {
      } else {
        await axios
          .get(`/api/blog/${blogId}`)
          .then((product) => {
            setBlogHeading(product?.data?.Blogs?.blogHeading);
            setBlogBody(product?.data?.Blogs?.blogBody);
            setFile(product?.data?.Blogs?.blogImage);
            setblogToEditt(blogId);
          })
          .catch((error) => {
            orderError();
          });
      }
    };

    getBlogs();
  }, [blogId]);
  const hundleRowDelete = async (e, id) => {
    e.preventDefault();
    // setUpdateId(idRowDialog);

    await axios
      .delete(`/api/blog/${id}`)
      .then((user) => {
        orderSuccess();
        setToRefresh(v4());
      })
      .catch((error) => {
        orderError();
      });
  };
  return (
    <div className="dash-table-data">
      <TableContainer component={Paper} className="dash-table">
        <Table
          sx={{ minWidth: 650, textAlign: "center" }}
          aria-label="simple table"
        >
          <TableHead className="dash-tableHead">
            <TableRow>
              <TableCell className="dash-tableCell">Blog Heading</TableCell>
              <TableCell className="dash-tableCell">Comments</TableCell>
              <TableCell className="dash-tableCell">Blog Owner</TableCell>
              <TableCell className="dash-tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blog?.map((row) => (
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
                        src={row?.blogImage}
                        alt="productimg"
                      />
                    </div>
                    {row?.blogHeading}
                  </div>
                </TableCell>
                <TableCell className="dash-tableCell">
                  {row?.blogComments?.length}
                </TableCell>
                <TableCell className="dash-tableCell">
                  {row?.blogOwner}
                </TableCell>

                <TableCell className="dash-tableCell">
                  <span
                    className={`dash-status edit`}
                    onClick={(e) => setblogId(row?._id)}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default BlogTable;
