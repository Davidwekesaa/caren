const axios = require("axios");

const access_mpesa_token = async (req, res, next) => {
  let url =
  process.env.generate_access_token_url;
  let auth = new Buffer.from(
    process.env.ConsumerKey + ":" + process.env.ConsumerSecret
  ).toString("base64");

  await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then((response) => {
      console.log("...........Access token .........")
      console.log(response.data)
      console.log("...........Access token .........")
      req.mpesa_access_token = response.data.access_token;
      // res.status(200).json(response.data)
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

//register ulr
const registerUrl = async (req, res, next) => {
  let url = process.env.register_urls_url;
    // console.log("......before-access-token...")
    // console.log(req.mpesa_access_token)
  let auth = `Bearer ${req.mpesa_access_token}`

  dataAuh ={
    ShortCode :  process.env.short_code,
    ResponseType:"Completed",
    ConfirmationURL:"https://sea-turtle-app-hk8mj.ondigitalocean.app/api/callback",
    ValidationURL:"https://sea-turtle-app-hk8mj.ondigitalocean.app/api/validation"
  }

  await axios({
    method: "POST",
    url: url,
    headers: {
      Authorization: auth,
    },
   data: dataAuh
  })
    .then((response) => {
      // console.log(".........register url ..........")
      // console.log(response.request)
      // console.log(".........register url end ..........")
    //  res.status(200).json(response.data)
      next();
    })
    .catch((error) => {
      console.log(error);
    });
};

//timestamp

const timeStamp = ()=>{
  let datenow = new Date();
  const year = datenow.getFullYear();
  const month = ("0" + (datenow.getMonth() + 1)).slice(-2);
  const date = ("0" + datenow.getDate()).slice(-2);
  const hours = ("0" + datenow.getHours()).slice(-2);
  const minutes = ("0" + datenow.getMinutes()).slice(-2);
  const seconds = ("0" + datenow.getSeconds()).slice(-2);
   const formattedDate = year + month + date + hours + minutes + seconds;
   return formattedDate;
}
exports.access_mpesa_token = access_mpesa_token;
exports.timeStamp = timeStamp;
exports.registerUrl = registerUrl;
