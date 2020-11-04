/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = formatDate(d),
    anchors = [],
    spans = [],
    activeCity = [];
// list of anchors contained in the page

const forEach = Array.prototype.forEach,

    keyOWM = 'd0292cfa3ead2c82536eb9d6f253d0d0',

    UrlWeather = 'http://api.openweathermap.org/data/2.5/weather',

    urlOneCall = 'https://api.openweathermap.org/data/2.5/onecall',

    zip = document.getElementById('zip'),

    cc = document.getElementById('cc'),

    coord = document.getElementById('coord'),

    generate = document.getElementById('generate'),

    userResponse = document.getElementById('feelings'),

    error = document.getElementById('error'),

    days = [],


    // helper functions

    simplCelsiusFahrenheitConversion = (val, degree = 'k') => {

        return degree == 'c' ? (val - 273.15).toFixed(0) : // Kelvin to Celsius

            degree == 'f' ? ((val - 273.15) * 9 / 5 + 32).toFixed(0) : val; // Kelvin to Fahrenheit


    },

    toCelsiusOrFahrenheit = (data, degree) => { // Standard to Metric and imperial conversions as OMW uses Kelvin by default


        const formula = degree == 'c' || degree == 'f' ? function (val) {
            return simplCelsiusFahrenheitConversion(val, degree)
        } : function (a) {
            return a
        }; //Kelvin to Fahrenheit

        return data.map(item => {

            return {
                dt: item.dt,
                temp: formula(item.temp),
                clouds: item.clouds,
                dew_point: item.dew_point,
                feels_like: item.feels_like,
                humidity: item.humidity,
                pop: item.pop,
                pressure: item.pressure,
                visibility: item.visibility,
                weather: item.weather,
                wind_deg: item.wind_deg,
                wind_speed: item.wind_speed
            };

        })
    },

    // async help functions to add listener to anchors

    attachEvt = async () => {

        forEach.call(anchors, function (el) {
            el.addEventListener('click', eventListener)
        });

    },

    // hide/show spans containing other temp units (Kelvin, Celsius, Fahrenheit) 

    ShowHideSpan = async className => forEach.call(spans, sp => {

        if (sp.className == 'other') return;

        sp.className == className ? sp.style.display = 'inline' : sp.style.display = 'none'
    });
  
    // activate/Deactivate anchors, get the last char of the href absolute path attr using the trick below a.href.length - 1

    activeDeactLink = async href => forEach.call(anchors, a => a.href[a.href.length - 1] == href ? (a.style.textDecoration = 'none', a.style.color = 'green') : (a.style.textDecoration = 'underline', a.style.color = ''));

/*********************************************************************
 * ***************************************************
 * ********************************************
 * 
 *  Required functions to complete this nanodegree project
 * 
 * *********************************************
 * ********************************************************
 * *********************************************************************/


// function to perform fetch to openWeatherMap (Multipurpose function used to execute any fetch local/remote)


performFetch = async (url, options = {}) => {

    const response = await fetch(url, options);

    try {

        const data = await response.json();


        if ((data.cod && data.cod != '200') || (data[0] && data[0].cod && data[0].cod != '200')) throw new Error(data.message); // fetch doesn't throw in case a city not found! we don't want to fill endpoint with empty data:


        error.style.display = 'none';

        return data;

    } catch (err) {

        //   throw new Error(err.message);

        error.textContent = err.message;
        error.style.display = "block";


    }
},

    getEndpointData = async (url = '') => {

        try {

            const data = await performFetch(url);

            return data;

        } catch (err) {


            error.textContent = err.message;
            error.style.display = "block";


        }
    },

    //post OWM data, user response, date to the server

    postToEndpoint = async (url = '', data = {}) => {


        try {

            const datar = await performFetch(url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });


            return datar;

        } catch (err) {


            error.textContent = err.message;
            error.style.display = "block";
        }
    },


    //Update UI with Async Function

    updateUI = async data => {


        const entryHolder = document.getElementById('entryHolder'),

            canvas = document.getElementById('myChart');

        error.style.display = 'none';

        !isEmptyObj(data) ? (function () {
            const d = document.getElementById('date'), // ternary exp, to prevent updating UI if data undefined

                temp = document.getElementById('temp'),

                content = document.getElementById('content'),

                cityName = document.getElementById('name'),

                icon = document.getElementById('icon'),

                desc = document.getElementById('desc'),

                humidity = document.getElementById('humidity'),
                feels_like = document.getElementById('feels_like'),
                wind_speed = document.getElementById('wind_speed'),
                pressure = document.getElementById('pressure'),
                visibility = document.getElementById('visibility');


            cityName.textContent = data.name;

            d.textContent = data.date;

            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            desc.textContent = data.weather[0].description;

            temp.innerHTML = `<span class="k">${data.main.temp.toFixed(0)}</span> <span class="c">${simplCelsiusFahrenheitConversion(data.main.temp, 'c')}</span> <span class="f">${simplCelsiusFahrenheitConversion(data.main.temp, 'f')}</span>` + '<sup><a href="k">°K</a>|<a href="c">°C</a>|<a href="f">°F</a></sup>';

            feels_like.innerHTML = `<span class="other">Feels like<></span><span class="k"> ${data.main.feels_like.toFixed(0)}</span> <span class="c"> ${simplCelsiusFahrenheitConversion(data.main.feels_like, 'c')}</span> <span class="f"> ${simplCelsiusFahrenheitConversion(data.main.feels_like, 'f')}</span>` + '<sup><a href="k">°K</a>|<a href="c">°C</a>|<a href="f">°F</a></sup>';

            humidity.innerHTML = `<span class="other">Humidity <></span><span class="other"> ${data.main.humidity}%</span>`;
            pressure.innerHTML = `<span class="other">Pressure <></span><span class="other"> ${data.main.pressure}hPa</span>`;
            visibility.innerHTML = `<span class="other">Visibility <>&nbsp;</span><span class="other">  ${data.visibility}m</span>`;
            wind_speed.innerHTML = `<span class="other">Wind Speed <></span><span class="other"> ${(data.wind.speed * 3600 / 1000).toFixed(0)}km/h</span>`;

            content.textContent = 'Feeling ' + data.feeling,

                canva = document.getElementById('myChart');

            performFetch(`${urlOneCall}?lat=${data.latitude}&lon=${data.longitude}&exclude=current,minutely,alerts&appid=${keyOWM}`)

                .then(function (data) {

                    activeCity = data;

                    activeCity.hourlyBackedUp = activeCity.hourly;

                    activeCity.hourly = toCelsiusOrFahrenheit(activeCity.hourly, 'c');

                    activeCity.hourly.degree = 'c';

                    createDailyEntries(data);

                    return data;
                }).then(function (data) {


                    drawChart(data);
                });

            entryHolder.style.display = 'block';
            canvas.style.display = 'block';

        })() : (function () { // hide Chart and EntryHolder if data is undefined

            entryHolder.style.display = 'none';
            canvas.style.display = 'none';


        })();

    }
// eventListener of generate button

generate.addEventListener('click', (e) => {


    const entriesHolder = document.getElementById('entriesHolder');


    try {

        performFetch(`${UrlWeather}?zip=${zip.value},${cc.value}&appid=${keyOWM}`)

            .then(async function (data) {

                return postToEndpoint('/post-project-data', {
                    zip: zip.value,
                    longitude: data.coord.lon,
                    latitude: data.coord.lat,
                    name: data.name,
                    main: data.main,
                    date: newDate,
                    wind: data.wind,
                    visibility: data.visibility,
                    feeling: userResponse.value,
                    weather: data.weather
                })


            }).then(function (data) {

                updateUI(data);
            })

    } catch (err) {


        error.textContent = err.message;
        error.style.display = "block";

    }

});

// add event listener to anchor elements a:

const eventListener = el => {

    el.preventDefault();

    const thref = el.target.href[el.target.href.length - 1];

    activeDeactLink(thref);

    ShowHideSpan(thref);

    activeCity.hourly = activeCity.hourlyBackedUp;


    activeCity.hourly = toCelsiusOrFahrenheit(activeCity.hourly, thref);

    activeCity.hourly.degree = thref;

    drawChart(activeCity);


};


//Function to create dynamique entries for next Comming next days

const createDailyEntries = async data => {

    let i = 1,

        keys = Object.keys(data.daily),

        html = '';

    keys.forEach(key => {

        const dateString = new Date(data.daily[key].dt * 1000).toString(); // Convert date to String

        days.push(/([a-zA-Z]+)/.exec(dateString)[1]); // Extract day name only

    });

    keys.forEach(function (k) {

        while (i < keys.length - 1) {

            //https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon

            html += `  <div class="entries-wrapper">
                            <div>
                            <h3 id="day${i}">${days[i]}</h3>
                            <div id="date${i}">${formatDate(new Date(data.daily[i].dt * 1000))}</div> 
                            <div id="desc${i}">${data.daily[i].weather[0].description}</div>
                            </div>
                            <div>
                            <div><img src="http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png" alt="" id="icon${i}">
                                </div>
                        
                                <div id="temp${i}"><span class="k">${data.daily[i].temp.day.toFixed(0)}</span> <span
                                    class="c">${simplCelsiusFahrenheitConversion(data.daily[i].temp.day, 'c')}</span> <span class="f">${simplCelsiusFahrenheitConversion(data.daily[i].temp.day, 'f')}</span><sup><a href="k">°K</a>|<a href="c">°C</a>|<a href="f">°F</a></sup>
                                </div>
                            </div>
                        </div>`;


            i++;
        }

        entriesHolder.innerHTML = html;

    })

    anchors = document.getElementsByTagName('a');

    spans = document.getElementsByTagName('span');

    attachEvt();

    ShowHideSpan('c');

    activeDeactLink('c');

    return data;
},

    // Draw chart function
    // Stacked line charts with JS => codepen/chartjs

    // https://codepen.io/natenorberg/pen/WwqRar

    //https://www.chartjs.org/docs/latest/

    drawChart = async data => {


        const ctx = document.getElementById("myChart").getContext("2d"),


            refubrishedData = [],

            xLabels = [],

            colors = {
                color: {
                    fill: '#d5e0f7',
                    stroke: '#3b4a6b',
                },

            };

        let i = 0;
        forEach.call(data.hourly, item => {

            refubrishedData.push(item.temp);
            xLabels.push(new Date(item.dt * 1000).getHours() + ':00:00');
        });


        const slicedData = refubrishedData.slice(0, 24);

        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: xLabels.slice(0, 24), //Only 24hours
                datasets: [{
                    label: 'temperature °' + data.hourly.degree.toUpperCase() +'| 24 hours',
                    fill: true,
                    backgroundColor: colors.color.fill,
                    pointBackgroundColor: colors.color.stroke,
                    borderColor: colors.color.stroke,
                    pointHighlightStroke: colors.color.stroke,
                    borderCapStyle: 'butt',
                    data: slicedData //Only 24 hours

                }]
            },
            options: {
                responsive: false,
                // Can't just `stacked: true` like the docs say
                scales: {
                    yAxes: [{
                        stacked: true,

                        ticks: {
                            beginAtZero: false,
                            steps: 10,
                            stepValue: 5,
                            suggestedMax: Math.max(...slicedData) * 1.2
                        },


                    }]
                },
                animation: {
                    duration: 750,
                },
            }
        });
        // added because height and width of chart increase strangely!

        const canvas = document.getElementById('myChart');
        canvas.setAttribute('height', '400');
        canvas.setAttribute('width', '400');
    };

// more help functions

function formatDate(d) {
    return (1 + d.getMonth()) + '.' + d.getDate() + '.' + d.getFullYear()
};

// JQuery3.5.1 IsEmptyObject
// https://code.jquery.com/jquery-3.5.1.js

function isEmptyObj(obj) {


    for (let prop in obj) {


        return false;
    }

    return true
}


//execute get on load: if endpoint contains data!

(function () {

    getEndpointData('/all')

        .then(function (data) {

            updateUI(data);
        });

})();