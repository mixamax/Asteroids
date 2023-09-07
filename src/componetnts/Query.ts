const API_KEY = process.env.REACT_APP_API_KEY;
let date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, "0");
let day = String(date.getDate()).padStart(2, "0");

let tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
let tomorrowDay = String(tomorrow.getDate()).padStart(2, "0");
let tomorrowYear = tomorrow.getFullYear();
let tomorrowMonth = String(tomorrow.getMonth() + 1).padStart(2, "0");

export let query = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${year}-${month}-${day}&end_date=${tomorrowYear}-${tomorrowMonth}-${tomorrowDay}&api_key=${API_KEY}`;
