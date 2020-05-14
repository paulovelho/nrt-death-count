
var p = '<i class="p"></i>';
var counters = [];
var totals = [];
var scale = 10;
var speed = 10;

var pw = 12;

function appendP(graph, fraction) {
	let i = document.createElement('i');
	if(fraction>0) {
		i.style.width = 12/fraction + "px";
	}
	document
		.getElementById("necro-"+graph)
		.appendChild(i);
}

function fillGraph(graphId, name, deaths) {
	let graph = "graph" + graphId;
	let necroDiv = graph + " .necro";

	totals[graphId] = deaths/scale;
	counters[graphId] = 0;
	document.getElementById(graph + "-title").innerHTML = name;

	let addP = (id) => {
		counters[id]++;
		appendP(graph);
		if(counters[id] > totals[id]-1) {
			let extra = (totals[id]*scale) - (counters[id]*scale);
			if(extra) {
				appendP(graph, extra);
			}
			document.getElementById(graph + "-count").innerHTML = (totals[id])*10;
			speed += 10;
			return;
		}

		document.getElementById(graph + "-count").innerHTML = (counters[id])*scale;
//		window.scrollTo(0,document.body.scrollHeight);
		window.setTimeout(() => addP(id), speed);
	}

	addP(graphId);


}

function clearGraph(graphId) {
	let el = document.getElementById("graph" + graphId);
	while (el.firstChild) {
		el.removeChild(this.el.firstChild);
	}
}







/*
fillGraph(4, "Covid - Brasil", 12461);
fillGraph(3, "11 de setembro", 2996);
fillGraph(2, "soldados americanos mortos em Omaha Beach no Dia D", 2499);
fillGraph(1, "Titanic", 1517);
fillGraph(1, "Brumadinho", 254);


*/
