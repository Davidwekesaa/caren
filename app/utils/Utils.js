// import CryptoJS from "crypto-js";
export const formatDate = (inputedate) => {
  const parts = inputedate?.split("/");
  if (parts?.length !== 3) {
    return "Invalid date format";
  }
  const [day, month, year] = parts?.map(Number);
  const months = [
    "Jan",
    "Feb",
    "mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = months[month - 1];
  return `${monthName} ${day}, ${year}`;
};

export const updateSearchParams = (e, bhad) => {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  params.set("q", bhad); // 'q' is the parameter name, change it accordingly
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  // Update the URL without refreshing the page
  window.history.pushState({}, "", newUrl);
  window.location.reload();
};

export const trancateWords = (inputString) => {
  const inputStr = inputString?.trim()?.length / 5;
  if (inputString?.length <= inputStr) {
    return inputString;
  } else {
    return inputString?.slice(0, inputStr) + "...";
  }
};

export const formatServerDate = () => {
  const date = new Date(); // Replace this with your date object
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
};

export const carrt = [];

// const key = CryptoJS.enc.Hex.parse(process.env.REACT_APP_FireBase_ApiKey);
// const iv = CryptoJS.enc.Hex.parse(process.env.REACT_APP_FireBase_App_Id);
// export const enCrypt = (plaintext) => {
//   // const plaintext = 'This is my secret message';

//   const encrypted = CryptoJS.AES.encrypt(plaintext, key, { iv: iv }).toString();

//   return encrypted;
// };
// // Decrypting a message
// export const deCrypt = (encrypted) => {
//   const decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv }).toString(
//     CryptoJS.enc.Utf8
//   );

//   return decrypted;
// };

//delete element from array
const DeleteFromArray = (cartItems, id, cartItem) => {
  const index = cartItems?.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    cartItems?.splice(index, 1, cartItem);
    return true;
  } else {
    return false;
  }
};

export const DeleteOnCartMinus = (cartItems, id) => {
  const index = cartItems?.findIndex((obj) => obj.id === id);
  if (index !== -1) {
    cartItems?.splice(index, 1);
    return true;
  } else {
    return false;
  }
};
//handle add item to cart

export const addItemToCart = (
  cart,
  carrt,
  isCart,
  dispatch,
  actionType,
  alreadyInCart
) => {
  carrt = cart ? cart : [];
  let cartItems = [];
  let isItemInCart = cart?.find((n) => n.id === isCart?.id);
  if (isItemInCart) {
    cartItems = cart;
    let cartItem = cartItems?.find((n) => n.id === isCart?.id);
    let total = parseInt(isItemInCart?.qty + 1) * parseInt(isItemInCart?.price);
    cartItem.total = total;
    cartItem.qty = parseInt(isItemInCart?.qty + 1);
    if (DeleteFromArray(cartItems, isCart?.id, cartItem)) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
      dispatch({
        type: actionType.SET_CART,
        cart: cartItems,
      });
      dispatch({
        type: actionType.SET_TOTAL,
        total: cart?.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0),
      });
      localStorage.setItem(
        "total",
        JSON.stringify(
          cart?.reduce((acc, curr) => {
            return acc + curr.total;
          }, 0)
        )
      );
      alreadyInCart("Quantity Updated");
    }
  } else {
    carrt.push(isCart);
    localStorage.setItem("cart", JSON.stringify(carrt));
    dispatch({
      type: actionType.SET_CART,
      cart: carrt,
    });
    dispatch({
      type: actionType.SET_TOTAL,
      total: cart?.reduce((acc, curr) => {
        return acc + curr.total;
      }, 0),
    });
    localStorage.setItem(
      "total",
      JSON.stringify(
        cart?.reduce((acc, curr) => {
          return acc + curr.total;
        }, 0)
      )
    );
    alreadyInCart("Item added to cart");
  }
};

//return the quanty of an item in cart
export const returnCartItemQuantinty = (cart, id) => {
  const index = cart?.find((obj) => obj.id === id)?.qty;
  return parseInt(index);
};
