import React, { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
import axios from "axios";
import { DeleteOnCartMinus, returnCartItemQuantinty } from "../utils/Utils";
// import { DeleteOnCartMinus, returnCartItemQuantinty } from "./Functions";
let cartItems = [];
function CartItem({ name, imgSrc, price, itemId, itemQty }) {
  const [{ cart, total }, dispatch] = useStateValue();
  const [qty, setQty] = useState(
    parseInt(returnCartItemQuantinty(cart, itemId))
  );
  const [itemPrice, setItemPrice] = useState(parseInt(qty) * parseInt(price));
  returnCartItemQuantinty(cart, itemId);
  useEffect(() => {
    cartItems = cart;
    setItemPrice(parseInt(qty) * parseInt(price));
    const cartPriceUpdate = cartItems.find((uItem) => uItem.id === itemId);
    cartPriceUpdate.total = itemPrice;
    cartPriceUpdate.qty = qty;
    //update total
    dispatch({
      type: actionType.SET_TOTAL,
      total: cart.reduce((acc, curr) => {
        return acc + curr.total;
      }, 0),
    });
    localStorage.setItem("cart", JSON.stringify(cartItems));
    localStorage.setItem(
      "total",
      JSON.stringify(
        cart.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)
      )
    );
  }, [qty, itemPrice, cart]);

  const updateQuantity = (action, id) => {
    if (action === "add") {
      const getProductById = async () => {
        await axios
          .get(`${process.env.REACT_APP_Server_Url}Product/${id}`)
          .then((logins) => {
            if (
              logins.data.qty - (returnCartItemQuantinty(cart, itemId) + 1) >
              0
            ) {
              setQty(returnCartItemQuantinty(cart, itemId) + 1);
            }
          })
          .catch((error) => {
            // wronUser();
          });
      };
      getProductById();
    } else {
      if (returnCartItemQuantinty(cart, itemId) === 1) {
        DeleteOnCartMinus(cartItems, id);
        localStorage.setItem("cart", JSON.stringify(cartItems));
        dispatch({
          type: actionType.SET_CART,
          cart: cartItems,
        });
      }
      setQty(returnCartItemQuantinty(cart, itemId) - 1);
    }
  };
  return (
    <div className="cartItem">
      <div className="imgBox">
        <img src={imgSrc} alt="" />
      </div>
      <div className="itemSection">
        <h2 className="itemName">
          {cart?.find((n) => n.id === itemId)?.name +
            " " +
            "(" +
            cart?.find((n) => n.id === itemId)?.kgs +
            cart?.find((n) => n.id === itemId)?.capacity +
            ")"}
        </h2>
        <div className="itemQuantity">
          <span>x {cart?.find((n) => n.id === itemId)?.qty}</span>
          <div className="quantity">
            <RemoveIcon
              className="itemRemove"
              onClick={() => updateQuantity("remove", itemId)}
            />
            <AddIcon
              className="itemAdd"
              onClick={() => updateQuantity("add", itemId)}
            />
          </div>
        </div>
      </div>
      <p className="itemPrice">
        <span className="currency">Ksh </span>
        <span className="itemPriceValue">
          {cart?.find((n) => n.id === itemId)?.total}
        </span>
      </p>
    </div>
  );
}

export default CartItem;
