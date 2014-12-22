function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function randomWalkInstance(x,y) {
	this.x = x;
	this.y = y;
	this.color = getRandomColor();
}

$(document).ready(function() {
	var canvas = document.getElementById("mainCanvas");
	var context = canvas.getContext('2d');

	var stepLength_PX = 1;
	var intervalIds = [];
	
	var steps = 0;
	var instances = 0;

	function drawNewWalkPoint(instance) {
		// Pick left right bottom or top
        var direction = Math.floor(Math.random() * (5 - 1)) + 1;
      	context.strokeStyle = instance.color;
      	steps++;

      	$('#steps').html(steps);

		// Move
		switch(direction) {
			case 1:
		      context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x-=stepLength_PX, instance.y);
		      context.stroke();
		      break;
  			case 2:
		      context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x+=stepLength_PX, instance.y);
		      context.stroke();
		      break;
		    case 3:
		      context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y-=stepLength_PX);
		      context.stroke();
		      break;
			case 4:
			  context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y+=stepLength_PX);
		      context.stroke();
		      break;
			default:
		}
	}


	$('#spawnBtn').click(function() {
		var randomX = Math.floor(Math.random() * (canvas.width - 1)) + 1;
		var randomY = Math.floor(Math.random() * (canvas.height - 1)) + 1;

		var rWI = new randomWalkInstance(randomX,randomY);
		instances++;

		$('#instances').html(instances);

		intervalIds.push(window.setInterval(function() {drawNewWalkPoint(rWI)}, 0));
	});

	$('#clearAllBtn').click(function() {
		while (intervalIds.length != 0) {
			window.clearInterval(intervalIds.pop());
		}

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