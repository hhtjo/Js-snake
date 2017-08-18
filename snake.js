class Snake {
	constructor(startPos){
		this.pos = [startPos];
		this.direction = 'left';
		this.last = [];
	}

	grow(){
		this.pos.push(this.last);
	}

	//Kalkulerer bevegelse i forhold til retingen
	move(){
		var x,y = 0;
		switch(this.direction){
			case 'left':
				x = -1;
				y = 0;
				break;
			case 'right':
				x = 1;
				y = 0;
				break;
			case 'up':
				x = 0;
				y = -1;
				break;
			case 'down':
				x = 0;
				y = 1;
		}
		this.pos.unshift([this.pos[0][0] + x, this.pos[0][1] + y]);
		this.last = this.pos.pop();

	}
}
