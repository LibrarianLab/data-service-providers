const axios = require('axios')
const {ipma} = require("./ipma")


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
const newWeatherPromise = (url) => {
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
        return newWeatherPromise( newUrl( ipma.forecast.forecast_uri, city ) );
    },

    /**
     * Get all country districts forecast for a specific day
     * 
     * @param day
     * @author Alexandre Reis
     */
    getForecastByDay: ( day ) => {
        return newWeatherPromise( newUrl( ipma.forecast.forecast_uri, ipma.forecast.daily_endpoint, day ) );
    }, 

    /**
    * Get all country districts ocenography for a specific day
    *
    * @param day
    * @author Alexandre Reis
    */
    getSeaStateByDay: (day) => {
        return newWeatherPromise( newUrl( ipma.oceanography.oceanography_uri, ipma.oceanography.daily_endpoint, day ) ) 
    }       
    
}


module.exports.methods = methods
module.exports.cities = ipma.local_ids;
module.exports.days = ipma.day_ids;


module.exports.methods.getSeaStateByDay(module.exports.days.today).then( r => {
    console.log(r);
})