// API Web App by Binyomin Mansheim

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const request = require('request');
const { finished } = require('stream');

const PORT = process.env.PORT || 5000;

// API key pk_6b35f7e7fb0842ada1248b416042ae8f
// create call API function
function call_api(finishedAPI) {
    request('https://cloud.iexapis.com/stable/stock/fb/quote?token=pk_6b35f7e7fb0842ada1248b416042ae8f', { json: true }, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        finishedAPI(body);
    };
});
}


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff..."

// Set handlebar routes
app.get('/', function (req, res) {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    });
});

app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})