// for decimal rounding, taken from the MDN website on Math.round. i only need Math.floor10
// Closure
(function() {
  /**
   * Decimal adjustment of a number.
   *
   * @param {String}  type  The type of adjustment.
   * @param {Number}  value The number.
   * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
   * @returns {Number} The adjusted value.
   */
  function decimalAdjust(type, value, exp) {
    // If the exp is undefined or zero...
    if (typeof exp === 'undefined' || +exp === 0) {
      return Math[type](value);
    }
    value = +value;
    exp = +exp;
    // If the value is not a number or the exp is not an integer...
    if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
      return NaN;
    }
    // Shift
    value = value.toString().split('e');
    value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
    // Shift back
    value = value.toString().split('e');
    return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
  }
  // Decimal floor
  if (!Math.floor10) {
    Math.floor10 = function(value, exp) {
      return decimalAdjust('floor', value, exp);
    };
  }
})();


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
		t = Math.floor10(t/(60*1000), -2); // convert to minutes
		return t;
	};
};

// convert the time from decimal to X:Y format
function convertTime(t) {
	t = t.toString().split('.');
	return t[0] + ':' + t[1];
}

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