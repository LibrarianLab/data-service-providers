let axios = require('axios')


const ipmaGlobal  ={
    forecast_uri: "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/",
    day_endpoint: "hp-daily-forecast-day",
    local_ids : {
        aveiro: 1010500,
        coimbra: 1060300,
        porto: 1131200,
        lisboa: 1110600
    },
    day_ids : {
        today : 0,
        tomorrow : 1,
        after_tomorrow : 2
    }
}

/**
 * Url builder based on specific arguments 
 * 
 * @paras arguments
 * @author Alexandre Reis
 */
const newUrl = (...arguments) => {
    let url = "";
    arguments.forEach(element => {
        url += element;
    });
    return url;
};

/**
 * Method that returns a new promise for a specific url passed
 * 
 * @param url
 * @author Alexandre Reis
 */
const newForecastPromise = (url) => {
    return new Promise((resolve, reject) => {

        axios.get(url)
            .then(response => {
                if (response.status == 200)
                    resolve(response.data)
                else
                    reject(null)
            }).catch((err) => {
                reject(err)
            })

    });
};




const methods = {

    /**
     * Get five day Forecast by city input
     * 
     * @param city
     * @author Alexandre Reis
     */
    getFiveDayForecastByCity: ( city ) => {
        return newForecastPromise( newUrl( ipmaGlobal.forecast_uri, city ) );
    },

    /**
     * Get all country districts forecast for a specific day
     * 
     * @param day
     * @author
     */
    getForecastByDay: ( day ) => {
        return newForecastPromise( newUrl(ipmaGlobal.forecast_uri, ipmaGlobal.day_endpoint, day) );
    }
    
}


module.exports.methods = methods
module.exports.cities = ipmaGlobal.local_ids;
module.exports.days = ipmaGlobal.day_ids;
module.exports.configuration = ipmaGlobal;
