"use client";
import React from "react";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
function CartIcon() {
  const [{ user, cart, toggleMenue }, dispatch] = useStateValue();
  const setMenuToggle = (e) => {
    e.preventDefault();
    dispatch({
      type: actionType.SET_TOGGLE,
      toggleMenue: !toggleMenue,
    });
  };
  return (
    <>
      <Badge
        badgeContent={
          cart
            ? cart.reduce((acc, curr) => {
                return acc + curr?.qty;
              }, 0)
            : 0
        }
        color="primary"
        onClick={(e) => setMenuToggle(e)}
      >
        <AddShoppingCartIcon color="action" className="AddShoppingCartIcon" />
      </Badge>
    </>
  );
}

export default CartIcon;
