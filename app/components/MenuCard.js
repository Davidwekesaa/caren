import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
function MenuCard({ imgSrc, name,isActive }) {
  return (
    <div className={`rowMenuCard ${isActive == 0 ? "active": ""}`}>
      <div className="imgBox">
        <img src={imgSrc} alt="Honey" />
      </div>
      <h3>{name}</h3>
      <i className="loadMenuIcon">
        <ChevronRightIcon />
      </i>
    </div>
  );
}

export default MenuCard;
