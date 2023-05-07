const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const data = require('./public/data');
const fetch = require('node-fetch');
const portNumber = 3000;
const {North_Diner, South_Diner, Yahentamitsi} = require("./public/data");
let total_bmr;
// require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
app.set('views', './pages');
app.set('view engine', 'ejs');
app.use(express.static("public"));
process.stdin.setEncoding("utf8");
require("dotenv").config({ path: path.resolve(__dirname, 'credentials/.env')})

const apiKey = process.env.API_KEY;

if (process.argv.length !== 2) {
    console.log('Application failed to start.');
    process.exit(1);
} else{
    console.log(`Web server started and running at http://localhost:${portNumber}`);
}

process.stdout.write('Stop to shutdown the server: ');
process.stdin.once('data', (input) => {
    input = input.trim();
    if (input === 'stop') {
      console.log('Shutting down the server');
      process.exit(0);
    }
});

app.get("/", (request, response) => {
    response.render("index.ejs");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.post("/", (request, response) => {
    let total_bmr = 0.0;
    let hold_height;
    let temp_height; 
    let name = request.body.name;
    let age = parseFloat(request.body.age);
    let unit = request.body.unit;
    let height = request.body.height;
    let weight = parseFloat(request.body.weight);
    let location = request.body.location;
    let dietaryRestrictions = request.body.dietaryRestrictions;
    let active = parseFloat(request.body.active);
    let goal = request.body.goal;
    let meals = [];

    if(unit == "kg"){
        hold_height = parseFloat(height[0]);
    } else {
        temp_height = height[1].split(" ");
        hold_height = (parseFloat(temp_height[0])* 30.48) + (parseFloat(temp_height[1]) * 2.54);
    }
    total_bmr = (10 * weight) + hold_height - (5 * age) + 5;
    total_bmr = total_bmr * active;
    if (goal === "Cut Weight") {
    total_bmr -= 500;
    } else if (goal === "Bulk Weight") {
    total_bmr += 500;
    }
    //console.log(total_bmr);
    //console.log(Yahentamitsi);
    //console.log(North_Diner);
    //console.log(South_Diner);
    let loc;
    if(location == "Y Diner"){
        loc = Yahentamitsi;
    } else if (location == "South Diner"){
        loc = South_Diner;
    } else if (location == "North Diner"){
        loc = North_Diner;
    }

    let ht1 = loc.breakfast.slice();
    let ht2 = loc.lunch.slice();
    let ht3 = loc.dinner.slice();


    let holder1 = [];
    let holder2 = [];
    let holder3 = [];

    //console.log(ht1[0].dietary);

    if(dietaryRestrictions != "None"){
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.includes(dietaryRestrictions) == false){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.includes(dietaryRestrictions) == false){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.includes(dietaryRestrictions) == false){
            holder3.push(ht3[j]);
        }
        }
    } else{
        holder1 = loc.breakfast.slice();
        holder2 = loc.lunch.slice();
        holder3 = loc.dinner.slice();
    }


    //console.log(holder1);
    for(let i = 0; i < 3; i++){
        const randomIndex1 = Math.floor(Math.random() * (holder1.length - 1));
        const randomIndex2 = Math.floor(Math.random() * (holder2.length - 1));
        const randomIndex3 = Math.floor(Math.random() * (holder3.length - 1));


        let q1 = holder1[randomIndex1].query;
        let q2 = holder2[randomIndex2].query;
        let q3 = holder3[randomIndex3].query;
        let d1 = holder1[randomIndex1].dietary;
        let d2 = holder2[randomIndex2].dietary;
        let d3 = holder3[randomIndex3].dietary;

        const api_url1 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;
        
        
        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(apiKey)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;


        let br_promise = getData(api_url1).then(function(data){
            const new_br = {
            name: q1,
            time: 'breakfast',
            dietary: d1,
            protein: data.foods[0].foodNutrients[0].value,
            fat: data.foods[0].foodNutrients[1].value,
            carbohydrates: data.foods[0].foodNutrients[2].value,
            calories: data.foods[0].foodNutrients[3].value
            }
            //console.log(data);
            return new_br;
        })

        let lunc_promise = getData(api_url2).then(function(data){
            const new_lunc = {
            name: q2,
            time: 'lunch',
            dietary: d2,
            protein: data.foods[0].foodNutrients[0].value,
            fat: data.foods[0].foodNutrients[1].value,
            carbohydrates: data.foods[0].foodNutrients[2].value,
            calories: data.foods[0].foodNutrients[3].value
            }
            return new_lunc;
        })

        let din_promise = getData(api_url3).then(function(data){
            const new_din = {
            name: q3,
            time: 'dinner',
            dietary: d3,
            protein: data.foods[0].foodNutrients[0].value,
            fat: data.foods[0].foodNutrients[1].value,
            carbohydrates: data.foods[0].foodNutrients[2].value,
            calories: data.foods[0].foodNutrients[3].value
            }
            return new_din;
        })


        meals.push(br_promise);
        meals.push(lunc_promise);
        meals.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
    } 


    Promise.all(meals).then(function(array){
        console.log(array);

        let table = '<table border="1"><thead><tr><th>Food</th><th>Time</th></tr></thead><tbody>';

        array.forEach(
            element => 
            {
                table += '<tr><td>' + element.name + '</td><td>' + element.time + '</td></tr>'; 
            })

        table += '</tbody></table>';

        response.render("result", {result: table}); 
    });



    
});

function getData(key){
    return fetch(key).then(response => response.json());
}


app.listen(portNumber);