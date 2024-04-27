"use client";
import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
function SubMenuContainerCart({ name, clgf }) {
  const [{ toggleMenue }, dispatch] = useStateValue();
  const setTogglecartMenu = (e) => {
    e.preventDefault();
    dispatch({
      type: actionType.SET_TOGGLE,
      toggleMenue: !toggleMenue,
    });
  };
  return (
    <div className={`subMenuContainer popo ${clgf}`}>
      <h3>{name}</h3>
      <div className="viewAll" onClick={(e) => setTogglecartMenu(e)}>
        <p>Back</p>
        <i>
          <ChevronRightIcon />
        </i>
      </div>
    </div>
  );
}

export default SubMenuContainerCart;
