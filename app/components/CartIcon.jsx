"use client";
import React from "react";
import Badge from "@mui/material/Badge";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useStateValue } from "@/app/store/StateProvider";
function CartIcon() {
  const [{ user, cart }, dispatch] = useStateValue();
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
      >
        <AddShoppingCartIcon color="action" className="AddShoppingCartIcon" />
      </Badge>
    </>
  );
}

export default CartIcon;
