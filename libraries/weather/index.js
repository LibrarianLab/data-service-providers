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
    getForecast: ( city ) => {
        return new Promise((resolve,reject) => {

            var url_request = ipmaGlobal.forecast_uri + city;

            axios.get(url_request)
            .then( response => {
                if(response.status == 200)
                    resolve(response.data)
                else
                    reject(null)
            }).catch( (err) => {
                reject(err)
            })
            
        });
    }
    
}



module.exports.methods = methods
module.exports.cities = ipmaGlobal.local_ids;
module.exports.configuration = ipmaGlobal;


// this.methods.getForecast(this.cities.aveiro).then(r => {
//     console.log(r);
// })
