// Make the DIV element draggable:
// <!-- Draggable DIV -->
// <div id="mydiv">
//   <!-- Include a header DIV with the same name as the draggable DIV, followed by "header" -->
//   <div id="mydivheader">TIME HERE</div>
// </div>

var draggableElement = document.createElement('div');
var draggableElementControl = document.createElement('div');
draggableElementControl.innerHTML = calcTime('+1');
draggableElement.setAttribute('id', 'mydiv');
draggableElementControl.setAttribute('id', 'mydivheader');
draggableElement.appendChild(draggableElementControl);
document.body.appendChild(draggableElement);

console.log('draggableElement', draggableElement);

dragElement(document.getElementById('mydiv'));

setInterval(function () {
	const timeNow = calcTime('+1');
	console.log('timeNow', timeNow);
	if (draggableElementControl.innerHTML !== timeNow) draggableElementControl.innerHTML = timeNow;
}, 5000);

function calcTime(offset) {
	// create Date object for current location
	var d = new Date();

	// convert to msec
	// subtract local time zone offset
	// get UTC time in msec
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

	// create new Date object using supplied offset
	var nd = new Date(utc + (3600000 * offset));

	// return time as a string
	return nd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
}

function dragElement(elmnt) {
	var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	if (document.getElementById(elmnt.id + 'header')) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - pos2) + 'px';
		elmnt.style.left = (elmnt.offsetLeft - pos1) + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}