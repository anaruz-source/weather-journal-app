/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const key = 'd0292cfa3ead2c82536eb9d6f253d0d0';

    let url = 'api.openweathermap.org/data/2.5/weather?zip = 00544& appid='+key;

//api.openweathermap.org / data / 2.5 / weather ? zip = { zip code }, { country code } & appid={ API key }

