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
