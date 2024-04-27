import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function SubMenuContainer({ name }) {
  return (
    <div className="subMenuContainer">
      {name?.trim()?.length !== 0 ? <h3>{name}</h3> : ""}
      <div className="viewAll">
        <p>View All</p>
        <i className="ppph">
          <ChevronRightIcon />
        </i>
      </div>
    </div>
  );
}

export default SubMenuContainer;
