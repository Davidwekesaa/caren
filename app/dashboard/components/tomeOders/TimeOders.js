import React from "react";
function TimeOders({ title, data }) {
  console.log(
    title,
    data?.filter((item) => item.kgs === "1"),
    data
  );
  return (
    <div className="dash-time-orders">
      <div className="dash-tins">
        <p className="can-heading">{title}</p>
        <div className="time-can-order">
          <div className="cans">
            <p className="cans-item">{`1kg Cans: ${
              data
                ? data
                    .filter((item) => item.kgs === "1")
                    .reduce((acc, curr) => {
                      return acc + curr.qty;
                    }, 0)
                : 0
            }`}</p>
            <p className="can-total">{`ksh ${
              data
                ? data
                    .filter((item) => item.kgs === "1")
                    .reduce((acc, curr) => {
                      return acc + curr.total;
                    }, 0)
                : 0
            }`}</p>
          </div>

          <div className="cans">
            <p className="cans-item">{`500g Cans: ${
              data
                ? data
                    .filter((item) => item.kgs === "500")
                    .reduce((acc, curr) => {
                      return acc + curr.qty;
                    }, 0)
                : 0
            }`}</p>
            <p className="can-total">{`ksh ${
              data
                ? data
                    .filter((item) => item.kgs === "500")
                    .reduce((acc, curr) => {
                      return acc + curr.total;
                    }, 0)
                : 0
            }`}</p>
          </div>

          <div className="cans">
            <p className="cans-item">{`300g Cans: ${
              data
                ? data
                    .filter((item) => item.kgs === "300")
                    .reduce((acc, curr) => {
                      return acc + curr.qty;
                    }, 0)
                : 0
            }`}</p>
            <p className="can-total">{`ksh ${
              data
                ? data
                    .filter((item) => item.kgs === "300")
                    .reduce((acc, curr) => {
                      return acc + curr.total;
                    }, 0)
                : 0
            }`}</p>
          </div>

          <div className="cans">
            <p className="cans-item">{`250g Cans: ${
              data
                ? data
                    .filter((item) => item.kgs === "250")
                    .reduce((acc, curr) => {
                      return acc + curr.qty;
                    }, 0)
                : 0
            }`}</p>
            <p className="can-total">{`ksh ${
              data
                ? data
                    .filter((item) => item.kgs === "250")
                    .reduce((acc, curr) => {
                      return acc + curr.total;
                    }, 0)
                : 0
            }`}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeOders;
