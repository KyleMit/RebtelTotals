// get all rows
rows = document.body.querySelectorAll('#historyTable tr')

// add heaer
cell = document.createElement("th")
cell.innerHTML = "$/min"
rows[0].appendChild(cell)

// declare total
var total = 0; 
    
// loop through rows
for (i = 2; i < rows.length; i++) {
	row = rows[i];
 	costCell = row.querySelector('td.transaction.transaction-negative')
	durCell = row.querySelector('td.duration');

    if (costCell) {
        // add up total
        total += Number(costCell.innerText.replace(/[^0-9\.]+/g,""));
    }
    
	if (costCell && durCell) {
        // calculate cost per minute
		cost = costCell.innerText.replace(/[^0-9\.]+/g,"");
		dur = durCell.innerText;

		durParts = dur.split(":");
		durMin = Number(durParts[0]) * 60 + Number(durParts[1]) + (Number(durParts[2])>0 ? 1 : 0);
		cpm = cost / durMin;

		cell = document.createElement("td")
		cell.innerHTML = "¢"+ Math.floor(cpm * 100)
		row.appendChild(cell)
	}
}

// create total row
var table = document.body.querySelector('#historyTable tbody');
var newRow = document.createElement("tr")

var cell = document.createElement("td")
cell.classList.add("icon")
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("datetime")
cell.innerHTML = "Total"
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("type")
cell.classList.add("hidden-phone")
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("hidden-phone")
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("hidden-phone")
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("duration")
newRow.appendChild(cell)

cell = document.createElement("td")
cell.classList.add("transaction")
cell.innerHTML = "$"+ total.toFixed(2)
newRow.appendChild(cell)

// add row to table
table.appendChild(newRow)