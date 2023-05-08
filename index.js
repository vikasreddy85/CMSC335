const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const data = require('./public/data');
const portNumber = 3000;
const fetch = require('node-fetch');
const {North_Diner, South_Diner, Yahentamitsi} = require("./public/data");
let name;
// require("dotenv").config({ path: path.resolve(__dirname, '.env') }) 
app.set('views', './pages');
app.set('view engine', 'ejs');
app.use(express.static("public"));
process.stdin.setEncoding("utf8");

const apiKey = 'DsANKhYUjao9yvEYid5SdNfJtZAIuyctD3b8UzLa';
const databaseAndCollection = {db: 'My-Fitterp-Pal', collection: 'foodData'};

const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://jeff85:YyxOWVfuqBCCfg0Q@cluster0.nwnhobm.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

if (process.argv.length !== 2) {
    console.log('Application failed to start.');
    process.exit(1);
} else{
    console.log(`Web server started and running at http://localhost:${portNumber}`);
}

async function toInputMongo(name, email, bmr, array){
    try {
        await client.connect();
        let newData = {
            name: name,
            email: email, 
            bmr: bmr,
            breakfast1: array[0].name, 
            breakfast2: array[3].name, 
            breakfast3: array[6].name, 
            bc1: array[0].carbohydrates, 
            bc2: array[3].carbohydrates,
            bc3: array[6].carbohydrates,
            bp1: array[0].protein, 
            bp2: array[3].protein,
            bp3: array[6].protein,
            bf1: array[0].fat, 
            bf2: array[3].fat,
            bf3: array[6].fat,
            bcal1: array[0].calories, 
            bcal2: array[3].calories,
            bcal3: array[6].calories,

            lunch1: array[1].name, 
            lunch2: array[4].name, 
            lunch3: array[7].name, 
            lc1: array[1].carbohydrates, 
            lc2: array[4].carbohydrates,
            lc3: array[7].carbohydrates,
            lp1: array[1].protein, 
            lp2: array[4].protein,
            lp3: array[7].protein,
            lf1: array[1].fat, 
            lf2: array[4].fat,
            lf3: array[7].fat,
            lcal1: array[1].calories, 
            lcal2: array[4].calories,
            lcal3: array[7].calories,

            dinner1: array[2].name, 
            dinner2: array[5].name, 
            dinner3: array[8].name, 
            dc1: array[2].carbohydrates, 
            dc2: array[5].carbohydrates,
            dc3: array[8].carbohydrates,
            dp1: array[2].protein, 
            dp2: array[5].protein,
            dp3: array[8].protein,
            df1: array[2].fat, 
            df2: array[5].fat,
            df3: array[8].fat,
            dcal1: array[2].calories, 
            dcal2: array[5].calories,
            dcal3: array[8].calories
        };
        await client.db(databaseAndCollection.db).collection(databaseAndCollection.collection).insertOne(newData);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

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
    name = request.body.name;
    let total_bmr = 0.0;
    let hold_height;
    let temp_height; 
    let email = request.body.email;
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

        //console.log("A" + holder1 + "A");
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
        // console.log(array);
        toInputMongo(name, email, total_bmr, array);


        response.render("result", {
            name: name,
            total_bmr: total_bmr, 
            breakfast1: array[0].name, 
            breakfast2: array[3].name, 
            breakfast3: array[6].name, 
            bc1: array[0].carbohydrates.toFixed(1), 
            bc2: array[3].carbohydrates.toFixed(1),
            bc3: array[6].carbohydrates.toFixed(1),
            bp1: array[0].protein.toFixed(1), 
            bp2: array[3].protein.toFixed(1),
            bp3: array[6].protein.toFixed(1),
            bf1: array[0].fat.toFixed(1), 
            bf2: array[3].fat.toFixed(1),
            bf3: array[6].fat.toFixed(1),
            bcal1: array[0].calories.toFixed(1), 
            bcal2: array[3].calories.toFixed(1),
            bcal3: array[6].calories.toFixed(1),

            lunch1: array[1].name, 
            lunch2: array[4].name, 
            lunch3: array[7].name, 
            lc1: array[1].carbohydrates.toFixed(1), 
            lc2: array[4].carbohydrates.toFixed(1),
            lc3: array[7].carbohydrates.toFixed(1),
            lp1: array[1].protein.toFixed(1), 
            lp2: array[4].protein.toFixed(1),
            lp3: array[7].protein.toFixed(1),
            lf1: array[1].fat.toFixed(1), 
            lf2: array[4].fat.toFixed(1),
            lf3: array[7].fat.toFixed(1),
            lcal1: array[1].calories.toFixed(1), 
            lcal2: array[4].calories.toFixed(1),
            lcal3: array[7].calories.toFixed(1),

            dinner1: array[2].name, 
            dinner2: array[5].name, 
            dinner3: array[8].name, 
            dc1: array[2].carbohydrates.toFixed(1), 
            dc2: array[5].carbohydrates.toFixed(1),
            dc3: array[8].carbohydrates.toFixed(1),
            dp1: array[2].protein.toFixed(1), 
            dp2: array[5].protein.toFixed(1),
            dp3: array[8].protein.toFixed(1),
            df1: array[2].fat.toFixed(1), 
            df2: array[5].fat.toFixed(1),
            df3: array[8].fat.toFixed(1),
            dcal1: array[2].calories.toFixed(1), 
            dcal2: array[5].calories.toFixed(1),
            dcal3: array[8].calories.toFixed(1)
        }); 
    }); 
});

function getData(key){
    return fetch(key).then(response => response.json());
}

app.get("/info", (request, response) => {
    response.render("email.ejs");
});



app.use(bodyParser.urlencoded({extended:false}));
app.post("/getInfo", async (request, response) => {
    let email = request.body.email;
    try {
        await client.connect();
        let filter = {email: email};
        const result = await client.db(databaseAndCollection.db)
                            .collection(databaseAndCollection.collection)
                            .findOne(filter);
        //console.log(result.name);
        response.render("result", {
            name: result.name,
            total_bmr: result.bmr, 
            breakfast1: result.breakfast1, 
            breakfast2: result.breakfast2, 
            breakfast3: result.breakfast3, 
            bc1: result.bc1, 
            bc2: result.bc2,
            bc3: result.bc3,
            bp1: result.bp1, 
            bp2: result.bp2,
            bp3: result.bp3,
            bf1: result.bf1, 
            bf2: result.bf2,
            bf3: result.bf3,
            bcal1: result.bcal1, 
            bcal2: result.bcal2,
            bcal3: result.bcal3,

            lunch1: result.lunch1, 
            lunch2: result.lunch2, 
            lunch3: result.lunch3, 
            lc1: result.lc1, 
            lc2: result.lc2,
            lc3: result.lc3,
            lp1: result.lp1, 
            lp2: result.lp2,
            lp3: result.lp3,
            lf1: result.lf1, 
            lf2: result.lf2,
            lf3: result.lf3,
            lcal1: result.lcal1, 
            lcal2: result.lcal2,
            lcal3: result.lcal3,

            dinner1: result.dinner1, 
            dinner2: result.dinner2, 
            dinner3: result.dinner3, 
            dc1: result.dc1, 
            dc2: result.dc2,
            dc3: result.dc3,
            dp1: result.dp1, 
            dp2: result.dp2,
            dp3: result.dp3,
            df1: result.df1, 
            df2: result.df2,
            df3: result.df3,
            dcal1: result.dcal1, 
            dcal2: result.dcal2,
            dcal3: result.dcal3
        });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
});

app.listen(portNumber);