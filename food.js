class FoodController {
	constructor() {
		this.foodList = [];
	}
	generate(maxX,maxY) {
		var randomX = Math.floor(Math.random()*maxX);
		var randomY = Math.floor(Math.random()*maxY);
		this.foodList.push([randomX, randomY]);
	}
}
