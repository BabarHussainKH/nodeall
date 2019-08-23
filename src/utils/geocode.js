const request = require("request");

let geocode = (address, callback) => {
    console.log("address: ", address);


    request({
        url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoiYmFiYXJodXNzYWluNzkiLCJhIjoiY2p5bGFmaWp0MDV0cTNvbzV4eW1uMGVxZiJ9.LKBNtT_DUjSQJasp4IAASQ",
        json: true
    }, function (error, response, body) {
       try {
           if (error) {
               console.error("if");
               callback("Unable to find location");

           } else {

               let lat = response["body"]["features"][0]["center"][1];
               let long = response["body"]["features"][0]["center"][0];
               let location = response["body"]["features"][0]["place_name"];
               callback(undefined, {
                   lat: lat,
                   long: long,
                   location: location
               });
               console.error("else");

           }
       }catch (e) {
           console.error("catch");

           callback("Unable to find location" );

       }
    })
}

module.exports = geocode;