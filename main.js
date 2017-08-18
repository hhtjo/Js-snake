var canvas = document.getElementById('canvas');
var canvas2d = canvas.getContext('2d');
var tileSize = 20;
var score = 0;
var size = [canvas.height, canvas.width];

var snake = new Snake(Math.floor(size[0]/tileSize/2), Math.floor(size[1]/tileSize/2));
var foodController = new FoodController;

//sets fill to black
canvas2d.fillStyle = "#000000";

setInterval(function(){
	foodController.generate(size[0]/tileSize, size[1]/tileSize);
}, 1000);
//call render every 0.25 second
setInterval(render, 100);

//place snake in middle
function render() {
	//clear last frame
	canvas2d.clearRect(0,0,size[0],size[1]);
	//snake.pos.forEach(function(currentPos){
		//canvas2d.clearRect(currentPos[0]*tileSize, currentPos[1]*tileSize, tileSize, tileSize );
	//});
	//canvas2d.clearRect(0,0,5,15);
	snake.move();
	foodController.foodList.forEach(function(currentFood){
		if ((snake.pos[0][0] === currentFood[0]) && (snake.pos[0][1] === currentFood[1])) {
			snake.eat();
			var del = foodController.foodList.indexOf(currentFood);
			foodController.foodList.splice(del, 1);
			score += 100;

		}
		canvas2d.fillStyle = "#FF0000";
		canvas2d.fillRect(currentFood[0]*tileSize, currentFood[1]*tileSize, tileSize, tileSize);
		canvas2d.fillStyle = "#000000";
	})

	//draw each part of snake
	snake.pos.forEach(function(currentPos){
		//if inside frame
		if ((currentPos[0] >= 0 && currentPos[0] < size[0]/tileSize) && (currentPos[1] >= 0 && currentPos[1] < size[1]/tileSize)){
			canvas2d.fillRect(currentPos[0]*tileSize, currentPos[1]*tileSize, tileSize, tileSize);
		} else {
			//die
			reset();
		}
	});
	var i = 1;
	snake.pos.forEach(function(currentPos){
		if (i!=1){ //if not the head
			if ((snake.pos[0][0] === currentPos[0]) && (snake.pos[0][1] === currentPos[1])){
				//die
				reset();
			}
		}
		i++;
	})

	canvas2d.font = "18px Arial";
	canvas2d.fillText("Score: " +score,5,15);
}

document.addEventListener('keypress', keyHandler);

/*Sjekker tastetrykk*/
function keyHandler (event){
	switch(event.which) {
		case 119:
			snake.direction = 'up';
			break;
		case 115:
			snake.direction = 'down';
			break;
		case 97:
			snake.direction = 'left';
			break;
		case 100:
			snake.direction = 'right';
			break;
	}
}

/* fjerner alle elementer i canvas
	og starter på nytt */
function reset(){
	snake.pos = [[Math.floor(size[0]/tileSize/2), Math.floor(size[1]/tileSize/2)]];
	foodController.foodList = [];
	score = 0;
	canvas2d.clearRect(0,0,size[0], size[1]);
}
