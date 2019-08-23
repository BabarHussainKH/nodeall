// const square = (n, callback) => {
//
//     if (n < 0 || n == 0) {
//         callback("Number must be greater than 0");
//     } else {
//         callback(undefined, n * n);
//
//     }
// }
// //
// // square(91, function (error, result) {
// //     if (!error) {
// //         //console.log(result);
// //     } else {
// //         //console.log(error);
// //     }
// // });
//
// function t() {
//     square(91, function (error, result) {
//         if (!error) {
//             //console.log(result);
//         } else {
//             //console.log(error);
//         }
//     });
// }
//
// function square1(n) {
//     if (n < 0 || n == 0) {
//         //console.log("Number must be greater than 0");
//     } else {
//         //console.log(n * n);
//
//     }
// }
//
// function test(){
//     //console.log("working");
// }
// setTimeout(t,2000);
//
// (() => {
//     //console.log("Hello");
// })()
//
// const event = {
//     "name": "SEO conference",
//     "oraganizers": ["Ali", "Sara", "Ahmed", "Hamza"],
//     print(){
//         this.oraganizers.map(o => //console.log(o))
//         //console.log("");
//         this.oraganizers.forEach((n)=>//console.log(n))
//     }
// }
//
// event.print();


// const tasks = {
//     tasklist: [
//         {
//             name: "software deliver 1" ,
//             status: false
//         }, {
//             name: "software deliver 2",
//             status: true
//         },{
//             name: "software deliver 3",
//             status:true
//         },{
//             name: "software deliver 4",
//             status:false
//         }
//     ]
// }
//
// const todo = tasks.tasklist.filter(n=>n.status?);
// //console.log(todo);

// const emp = require("./info");
//
//
// emp.detaill(79,324,35,345435,3454,55,5,34354,53,453)

//
// //console.log("Before");
// setTimeout(()=>{
//     //console.log("Running...");
// }, 2000);
//
// //console.log("after");

const http = require("http");
const request = require("request");
const express = require("express");
const path = require("path");
const hbs = require("hbs");

const port  = process.env.PORT ||3001

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const bodyParser = require('body-parser');

const app = new express();
const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '/../templates/views');
const partialsDir = path.join(__dirname, '/../templates/partials');

app.set("view engine", "hbs");
app.use(express.static(publicDir))
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded());

app.use(bodyParser.json())

app.listen(port, () => {
    console.log("server is up at port:", port);

});


hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 !== v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

app.get(['/', '/index', '/home'], function (req, res) {
    res.render("index", {
        title: 'Home Page',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem."
    })
});

app.post('/weather', function (req, res) {

    let address = req.body.search;
    if (!address) {
        //console.log(address);
        return res.render('index', {
            "status": "Unsuccessful",
            "Query": address,
            "Message": "Please provide address to find out weather "

        });
    }


    geocode(address, (error, {lat, long, location} = {}) => {
        //console.log(lat);
        //console.log(long);
        //console.log(location);
        if (error) {
            //console.log(lat);
            //console.log(long);
            //console.log(location);
            return res.render('index', {
                status: "false",
                Error: error
            });
        }

        forecast(lat, long, (error, data) => {
            if (error) {
                return res.render('index', {
                    status: "false",
                    Error: error
                });
            }

            //console.log(location);
            return res.render('index', {
                forecast: data,
                location:location,
                address:address
            })

        })

    });



});


app.get("/help", function (req, res) {
    res.render("help", {
        title: 'Help Page',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem."
    })
});

app.get("/about", function (req, res) {
    res.render("about", {
        title: 'About Page',
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, asperiores culpa debitis deserunt provident quos\n" +
            "    sint suscipit tempora? Animi ducimus eaque eum ipsa iusto maxime modi molestiae nam quaerat, rem."
    })
});


app.get("*", function (req, res) {
    res.render('error', {
        errorMessage: "Sorry! The page you are looking for is not found"
    })
});

// app.get("*", (req, res) => {
//     //console.log(location);
//     search(req, res, location)
////     let location = req.url.substring(1)
// });
// app.get("/", function (req, res) {
//
//     search(req, res)
// })
//
// function search(req, res,location) {
//     request({
//         url: "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location + ".json?access_token=pk.eyJ1IjoiYmFiYXJodXNzYWluNzkiLCJhIjoiY2p5bGFmaWp0MDV0cTNvbzV4eW1uMGVxZiJ9.LKBNtT_DUjSQJasp4IAASQ",
//         json: true
//     }, function (error, response, body) {
//         if (!error) {
//
//             let lat = response["body"]["features"][0]["center"][1];
//             let long = response["body"]["features"][0]["center"][0];
//
//             request({
//                 url: "https://api.darksky.net/forecast/2e2c5d75d96f8790fb9e9206cb18dc9f/" + lat + "," + long,
//                 json: true
//             }, function (error, response, body) {
//                 if (!error) {
//
//                     //console.log(response.body);
//                     res.send(response.body)
//
//                 } else {
//                     //console.log(error);
//                 }
//             })
//         } else {
//             //console.log(error);
//         }
//     })
// }


// app.get("*", (req, res) => {
//     let address = req.url.substring(1);
//     geocode(address, function (error, data) {
//         if (!error) {
//             forecast(data.lat, data.long, function (error, forecastData) {
//                     if (!error) {
//                         res.send({
//                             Location: data.location,
//                             forecastData: forecastData
//                         });
//                     } else {
//                         res.send(error)
//                     }
//                 }
//             );
//         } else {
//             res.send(error)
//         }
//
//     })
// });




























