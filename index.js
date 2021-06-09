// API Web App by Binyomin Mansheim

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs');

// First attempt

// const stocksFileContents = fs.readFileSync(path.join(__dirname, 'stocks.txt')).toString();
// const stocks = [];

// stocksFileContents.split('\n').forEach((line) => {
//     stocks.push({
//         'tickerSymbol': line
//     })
// });

// const randomStock = Math.floor(Math.random() * stocks.length);


// Second attempt
// This loads your file from somewhere
// fs.readFile('stocks.txt', 'utf8', function(err, data){
//     if(err) throw err;
//     var lines = data.split('\n');
//     var rand = [Math.floor(Math.random()*lines.length)];
//     var line = lines[rand]
// });


const PORT = process.env.PORT || 5000;

// use body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));

// API key pk_6b35f7e7fb0842ada1248b416042ae8f
// create call API function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_6b35f7e7fb0842ada1248b416042ae8f', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        if (res.statusCode === 200) {
            finishedAPI(body);
        };
    });
}


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff...";

// Set handlebar index GET route
app.get('/', function (req, res) {
    call_api(function (doneAPI) {
        res.render('home', {
            stock: doneAPI
        });
    }, line);
});

// Set handlebar index POST route
app.post('/', function (req, res) {
    call_api(function (doneAPI) {
        //ticker_symbol = req.body.stock_ticker;
        res.render('home', {
            stock: doneAPI,
        });
    }, req.body.stock_ticker);
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})