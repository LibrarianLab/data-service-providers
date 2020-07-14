module.exports.ipma = {
    forecast: {
        forecast_uri: "https://api.ipma.pt/open-data/forecast/meteorology/cities/daily/",
        daily_endpoint: "hp-daily-forecast-day",
    },
    oceanography: {
        oceanography_uri: "https://api.ipma.pt/open-data/forecast/oceanography/daily/",
        daily_endpoint: "hp-daily-sea-forecast-day",
    },
    fire: {
        fire_uri: "https://api.ipma.pt/open-data/forecast/meteorology/rcm/",
        daily_endpoint: "rcm-d",
        danger_ids: {
            low: 1,
            moderate: 2,
            high: 3,
            very_high: 4,
            max: 5
        }
    },
    local_ids: {
        aveiro: 1010500,
        coimbra: 1060300,
        porto: 1131200,
        lisboa: 1110600
    },
    day_ids: {
        today: 0,
        tomorrow: 1,
        after_tomorrow: 2
    }
}
