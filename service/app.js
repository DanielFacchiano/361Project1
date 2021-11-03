var express = require('express');		// this is a node express application
var cors = require('cors');				// get cors to use it to get around access error
var app = express();					// our node app uses expresss
var bodyParser = require('body-parser');// required for post requests and json parsing
app.use(bodyParser.urlencoded({ extended: false })); // we can decode body url data
app.use(bodyParser.json()); 			// we can decode json datastructure data
app.use(cors());						//get around cors access error
app.set('port', 3000);					//Port we will listen on

const conversionRates = {
    "AUD" : 1.34,
    "CHF" : .91,
    "CAD" : 1.24,
    "CNY" : 6.41,
    "EUR" : .86,
    "GBP" : .73,
    "JPY" : 114,
    "KRW" : 1179.44,
    "MXN" : 20.55,
    "USD" : 1
}
const conversionSymbols = {
    "AUD" : "$",
    "CHF" : "CHF",
    "CAD" : "$",
    "CNY" : "¥",
    "EUR" : "€",
    "GBP" : "£",
    "JPY" : "¥",
    "KRW" : "₩",
    "MXN" : "$",
    "USD" : "$"
}


app.get('/', function(req, res){
    var payload = {}
    payload.cheese = "burger";
	res.send(payload);
    console.log("data sent");
});

app.post('/', function(req, res){
    var bResults = req.body; // body results refrences our post body data
    var rate = conversionRates[ bResults.conversion]
    var symbol = conversionSymbols [ bResults.conversion]
    var amount = parseFloat(bResults.amount)
    var convertedAmount = amount*rate
    var payload = {}
    payload.convertedAmount = convertedAmount;
    payload.symbol = symbol;
    payload.type = bResults.conversion;

	res.send(payload);
    console.log("data sent");
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });
  