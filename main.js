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

	var intervalIds = [];
	
	var steps = 0;

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
		      context.lineTo(instance.x-=1, instance.y);
		      context.stroke();
		      break;
  			case 2:
		      context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x+=1, instance.y);
		      context.stroke();
		      break;
		    case 3:
		      context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y-=1);
		      context.stroke();
		      break;
			case 4:
			  context.beginPath();
		      context.moveTo(instance.x, instance.y);
		      context.lineTo(instance.x, instance.y+=1);
		      context.stroke();
		      break;
			default:
		}
	}


	$('#spawnBtn').click(function() {
		var randomX = Math.floor(Math.random() * (751 - 50)) + 50;
		var randomY = Math.floor(Math.random() * (551 - 50)) + 50;

		var rWI = new randomWalkInstance(randomX,randomY);
		intervalIds.push(window.setInterval(function() {drawNewWalkPoint(rWI)}, 0));
	});

	$('#clearAllBtn').click(function() {
		while (intervalIds.length != 0) {
			window.clearInterval(intervalIds.pop());
		}

		context.clearRect(0, 0, canvas.width, canvas.height);
	});
});