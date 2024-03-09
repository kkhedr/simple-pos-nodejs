var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
var authRoute = require('./routes/auth.route');

app.use(cors());

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.send("app working ....");
});

app.use('/api/auth', authRoute);

app.listen(2000, () =>{
    console.log("server listening port 3000 ........");
});