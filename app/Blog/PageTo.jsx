import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
function PageTo({ setPage, setrowsPerPage, page, rowsPerPage, totalPages }) {
  const next = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };
  const prev = (e) => {
    e.preventDefault();
    page === 1 ? setPage(page) : setPage(page - 1);
  };
  return (
    <>
      <div className="blog-pagination">
        <ul className="justify-content-center pgd">
          <div className="subMenuContainer">
            <div className="viewAll">
              <button
                className="pages-css"
                onClick={(e) => prev(e)}
                disabled={page === 1 ? true : false}
              >
                <i className="ppph">
                  <ChevronLeftIcon />
                </i>
                <p>Prev</p>
              </button>
            </div>
            <div className="paett">
              <p>
                Page {page} of {totalPages}
              </p>
            </div>
          </div>
          <div className="subMenuContainer">
            <div className="viewAll">
              <button
                className="pages-css"
                onClick={(e) => next(e)}
                disabled={page === totalPages ? true : false}
              >
                <p>Next</p>
                <i className="ppph">
                  <ChevronRightIcon />
                </i>
              </button>
            </div>
          </div>
        </ul>
      </div>
    </>
  );
}

export default PageTo;
