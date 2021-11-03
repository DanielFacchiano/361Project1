/**
 * Daniel Facchiano: Homework 6
 * Cs 290_401
 * 5/29/2021
 */

document.addEventListener('DOMContentLoaded', inputPost);			//bind hidden edit button

urlStr = 'http://flip3.engr.oregonstate.edu:21152/';		//the address of our server

function inputPost(){
	document.getElementById('excerciseSubmit').addEventListener('click', function(event){
		var req = new XMLHttpRequest();
		var payload = {exName:null, reps:null, weight:null, date:null, unit:null};
		payload.exName = 	document.getElementById('exName').value;
		payload.reps = 		document.getElementById('reps').value;
		payload.weight 	= 	document.getElementById('weight').value;
		
		//We need to convert the front end date information in document.getElementById('date').value to  sql data
		payload.date = toSqlDate(document.getElementById('date').value);
		//payload.date = 		document.getElementById('date').value;
		
		payload.unit = 		document.getElementById('unit').value;
		req.open('POST', urlStr, true);
		req.setRequestHeader('Content-Type', 'application/json');
		req.addEventListener('load', function(){
			if(req.status>= 200 && req.status < 400){
				var response = JSON.parse(req.responseText);	//Creates array of rows, super helpful for front end
				//console.log(response);// log to console what we got back
			}
			else{
				console.log("Error (did you put blank input?)"+req.statusText);
			}
		});
		req.send(JSON.stringify(payload));
		event.preventDefault();					//do not refresh page
	})
}
/*
	Builds the initial table, gets the sql data via server get route and pass that Json to rebuildTable function
*/






/*
	Function to deal with outgoing table date data. We convert the string to a format that
	sql will accept
*/
function toSqlDate(tableDate){
	var newDate = "";
	var month = tableDate.slice(0, 2);
	var day = tableDate.slice(3, 5);
	var year = tableDate.slice(6, 10);
	newDate = newDate+year;
	newDate = newDate+"-";
	newDate = newDate+month;
	newDate = newDate+"-";
	newDate = newDate+day;
	return newDate;
}
/*
	Function to deal with incoming sql date data. Converts Sql date to a more human friendly format
	
*/
function toTableDate(sqlDate){
	var newDate = "";
	var year = sqlDate.slice(0, 4);
	var month = sqlDate.slice(5, 7);
	var day = sqlDate.slice(8, 10);
	newDate = newDate+month;
	newDate = newDate+"-";
	newDate = newDate+day;
	newDate = newDate+"-";
	newDate = newDate+year;
	return newDate;
}
/*
	Looks through Table dat, returns object corresponding to the passed row id
*/
function retrieveRow(updateId){
	var chosenRow = {};
	globalTableData.forEach(function(row){
		if(row.id == updateId){
			chosenRow = row;
		}
	});
	return chosenRow;
}
/*
	will refresh table after succsesful insert or delete or update. loops through the table data and uses 
	the dom to create a row out of every element in the json object array. Each row is build then
	appended to the table element until every row has been represented
 */

function rebuildTable(tableData){
	var table = document.getElementById('mainTable');	//Get our html table
	table.innerHTML = "";	//Reset it to nothing
	var headRow = createHeadRow();	//Fetch a new headRow and append it to the table
	table.appendChild(headRow);
	
	//Loop to go through new table data, create rows, and append to index table body
	tableData.forEach(function(row){
		var bodyRow = document.createElement("tr");
		
		var bodyCellName = document.createElement("td");
		bodyCellName.textContent = row.name;
		bodyRow.appendChild(bodyCellName);
		
		var bodyCellReps = document.createElement("td");
		bodyCellReps.textContent = row.reps;
		bodyRow.appendChild(bodyCellReps);
		
		var bodyCellWeight = document.createElement("td");
		bodyCellWeight.textContent = row.weight;
		bodyRow.appendChild(bodyCellWeight);
		
		var bodyCellDate= document.createElement("td");
		
		//convert the sql information into front end date information(convert row.date)
		var formatDate = toTableDate(row.date)
		
		bodyCellDate.textContent = formatDate;
		bodyRow.appendChild(bodyCellDate);
		
		var bodyCellUnit= document.createElement("td");
		bodyCellUnit.textContent = row.lbs;
		bodyRow.appendChild(bodyCellUnit);
		
		var bodyCellDelete = document.createElement("td");
		var delButton = document.createElement('input');
		delButton.setAttribute("type", "button");
		delButton.setAttribute("id", "D"+row.id);
		delButton.setAttribute("value", "Delete");
		delButton.setAttribute("onclick", "deleteRow(this);");
		
		var deleteId = document.createElement('input');
		deleteId.setAttribute("type", "hidden");
		deleteId.setAttribute("value", row.id);
		
		bodyCellDelete.appendChild(delButton);
		bodyCellDelete.appendChild(deleteId);
		bodyRow.appendChild(bodyCellDelete);
		
		//original way of detecting the row id
		var bodyCellEdit = document.createElement("td");
		var editButton = document.createElement('input');
		editButton.setAttribute("type", "button");
		editButton.setAttribute("id", "E"+row.id);
		editButton.setAttribute("value", "Edit");
		editButton.setAttribute("onclick", "editRow(this);");
		
		//hidden inputs used because Program Requirements
		var editId = document.createElement('input');
		editId.setAttribute("type", "hidden");
		editId.setAttribute("value", row.id);

	
		bodyCellEdit.appendChild(editButton);
		bodyCellEdit.appendChild(editId);
		
		bodyRow.appendChild(bodyCellEdit);	
		
		table.appendChild(bodyRow);
	});
}
/*
	function to Keep the rebuild table function from getting cluttered, returns a proper headrow for our table
*/

function createHeadRow(){
	var headRow = document.createElement("tr");		//
	var headCellName = document.createElement("th");
	headCellName.textContent = "Excercise_Name";
	headRow.appendChild(headCellName);
	
	var headCellReps = document.createElement("th");
	headCellReps.textContent = "Repetitions";
	headRow.appendChild(headCellReps);
		
	var headCellWeight = document.createElement("th");
	headCellWeight.textContent = "Weight";
	headRow.appendChild(headCellWeight);

	var headCellDate = document.createElement("th");
	headCellDate.textContent = "Date";
	headRow.appendChild(headCellDate);

	var headCellUnit = document.createElement("th");
	headCellUnit.textContent = "Lbs";
	headRow.appendChild(headCellUnit);
	
	var headCellDelete = document.createElement("th");
	headCellDelete.textContent = "Delete";
	headRow.appendChild(headCellDelete);
	
	var headCellEdit = document.createElement("th");
	headCellEdit.textContent = "Edit";
	headRow.appendChild(headCellEdit);
	
	var headCellId = document.createElement("th");
	headCellId.textContent = "";
	headRow.appendChild(headCellId);
	return headRow;
}
