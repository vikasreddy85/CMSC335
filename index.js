const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const data = require('./public/data');
const portNumber = 3000;
const key = 'MPGogOa9dZbgva6VN9LCcgdovtIMdFIDk6Uv4hlO';
const {North_Diner, South_Diner, Yahentamitsi} = require("./public/data")
let total_bmr;
// require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
app.set('views', './pages');
app.set('view engine', 'ejs');
app.use(express.static("public"));
process.stdin.setEncoding("utf8");

if (process.argv.length !== 2) {
    console.log('Application failed to start.');
    process.exit(1);
} else{
    console.log(`Web server started and running at https://localhost:${portNumber}`);
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
    let body = request.body;
    let result = handleFormSubmit(body);
    response.render("result", {result}); 
});

function handleFormSubmit(formData) {
    let name = formData.name;
    let age = parseFloat(formData.age);
    let unit = formData.unit;
    let heightFt = parseFloat(formData.heightFt);
    let heightIn = parseFloat(formData.heightIn);
    let height;
    let weight = formData.weight;
    let location = formData.location;
    let dietaryRestrictions = formData.dietaryRestrictions;
    let active = parseFloat(formData.active);
    let goal = formData.goal;
    let br = [];
    let lunc = [];
    let din = [];
    if(unit == "kg"){
    height = heightFt;
    } else{
    height = (heightFt*30.48) + (heightIn*2.54);
    }

    console.log(formData);
    total_bmr = (10 * weight) + height - (5 * age) + 5;
    total_bmr = total_bmr * active;
    if (goal === "Cut Weight") {
    total_bmr -= 500;
    } else if (goal === "Bulk Weight") {
    total_bmr += 500;
    }
    console.log(Yahentamitsi);
    console.log(North_Diner);
    console.log(South_Diner);
    console.log(total_bmr);

    /*
    const api_url = 
    `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(params.api_key)}&query=${encodeURIComponent(params.query)}&dataType=${encodeURIComponent(params.dataType)}&pagesize=${encodeURIComponent(params.pagesize)}`
    */

    if(location == "Y Diner"){
    if(dietaryRestrictions == "none"){
        let holder1 = Yahentamitsi.breakfast.slice();
        let holder2 = Yahentamitsi.lunch.slice();
        let holder3 = Yahentamitsi.dinner.slice();
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });
    } else if(dietaryRestrictions == "vegetarian"){
        let ht1 = Yahentamitsi.breakfast.slice();
        let ht2 = Yahentamitsi.lunch.slice();
        let ht3 = Yahentamitsi.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("vegetarian") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("vegetarian") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("vegetarian") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "soy"){
        let ht1 = Yahentamitsi.breakfast.slice();
        let ht2 = Yahentamitsi.lunch.slice();
        let ht3 = Yahentamitsi.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("soy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("soy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("soy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "eggs"){
        let ht1 = Yahentamitsi.breakfast.slice();
        let ht2 = Yahentamitsi.lunch.slice();
        let ht3 = Yahentamitsi.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("eggs") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("eggs") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("eggs") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "dairy"){
        let ht1 = Yahentamitsi.breakfast.slice();
        let ht2 = Yahentamitsi.lunch.slice();
        let ht3 = Yahentamitsi.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("dairy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("dairy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "gluten"){
        let ht1 = Yahentamitsi.breakfast.slice();
        let ht2 = Yahentamitsi.lunch.slice();
        let ht3 = Yahentamitsi.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("gluten") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("gluten") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    }
    } else if (location == "South Diner"){
    let holder1 = South_Diner.breakfast.slice();
    let holder2 = South_Diner.lunch.slice();
    let holder3 = South_Diner.dinner.slice();
    if(dietaryRestrictions == "none"){
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });
    }else if(dietaryRestrictions == "vegetarian"){
        let ht1 = South_Diner.breakfast.slice();
        let ht2 = South_Diner.lunch.slice();
        let ht3 = South_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("vegetarian") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("vegetarian") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("vegetarian") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "soy"){
        let ht1 = South_Diner.breakfast.slice();
        let ht2 = South_Diner.lunch.slice();
        let ht3 = South_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("soy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("soy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("soy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "eggs"){
        let ht1 = South_Diner.breakfast.slice();
        let ht2 = South_Diner.lunch.slice();
        let ht3 = South_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("eggs") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("eggs") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("eggs") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "dairy"){
        let ht1 = South_Diner.breakfast.slice();
        let ht2 = South_Diner.lunch.slice();
        let ht3 = South_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("dairy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("dairy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "gluten"){
        let ht1 = South_Diner.breakfast.slice();
        let ht2 = South_Diner.lunch.slice();
        let ht3 = South_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("gluten") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("gluten") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    }
    } else if (location == "North Diner"){
    let holder1 = North_Diner.breakfast.slice();
    let holder2 = North_Diner.lunch.slice();
    let holder3 = North_Diner.dinner.slice();
    if(dietaryRestrictions == "none"){
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });
    }else if(dietaryRestrictions == "vegetarian"){
        let ht1 = North_Diner.breakfast.slice();
        let ht2 = North_Diner.lunch.slice();
        let ht3 = North_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("vegetarian") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("vegetarian") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("vegetarian") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "soy"){
        let ht1 = North_Diner.breakfast.slice();
        let ht2 = North_Diner.lunch.slice();
        let ht3 = North_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("soy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("soy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("soy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "eggs"){
        let ht1 = North_Diner.breakfast.slice();
        let ht2 = North_Diner.lunch.slice();
        let ht3 = North_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("eggs") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("eggs") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("eggs") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "dairy"){
        let ht1 = North_Diner.breakfast.slice();
        let ht2 = North_Diner.lunch.slice();
        let ht3 = North_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("dairy") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("dairy") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    } else if(dietaryRestrictions == "gluten"){
        let ht1 = North_Diner.breakfast.slice();
        let ht2 = North_Diner.lunch.slice();
        let ht3 = North_Diner.dinner.slice();
        let holder1 = [];
        let holder2 = [];
        let holder3 = [];
        for(let j = 0; j < ht1.length; j++){
        if(ht1[j].dietary.indexOf("gluten") !== -1){
            holder1.push(ht1[j]);
        }
        }
        for(let j = 0; j < ht2.length; j++){
        if(ht2[j].dietary.indexOf("gluten") !== -1){
            holder2.push(ht2[j]);
        }
        }
        for(let j = 0; j < ht3.length; j++){
        if(ht3[j].dietary.indexOf("dairy") !== -1){
            holder3.push(ht3[j]);
        }
        }
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
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q1)}&dataType=${encodeURIComponent(holder1[randomIndex1].dataType)}&pagesize=${encodeURIComponent(holder1[randomIndex1].pagesize)}`;

        const api_url2 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q2)}&dataType=${encodeURIComponent(holder2[randomIndex2].dataType)}&pagesize=${encodeURIComponent(holder2[randomIndex2].pagesize)}`;

        const api_url3 = 
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${encodeURIComponent(key)}&query=${encodeURIComponent(q3)}&dataType=${encodeURIComponent(holder3[randomIndex3].dataType)}&pagesize=${encodeURIComponent(holder3[randomIndex3].pagesize)}`;

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
        

        br.push(br_promise);
        lunc.push(lunc_promise);
        din.push(din_promise);
        
        holder1.splice(randomIndex1, 1);
        holder2.splice(randomIndex2, 1);
        holder3.splice(randomIndex3, 1);
        }
        Promise.all(br).then(function(array){
        console.log(array);
        });
        Promise.all(lunc).then(function(array){
        console.log(array);
        });
        Promise.all(din).then(function(array){
        console.log(array);
        });      
    }
    }


}

function getData(key){
    return fetch(key).then(response => response.json());
}
app.listen(portNumber);