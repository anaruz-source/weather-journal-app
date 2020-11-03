

city.addEventListener('change', (e)=> {

   
    try{
       
        if (!!e.target.value) {

            if (!!filtered[selectedIdx]['primary_city']) {

                zip.value = filtered[selectedIdx]['zip'];

                cc.value = filtered[selectedIdx]['country'].toLowerCase();

                coord.value = `lat=${filtered[selectedIdx]['lat']},lon=${filtered[selectedIdx]['lon']}`;
            }
        }

    }catch(error){


    }

})