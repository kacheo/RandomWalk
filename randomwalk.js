function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomWalkInstance(x,y,color) {
	this.x = x;
	this.y = y;
	this.color = color;
}

$(document).ready(function() {
	// Any integers/metrics
	var stepLength_PX = 1;
	var delay_MS = 0;

	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext('2d');
	
	var instances = []; //Store all random instances
	
	// Counters
	var numSteps = 0;
	var numInstances = 0;
	
	var backgroundTimer = window.setInterval(function() {drawNewWalkPoint()}, delay_MS);

	function drawNewWalkPoint() {

		// Pick left right bottom or top
		for (i = 0; i < instances.length; i++) {
			var inst = instances[i]; // draw this instance's next point

			context.beginPath();
			moveLineForNextStep(inst);
			context.stroke();
		}

      	$('#steps').html(numSteps);
	}

	function moveLineForNextStep(instance) {
		var direction = Math.floor(Math.random() * (5 - 1)) + 1;
      	context.strokeStyle = instance.color;
		numSteps++;
		
		// Move
		switch(direction) {
			case 1:
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x-=stepLength_PX, instance.y);
		      break;
  			case 2:
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x+=stepLength_PX, instance.y);
		      break;
		    case 3:
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y-=stepLength_PX);
		      break;
			case 4:
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y+=stepLength_PX);
		      break;
			default:
		}
	}


	$('#spawnBtn').click(function() {
		var randomX = Math.floor(Math.random() * (canvas.width - 1)) + 1;
		var randomY = Math.floor(Math.random() * (canvas.height - 1)) + 1;

		var rWI = new randomWalkInstance(randomX,randomY, getRandomColor());
		instances.push(rWI);
		numInstances++;

		$('#instances').html(numInstances);
	});

	$('#clearAllBtn').click(function() {
		instances.clear();

		context.clearRect(0, 0, canvas.width, canvas.height);
	});

	$('#increaseStepLengthBtn').click(function() {
		if (stepLength_PX >= 10) {
			return;
		}

		stepLength_PX++;
	});

	$('#decreaseStepLengthBtn').click(function() {
		if (stepLength_PX <= 1) {
			return;
		}

		stepLength_PX--;
	});
});