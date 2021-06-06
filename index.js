// API Web App by Binyomin Mansheim

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "This is other stuff..."

// Set handlebar routes
app.get('/', function (req, res) {
    res.render('home', {
        stuff: otherstuff
    });
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT)
})