# Weather-Journal App Project
[![version](https://img.shields.io/badge/version-v1.1.0-brightgreen)]() 
[![node 12.19.0](https://img.shields.io/badge/dependencies-node.v12.19.0-blue)](https://nodejs.org/en/docs/) 
[![Express 4.17.1](https://img.shields.io/badge/dependencies-express.v4.17.1-blue)](https://registry.npmjs.org/express/-/express-4.17.1.tgz) 
[![bodyparser 1.19.0](https://img.shields.io/badge/dependencies-bodyparser.v1.19.0-blue)]("https://registry.npmjs.org/express/-/express-4.17.1.tgz) 
[![cors 2.8.5](https://img.shields.io/badge/dependencies-cors.v2.8.5-blue)](https://registry.npmjs.org/cors/-/cors-2.8.5.tgz) 
[![license](https://img.shields.io/badge/licence-MIT-brightgreen)](https://opensource.org/licenses/MIT) 
## Overview
This project requires you to create an asynchronous web app that uses Web API and user data to dynamically update the UI. 

This project uses:
- nodejs
- express
- bodyparser
- cors
## deployment

deployed to heroku free online hosting
- view here [free online hosting at heroku](https://weather-app-journal.herokuapp.com/ "weather app journal link")
- make sure to allow http on your browser
 [browsers mixed content](https://docs.adobe.com/content/help/en/target/using/experiences/vec/troubleshoot-composer/mixed-content.html)

## Instructions
This will require modifying the `server.js` file and the `website/app.js` file. You can see `index.html` for element references, and once you are finished with the project steps, you can use `style.css` to style your application to customized perfection.
## usage

With autocompleter you can alleviate  burden of seeking zip code:
- Type initials of a city name, list of 10 elements ,if any, will apear
- Navigate through using mouse or arrows(up/down)
- Select using mouse/enter/space bar
- Zip code will show in it place
- Click generate button

### step 1
-- Type initial zip code in the zip field, or city name, in the first text field,  if you don't know the zip code of a city. Known to yield results from openweatherapp.org: Cisco, Holtsville, Citra, Chicopee, New york

![autocompletion](https://github.com/anaruz-source/weather-journal-app/blob/master/readmeassets/auto.png?raw=true)
### step 2
-- entry for today

![one day entry](https://github.com/anaruz-source/weather-journal-app/blob/master/readmeassets/entry.png?raw=true)
### step 3
-- next days entries

![next comming days entries](https://github.com/anaruz-source/weather-journal-app/blob/master/readmeassets/entries.png?raw=true)

Switch between Temperature units (Kelvin, Celsius, Fahrenheit) by clicking on required unit, chart will follow!

## Extras
If you are interested in testing your code as you go, you can use `tests.js` as a template for writing and running some basic tests for your code.

## references

1. [Udacity frontend nanodegree program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd0011)

2. [github readme markdown](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

3. [display OWM icon](https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon)

4. [codepen stacked chart with chart.js](https://codepen.io/natenorberg/pen/WwqRar)

5. [chart.js website](https://www.chartjs.org/docs/latest/)

6. [JQuery 3.5.1](https://code.jquery.com/jquery-3.5.1.js)

7. [autocompleter from opeclassrooms]( https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/2725496-tp-un-systeme-dauto-completion)

9. [event keyCode deprecated and workaround](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)

10. [bootstrap container and media queries](https://getbootstrap.com/docs/4.4/layout/overview/)

11. [zip codes database](https://www.unitedstateszipcodes.org/zip-code-database/)

12. [deployment with express](https://stackoverflow.com/questions/36112119/heroku-deployment-with-express-js-is-not-happening)