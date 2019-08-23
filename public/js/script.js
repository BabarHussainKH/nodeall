// const ff = document.getElementById("test");
// console.log(ff);

const jsdom = require("jsdom");
const { JSDOM } = jsdom;
console.log(dom.window.document.querySelector("h1").textContent); // "Hello world"

const dom = new JSDOM(document);

const search = document.querySelector('h1');
alert(search);

ff.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;

    fetch("http://localhost:3005/weather?address=" + location).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                console.log(data.Error);
            } else {
                console.log(data)
            }

        })

    })


})