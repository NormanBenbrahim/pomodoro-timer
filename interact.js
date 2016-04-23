var pomodoro = document.getElementById("pomodoro"); // total pomodoro time

// create stopwatch class 
var	CountDown = function(timePoint) {
	// convert time (mins) to ms
	timePoint *= 60*1000;
	
	// Private vars
	var	startAt	= 0;	// Time of last start / resume. (0 if not running)
	var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
	
	// return the current time in ms
	var	now	= function() {
		return (new Date()).getTime(); 
	};

	// Start or resume
	this.start = function() {
			startAt	= startAt ? startAt : now();
		};

	// Stop or pause
	this.stop = function() {
			// If running, update elapsed time otherwise keep it
			lapTime	= startAt ? lapTime + now() - startAt : lapTime;
			startAt	= 0; // Paused
		};

	// Reset
	this.reset = function() {
			lapTime = startAt = 0;
		};

	// Duration
	this.time = function() {
		var lap = lapTime + (startAt ? now() - startAt : 0); 
		t = timePoint - lap; //countdown the time
		t = t/(60*1000); // convert to minutes
		return t;
	};
};



// handle events


/* for animations and stuff
var start = null;
var element = document.getElementById("hourglass"); //for animating
function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
	console.log(progress); 
  element.style.left = Math.min(progress/10, 200) +"px"; 
  if (progress < 10000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);*/