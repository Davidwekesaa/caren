"use client";
import React from "react";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
function CartIcon() {
  return (
    <>
      <Badge badgeContent={4} color="primary">
        <AddShoppingCartIcon color="action" className="AddShoppingCartIcon" />
      </Badge>
    </>
  );
}

export default CartIcon;
