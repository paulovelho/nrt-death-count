
var p = '<i class="p"></i>';
var counters = [];
var totals = [];
var scale = 10;
var speed = 10;
var autoscroll = true;

var counts = tragedies.filter(t => t.active);

var pw = 12;

function appendP(graph, fraction) {
	let i = document.createElement('i');
	if(fraction) {
		i.style.width = 12 * fraction + "px";
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
			let extra = totals[id] - counters[id];
			if(extra) {
				appendP(graph, extra);
			}
			document.getElementById(graph + "-count").innerHTML = (totals[id])*scale;
			return;
		}

		document.getElementById(graph + "-count").innerHTML = (counters[id])*scale;
		if(autoscroll) window.scrollTo(0,document.body.scrollHeight);
		window.setTimeout(() => addP(id), speed);
	}
	addP(graphId);
}

function clearGraph(graphId) {
	let el = document.getElementById("necro-graph" + graphId);
	if(!el || el == undefined) return;
	while (el.firstChild) {
		el.removeChild(el.firstChild);
	}
}


/* ======================== PARAMS ================= */
function getQueryStringValue (key) {  
	return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

function loadQuery () {
	let items = getQueryStringValue('compare');
	if(!items) return;
	items = items.split(',');
	let compare = counts.filter(i => items.indexOf(i.id) >= 0);
	compare.sort((a, b) => (a.count > b.count) ? 1 : -1);
	console.info("selecting ", compare);
	for (var i = 0; i < compare.length; i++) {
		selectItem(i+1, compare[i].id);
	}
}


/* ======================== CONTROL PANEL ================= */
function fillSelect(selId) {
	console.info("filling up " + selId);
	var options = "";
	for (var i = 0, len = counts.length; i < len; i++) {
		var item = counts[i];
		options += "<option value="+item.id+">"+item.name+"</option>";
	}
	document.getElementById(selId).innerHTML = options;
}

function selectItem(id, value) {
	let selId = "item"+id;	
	let select = document.getElementById(selId);
	let options = select.options;
	for (var opt, i = 0; opt = options[i]; i++) {
		if (opt.value == value) {
			select.selectedIndex = i;
			break;
		}
	}
}

function clearAll() {
	clearGraph(1);
	clearGraph(2);
	clearGraph(3);
	clearGraph(4);
}

function setScale() {
	let amount = document.getElementById("scale").value;
	scale = amount;
	console.info("new scale: ", scale);
}

function simulate() {
	clearAll();
	for (var i = 1; i <=4; i++) {
		let select = document.getElementById("item" + i);
		let itemId = select.options[select.selectedIndex].value;
		let item = counts.filter(c => c.id == itemId)[0];
		console.info("filling " + i, item);
		fillGraph(i, item.name, item.count);
	}
}





function loadControlPanel() {
	fillSelect("item1");
	fillSelect("item2");
	fillSelect("item3");
	fillSelect("item4");
}

function Initiate() {
	window.onscroll = (e) => {
		if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
			autoscroll = true;
		} else {
			autoscroll = false;
		}
	};

	loadControlPanel();
	loadQuery();
}

Initiate();
