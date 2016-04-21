var start = null;
var element = document.getElementById("hourglass"); //for animating
var pomodoro = document.getElementById("pomodoro"); // total pomodoro time

// create stopwatch class 
var	Stopwatch = function() {
		// Private vars
		var	startAt	= 0;	// Time of last start / resume. (0 if not running)
		var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

		var	now	= function() {
				return (new Date()).getTime(); 
			}; 
 
		// Public methods
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
				return lapTime + (startAt ? now() - startAt : 0); 
			};
	};



/*
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