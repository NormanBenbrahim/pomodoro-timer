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

// create stopwatch class, inspired by https://gist.github.com/electricg/4372563 
var	CountDown = function(timePoint) {
	// convert time to ms
	timePoint *= 60*1000;
	
	// private vars
	var	startAt	= 0;	// Time of last start / resume. (0 if not running)
	var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds
	
	// return current time
	var	now	= function() {
		return (new Date()).getTime(); 
	};

	// start or resume
	this.start = function() {
			startAt	= startAt ? startAt : now();
		};

	// stop or pause
	this.stop = function() {
			// If running, update elapsed time otherwise keep it
			lapTime	= startAt ? lapTime + now() - startAt : lapTime;
			startAt	= 0; // Paused
		};

	// reset
	this.reset = function() {
			lapTime = startAt = 0;
		};

	// duration
	this.time = function() {
		var lap = lapTime + (startAt ? now() - startAt : 0); 
		t = timePoint - lap; //countdown the time
		t = Math.floor10(t/(60*1000), -2); // convert to minutes
		if (t<=0) {
			return 0;
		}
		else {
			return t;
		}
	};
	
	// initial counter
	this.initial = function() {
		return timePoint/(60*1000);
	}
};

// convert the time from decimal to X:Y format
function convertTime(t) {
	t = t.toString().split('.');
	t = t[0] + ':' + t[1];
	if (t.length<5) {
		t += '0'; // append 0 to things like 24:5
	}
	return t;
}

function show() {
	update();
}

function update() {
	timer.innerHTML = formatTime(x.time());
}

// we need 2 event listeners, mouseup (desktop) and touchend (mobile) for
// each of the timers 

// the timer element 
var pomodoroTime = document.getElementById("pomodoro").value;
var timer = document.getElementById("timer");
timer.innerHTML = pomodoroTime + ':00';
document.getElementById("pomodoro").addEventListener('touchend', function() {
	pomodoroTime = document.getElementById("pomodoro").value;
	timer.innerHTML = pomodoroTime + ':00';
}, false);
document.getElementById("pomodoro").addEventListener('mouseup', function() {
	pomodoroTime = document.getElementById("pomodoro").value;
	timer.innerHTML = pomodoroTime + ':00';
}, false);

// the break element
var breaker = document.getElementById("breaker");
var breakTime = document.getElementById("break").value;
breaker.innerHTML = breakTime + ':00';
document.getElementById("break").addEventListener('touchend', function() {
	breakTime = document.getElementById("break").value + ':00';
	breaker.innerHTML = breakTime;
}, false) // bubbling, if nested element 2 gets captured first
document.getElementById("break").addEventListener('mouseup', function() {
	breakTime = document.getElementById("break").value + ':00';
	breaker.innerHTML = breakTime;	
}, false);

// the number of total pomodoros, this needs an extra enter event
var numberPomodoros = document.getElementById("number-pomodoros").value;
document.getElementById("number-pomodoros").addEventListener('touchend', function() {
	numberPomodoros = document.getElementById("number-pomodoros").value;
}, false);
document.getElementById("number-pomodoros").addEventListener('mouseup', function() {
	numberPomodoros = document.getElementById("number-pomodoros").value;
}, false);
document.getElementById("number-pomodoros").addEventListener('keydown', function(e) {
	if (e.keyCode===13) {
		numberPomodoros = document.getElementById("number-pomodoros").value;
	}
}, false);


// now when the user wants to start, we need to keep updating the clock based on the click

// for controlling the clock
var playButton = document.getElementById("play-pause");
var stopButton = document.getElementById("stop");

/*
playButton.onclick = function() {
	numberPomodoros = parseInt(numberPomodoros);
	t_pom = new CountDown(parseInt(pomodoroTime));
	t_brk = new CountDown(parseInt(breakTime));
	
	// start the pomodoro timer
	t_pom.start();
	
	// update the timer element 
	timer.innerHTML = convertTime(t_pom.time());
}*/




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