let axios = require('axios')


const ipmaGlobal  ={
    forecast_uri: "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/",
    local_ids : {
        aveiro: 1010500,
        coimbra: 1060300,
        porto: 1131200,
        lisboa: 1110600
    }
}


const methods = {
    /**
     * Get Forecast by city input
     */
    getForecast: async ( city ) => {
        return await axios.get(ipmaGlobal.forecast_uri+ipmaGlobal.local_ids[city]+".json");
    }
    
}

module.exports = methods
