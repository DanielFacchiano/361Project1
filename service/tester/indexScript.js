/**
 * Daniel Facchiano: Homework 6
 * Cs 290_401
 * 5/29/2021
 */

document.addEventListener('DOMContentLoaded', inputPost);			//bind hidden edit button

urlStr = 'http://flip3.engr.oregonstate.edu:20155/';		//the address of our server

function inputPost(){
        console.log("hello");
	    document.getElementById('excerciseSubmit').addEventListener('click', function(event){
        console.log("hello");
		var req = new XMLHttpRequest();
		var payload = {amount:null, conversion:null};
		payload.amount = 	document.getElementById('amount').value;
		payload.conversion =  document.getElementById('conversion').value;
		req.open('POST', urlStr, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);	//Creates array of rows, super helpful for front end
				console.log(response);// log to console what we got back
			}
			else{
				console.log("Error (did you put blank input?)"+req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
		event.preventDefault();					//do not refresh page
	})
}

