"use client";
import React from "react";
// import SubMenuContainerCart from "./SubMenuContainerCart";
import CartItem from "./CartItem";
import SubMenuContainerCart from "./SubMenuContainerCart";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
// import CartItem from "./CartItem";
function RightContainer({
  handleDelivery,
  counties,
  Counties,
  handleSubCounty,
  subCountiese,
  sSbCounty,
  setLocation,
  location,
  cart,
  total,
  deliveryFee,
  setMpesa,
  setRecepientTrue,
  recepientTrue,
  setRecepientName,
  recepientName,
  setPhone,
  phone,
  checkOut,
  checkDisable,
  subCounties,
}) {
  const [{ toggleMenue }, dispatch] = useStateValue();
  return (
    <div className={`rightContainer ${toggleMenue ? "active" : ""}`}>
      <div className="debitCardContainer">
        <form className="form-selectt">
          <label htmlFor="Countriess">County:</label>
          <input
            name="Countries"
            id="Countriess"
            list="Countries"
            className="custome-select"
            onChange={handleDelivery}
            value={counties}
          />
          <datalist id="Countries">
            {Counties?.map((data, index) => (
              <option key={index} value={data.name} name={data.name}>
                {data.name}
              </option>
            ))}
          </datalist>
        </form>

        <form className="form-selectt">
          <label htmlFor="sub-countyy">Sub County:</label>
          <input
            list="sub-county"
            id="sub-countyy"
            className="custome-select"
            onChange={handleSubCounty}
            value={subCountiese}
          />
          <datalist id="sub-county">
            {sSbCounty
              ? sSbCounty?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))
              : subCounties?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
          </datalist>
        </form>

        <form className="form-selectt">
          <label htmlFor="locations">Location:</label>
          <input
            name="location"
            id="locations"
            // list="location"
            className="custome-select"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
        </form>
      </div>

      <div className="cartCheckOutContainer">
        <SubMenuContainerCart name={"Cart Items"} clgf={"style-again"} />
        <div className="cartContainer">
          <div className="cartItems">
            {cart &&
              cart.map((data) => (
                <CartItem
                  key={data.id}
                  name={data.name}
                  imgSrc={data.imgSrc}
                  itemQty={data.qty}
                  price={data.price}
                  itemId={data.id}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="totalSection">
        <div className="total">
          <h3>Cart Total</h3>
          <p>
            <span>Ksh </span>
            {cart
              ? cart?.reduce((acc, curr) => {
                  return acc + curr?.total;
                }, 0)
              : 0}
          </p>
        </div>
        <div className="total">
          <h3>Delivery Fee</h3>
          <p>
            <span>Ksh </span>
            {deliveryFee ? deliveryFee : 0}
          </p>
        </div>
        <div className="total">
          <h3>Total cost</h3>
          <p>
            <span>Ksh </span>
            {deliveryFee ? parseInt(deliveryFee) + parseInt(total) : 0}
          </p>
        </div>
        <div className="total check">
          <p>{`Pay with mpesa (Till: 5412199)`}</p>
          <div className="checkboxes">
            <form className="paywith-wat">
              <div className="checkboxCash">
                <label htmlFor="cash">{`On delivery`}</label>
                <input
                  type="radio"
                  id="cash"
                  name="payment"
                  value="cash"
                  onChange={(e) => setMpesa(e.target.value)}
                />
              </div>

              {/* <div className="checkboxCash">
                <label htmlFor="mpesa">{`Before delivery`}</label>
                <input
                  type="radio"
                  id="mpesa"
                  name="payment"
                  value="mpesa"
                  onChange={(e) => setMpesa(e.target.value)}
                />
              </div> */}
            </form>
          </div>
          <div className="checkboxes">
            <form className="paywith-wat">
              <div className="checkboxCash">
                <label htmlFor="order">Order For</label>
                <input
                  type="radio"
                  id="order"
                  onChange={(e) => setRecepientTrue(!recepientTrue)}
                  checked={recepientTrue}
                />
              </div>
            </form>
            <div
              className={`inputBox ${
                recepientTrue ? "recept-disp" : "recept"
              } `}
            >
              <input
                type="text"
                placeholder=" recipient name"
                onChange={(e) => setRecepientName(e.target.value)}
                value={recepientName}
              />
            </div>
          </div>
          <div className={`inputBox `}>
            <input
              type="number"
              placeholder="Enter Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />
          </div>
        </div>
      </div>
      <button
        className="checkOut"
        onClick={checkOut}
        disabled={
          cart === null || cart?.length == 0 || checkDisable ? true : false
        }
      >
        Check Out
      </button>
    </div>
  );
}

export default RightContainer;
