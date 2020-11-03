// The logic of this autocompleter is inspired by:

// https://openclassrooms.com/fr/courses/1916641-dynamisez-vos-sites-web-avec-javascript/2725496-tp-un-systeme-dauto-completion


let cities = null,

    selectedIdx = -1;

const localJson = 'https://weather-app-journal.herokuapp.com/cities.json',

    city = document.getElementById('city'),

    sugg = document.getElementsByClassName('suggestions')[0],

    found = [],

    filtered = [],

    LIMIT_FILTERED = 10,


    useLocalData = async () => {
        try {

            cities = await performFetch(localJson)

        } catch (error) {

            console.log('error fetching cities.json locally occured (Make sure you start node server) ', error);
        }

    },

    insertInsideSpan = (e) => {

        if (!e || !e.target.value) return; // !!(null|undefined|'') => true

        const tar = e.target;

        tar.value = found[selectedIdx].textContent;

    },

    insertValue = (event) => {

        city.value = (event.target || event).textContent; // this allows  passing to function an event or a tag!

        sugg.innerHTML = '';

        city.blur();
    },

    highlight = (e) => {

        if (e === undefined) return;

        (e.target || e).className = 'highlighted'; // used as event listener and to add className for tags

        if (e.target) selectedIdx = found.indexOf(e.target); // assign index of hovered div to selectedIdx
    },


    rmHighlight = (e) => {

        if (e === undefined) return;

        (e.target || e).className = ''; // used as event listener and to remove className for tags


    };

useLocalData();


city.addEventListener('keyup', e => {

    // event.keyCode deprecated and removed from web standards
    //however some browsers still use keyCode =>
    //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode

    const val = e.target.value,
        keycode = e.keyCode !== undefined ? e.keyCode : e.key;

    if (cities === null) {

        e.target.style.border = '1px solid red';
        e.target.style.background = 'rgba(255, 0, 0, 0.2)';
        e.target.value = 'Data not ready, Node Server is Down';

        return;

    }

    // arrowUp keycode 38

    if (keycode === 38) {

        // we make sure we dont decrement selectedIdx to be - 1, found[-1]???!!!!!!!!

        selectedIdx <= 0 ? (rmHighlight(found[selectedIdx = 0]), highlight(found[selectedIdx = found.length - 1]), insertInsideSpan(e)) :

            (rmHighlight(found[selectedIdx--]), highlight(found[selectedIdx]), insertInsideSpan(e)); // use of ternary expression and "," operator( evaluated from left to right, extreme right value returned)

        return;

        // arrowDown keycode 40

    } else if (keycode === 40) {

        //we must stay within array indices


        selectedIdx < found.length - 1 ? (rmHighlight(found[selectedIdx++]), highlight(found[selectedIdx]), insertInsideSpan(e)) :

            (rmHighlight(found[selectedIdx = found.length - 1]), highlight(found[selectedIdx = 0]), insertInsideSpan(e));

        return;


    } else if (keycode === 13 || keycode === 32) { // Enter 13 or SpaceBar 32


        insertValue(found[selectedIdx]);

        return;


    }


    sugg.innerHTML = ''; // for a new search, remove already existing div elements

    filtered.length = 0; // empty filtered array for new search

    found.length = 0; // empty array for new div elements (found cities)


    cities.forEach(item => {


        if (filtered.length >= LIMIT_FILTERED) return; //Only keep limited number of cities

        if (!!val && item.primary_city && item.primary_city.slice(0, val.length).trim().toLowerCase() === val.trim().toLowerCase()) { // select only elements that starts with searched chars, Skip the first {cod: '200", message:''} added in json file;

            filtered.push(item);
        }


    });


    if (!filtered.length) return; // !0 = true

    filtered.forEach((item, idx) => {

        const div = document.createElement('div');

        div.textContent = item.primary_city;

        div.addEventListener('click', insertValue);

        div.addEventListener('mouseover', highlight);

        div.addEventListener('mouseout', rmHighlight);

        sugg.appendChild(div);

        found[idx] = div;
    });


    selectedIdx = 0; // initiliaze with 0 to highight the first element

    highlight(found[selectedIdx]);

});