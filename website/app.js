/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?id=";
const apiKey = "&appid=ca5341b8f50e02563b167bf3b06bdd67&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getData(baseURL, zipCode, apiKey)
    .then(function (data) {
      if (data && data.main && data.main.temp) {
        postData("/add", {
          temperature: data.main.temp,
          date: newDate,
          userResponse: feelings,
        });
      } else {
        console.error("Temperature data is missing in the API response");
      }
    })
    .then(() => updateUI());
}

const getData = async (baseURL, id, key) => {
  const res = await fetch(baseURL + id + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log({ error });
  }
};

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log({ error });
  }
};

const updateUI = async () => {
  const request = await fetch("/show");
  try {
    const data = await request.json();
    const { date, temperature, userResponse } = data;
    document.getElementById("date").innerHTML = date;
    document.getElementById("temp").innerHTML = temperature;
    document.getElementById("content").innerHTML = userResponse;
  } catch (error) {
    console.log({ error });
  }
};
