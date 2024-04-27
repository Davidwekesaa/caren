"use client";
import { useEffect, useState } from "react";
import { useStateValue } from "@/app/store/StateProvider";
import { actionType } from "@/app/store/reducer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import SubMenuContainer from "../components/SubMenuContainer";
import RowContainer from "../components/RowContainer";
import { Counties, subCounties } from "../utils/Data";
import { carrt } from "../utils/Utils";
import DishItemContainer from "../components/DishItemContainer";
import Image from "next/image";
import spinner from "@/public/assets/spinner.gif";
import RightContainer from "../components/RightContainer";

function WellnesProducts() {
  const [
    {
      cart,
      total,
      user,
      county,
      subCounty,
      locationn,
      phonee,
      deliveryfee,
      toggleMenue,
    },
    dispatch,
  ] = useStateValue();

  //products
  const [Items, setItems] = useState([]);
  const [menuItems, setmenuItems] = useState([]);
  // set main dish
  const [isItemActive, setisItemActive] = useState("");
  const [search, setSearch] = useState("");
  const [isMainDish, setIsMainDish] = useState([]);
  const [isMainDishSearch, setIsMainDishSearch] = useState([]);
  // const [toggleCartMenu, setToggleCartMenu] = useState(false);
  const [checkDisable, setCheckDisble] = useState(false);

  const [mpesa, setMpesa] = useState("");
  // delivery fee
  const [deliveryFee, setDeliveryFee] = useState(deliveryfee);
  //address
  const [counties, setCounties] = useState(county);

  const [subCountiese, setSubCountiese] = useState(subCounty);
  const [location, setLocation] = useState(locationn);
  const [phone, setPhone] = useState(phonee);
  const [openEdit, setOpenEdit] = useState("");

  const [selectCode, setSelectCode] = useState([]);
  const [sSbCounty, setSSbCounty] = useState([]);

  //recepient name
  const [recepientName, setRecepientName] = useState("");
  const [recepientTrue, setRecepientTrue] = useState(false);

  //get all products
  useEffect(() => {
    //get all products
    const getAllProducts = async () => {
      await axios
        .get(`/api/products`)
        .then((product) => {
          console.log("products ", product.data?.getAllProducts);
          setItems(product.data?.getAllProducts);
        })
        .catch((error) => {});
    };
    // get category
    const getAllCategory = async () => {
      await axios
        .get(`/api/products/category`)
        .then((category) => {
          getAllProducts();
          setmenuItems(category?.data?.getAllCategory);
          console.log("menuee ", category.data?.getAllCategory[0]?._id);
          setisItemActive(category.data?.getAllCategory[0]?._id);
          setIsMainDish(
            Items?.filter(
              (item) =>
                item?.itemId == category?.data?.getAllCategory[0]?._id &&
                item?.qty != 0
            )
          );
        })
        .catch((error) => {});
    };
    // const getAbout = async () => {
    //   await axios
    //     .get(`${process.env.REACT_APP_Server_Url}about/`)
    //     .then((user) => {
    //       setOpenEdit(user.data.length != 0 ? user.data[0].About : "");
    //     })
    //     .catch((error) => {});
    // };

    getAllCategory();
    // getAbout();
  }, []);

  useEffect(() => {
    const menuLi = document?.querySelectorAll("#menu li");

    function setMenuActive() {
      menuLi?.forEach((n) => n?.classList?.remove("active"));
      this?.classList?.add("active");
    }

    menuLi?.forEach((n) => n?.addEventListener("click", setMenuActive));

    // menu selectors
    const menuCards = document
      ?.querySelector(".dishContainer")
      ?.querySelectorAll(".rowMenuCard");

    function setMenuItemActive() {
      menuCards?.forEach((n) => n?.classList?.remove("active"));
      this?.classList?.add("active");
    }

    menuCards?.forEach((n) => n?.addEventListener("click", setMenuItemActive));

    //right container
  }, [isMainDish]);

  //serch
  useEffect(() => {
    setIsMainDishSearch(
      Items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  //selected county
  useEffect(() => {
    const cuti = Counties?.find(
      (item) =>
        item?.name?.toString()?.toLowerCase() ===
        counties?.toString()?.toLowerCase()
    );
    setSelectCode(cuti ? cuti?.code : null);
  }, [counties]);

  //sub-County
  useEffect(() => {
    const cuti = selectCode?.toString().toLowerCase();
    const gb = subCounties.filter(
      (item) => item.code.toString().toLowerCase() === cuti
    );
    setSSbCounty(gb ? gb : subCounties);
  }, [selectCode]);

  const setFilterData = (itemid, e) => {
    e.preventDefault();
    const poppo = Items.filter(
      (item) => item.itemId === itemid && item.qty != 0
    );
    if (poppo.length != 0) {
      setIsMainDish(poppo);
    } else {
      setIsMainDish([]);
    }
  };

  function handleDelivery(event) {
    event.preventDefault();
    if (event.target.value.toLowerCase() === "kiambu") {
      setDeliveryFee("200");
      setCounties(event.target.value);
    } else if (event.target.value.toLowerCase() === "nairobi") {
      setDeliveryFee("300");
      setCounties(event.target.value);
    } else if (event.target.value.toLowerCase() === "pick from shop") {
      setDeliveryFee("0");
      setCounties(event.target.value);
    } else {
      setDeliveryFee("350");
      setCounties(event.target.value);
    }
  }
  const orderSuccess = () =>
    toast.success(
      `Thanks for your oder ${user.userName}! Your order will be delivered in the next 24hrs. Enjoy its natural taste.`
    );

  const transactionProcessed = () =>
    toast.success(`Please wait as we process your payment.`);

  const transactionProcessedSuccess = () =>
    toast.success(`payment processed successfuly .`);

  const payMentError = () => toast.error("Payment process error");
  const orderError = () => toast.error("Error during checkout");
  const emptyFiled = () => toast.error("All checkout fields are required");

  const checkOut = async (e) => {
    e.preventDefault();
    if (
      subCountiese.trim().length === 0 ||
      location.trim().length === 0 ||
      phone.trim().length === 0 ||
      mpesa.trim().length === 0
    ) {
      emptyFiled();
    } else {
      if (user === null || user.length == 0) {
        localStorage.setItem("county", counties);
        dispatch({
          type: actionType.SET_COUNTY,
          county: counties,
        });
        localStorage.setItem("subCounty", subCountiese);
        dispatch({
          type: actionType.SET_SUBCOUNTY,
          subCounty: subCountiese,
        });
        localStorage.setItem("location", location);
        dispatch({
          type: actionType.SET_LOCATION,
          locationn: location,
        });
        localStorage.setItem("phone", phone);
        dispatch({
          type: actionType.SET_PHONE,
          phonee: phone,
        });

        localStorage.setItem("fee", deliveryFee);
        dispatch({
          type: actionType.SET_DELIVERY,
          deliveryfee: deliveryFee,
        });

        navigate("/login");
      } else {
        const amount = parseInt(total);
        let addrss = `${counties}/${subCountiese}/${location}`;
        let userData = {
          userName: user.userName,
          userEmail: user.userEmail,
          phone: phone,
          address: addrss,
          cart: cart,
          total: amount,
          delivery: parseInt(deliveryFee),
          profile: user.profile,
          payment: mpesa,
          OrderFor:
            recepientName.toString().trim().length === 0
              ? "none"
              : recepientName,
        };
        setCheckDisble(true);

        if (mpesa.toString().toLowerCase() === "mpesa") {
          transactionProcessed();
          await axios
            .post(`${process.env.REACT_APP_Server_Url}mpesa/`, userData)
            .then((crt) => {
              if (crt?.data === 0) {
                orderSuccess();
                localStorage.setItem("county", "");
                dispatch({
                  type: actionType.SET_COUNTY,
                  county: "",
                });
                localStorage.setItem("subCounty", "");
                dispatch({
                  type: actionType.SET_SUBCOUNTY,
                  subCounty: "",
                });
                localStorage.setItem("location", "");
                dispatch({
                  type: actionType.SET_LOCATION,
                  locationn: "",
                });
                localStorage.setItem("phone", "");
                dispatch({
                  type: actionType.SET_PHONE,
                  phonee: "",
                });

                localStorage.setItem("fee", "");
                dispatch({
                  type: actionType.SET_DELIVERY,
                  deliveryfee: "",
                });

                localStorage.setItem("cart", null);
                dispatch({
                  type: actionType.SET_CART,
                  cart: null,
                });

                setDeliveryFee("");
                setCounties("");
                setLocation("");
                setSubCountiese("");
                setPhone("");

                setToggleCartMenu(!toggleCartMenu);
                carrt.splice(0, carrt.length);
                transactionProcessedSuccess();
              } else {
                setCheckDisble(false);
                payMentError();
              }
            })
            .catch((error) => {
              setCheckDisble(false);
              orderError();
            });
        } else {
          await axios
            .post(`/api/order/`, userData)
            .then((crt) => {
              orderSuccess();
              localStorage.setItem("county", "");
              dispatch({
                type: actionType.SET_COUNTY,
                county: "",
              });
              localStorage.setItem("subCounty", "");
              dispatch({
                type: actionType.SET_SUBCOUNTY,
                subCounty: "",
              });
              localStorage.setItem("location", "");
              dispatch({
                type: actionType.SET_LOCATION,
                locationn: "",
              });
              localStorage.setItem("phone", "");
              dispatch({
                type: actionType.SET_PHONE,
                phonee: "",
              });

              localStorage.setItem("fee", "");
              dispatch({
                type: actionType.SET_DELIVERY,
                deliveryfee: "",
              });

              localStorage.setItem("cart", null);
              dispatch({
                type: actionType.SET_CART,
                cart: null,
              });

              setDeliveryFee("");
              setCounties("");
              setLocation("");
              setSubCountiese("");
              setPhone("");

              setToggleCartMenu(!toggleCartMenu);
              carrt.splice(0, carrt.length);
            })
            .catch((error) => {
              setCheckDisble(false);
              orderError();
            });
        }
      }
    }
  };

  const handleSubCounty = (event) => {
    event.preventDefault();
    if (event.target.value.toLowerCase() === "kabete") {
      setDeliveryFee("100");
      setSubCountiese(event.target.value);
    } else {
      setSubCountiese(event.target.value);
    }
  };

  if (
    Items.length === 0 ||
    menuItems?.length === 0 ||
    isItemActive?.trim().length === 0
  ) {
    return (
      <>
        <main id="main" className="do">
          <section id="breadcrumbs" className="breadcrumbs">
            <div className="container gifs" data-aos="fade-up">
              <Image src={spinner} alt="Your GIF" className="gifs" />
            </div>
          </section>
        </main>
      </>
    );
  }

  return (
    <div className=" w-full paddings mt-16">
      <div className="lefttttt">
        <div className="menuCard chang">
          <SubMenuContainer name={"Wellness Products"} />
        </div>
        <RowContainer menuItems={menuItems} setFilterData={setFilterData} />
        <DishItemContainer
          search={search}
          isMainDishSearch={isMainDishSearch}
          isMainDish={isMainDish}
          Items={Items}
          isItemActive={isItemActive}
        />
      </div>
      <RightContainer
        handleDelivery={handleDelivery}
        counties={counties}
        Counties={Counties}
        handleSubCounty={handleSubCounty}
        subCountiese={subCountiese}
        sSbCounty={sSbCounty}
        setLocation={setLocation}
        location={location}
        cart={cart}
        total={total}
        deliveryFee={deliveryFee}
        setMpesa={setMpesa}
        setRecepientTrue={setRecepientTrue}
        recepientTrue={recepientTrue}
        setRecepientName={setRecepientName}
        recepientName={recepientName}
        setPhone={setPhone}
        phone={phone}
        checkOut={checkOut}
        checkDisable={checkDisable}
        subCounties={subCounties}
      />
    </div>
  );
}

export default WellnesProducts;
