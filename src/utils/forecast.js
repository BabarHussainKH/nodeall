const request = require("request");

const forecast = (lat, long, callback) => {
    request({
        url: "https://api.darksky.net/forecast/2e2c5d75d96f8790fb9e9206cb18dc9f/" + lat + "," + long,
        json: true
    }, function (error, response, body) {
        if (!error) {
            let data = response.body["currently"]["icon"] + ". It is currently " + response.body["currently"]["temperature"] + "% degree out there," + response.body["currently"]["precipProbability"] + "% of rain"
            callback(undefined, data)
        } else {
            callback("Unable to find weather updates for this location");
        }
    })
}

module.exports = forecast;