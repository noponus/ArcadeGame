// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.x = x;
	this.y = y;
	this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	// You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computer
	this.x += this.speed * dt;
	
	if(this.x > 510){
		this.x = -50;
		this.speed = 100 + Math.floor(Math.random()* 222);	
	 }
	 this.checkCollision();
	 
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
var coll =0;
Enemy.prototype.checkCollision = function() {
	if(player.x < this.x + 80 &&
	player.x +80 > this.x &&
	player.y < this.y + 60 &&
	player.y + 60 > this.y){
		player.x = 202;
		player.y = 405;
		coll += 1;
		updateDisplay();
	}
};


// Now write your own player class
var Player = function(x, y) {
	this.x = x;
	this.y = y;
	this.player = 'images/char-boy.png';
}

// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
};

Player.prototype.render = function() {
 ctx.drawImage(Resources.get(this.player), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress){
	startTimer();
	if(keyPress == 'left' && this.x > 0){
		this.x -= 102;
	}
	if(keyPress == 'right' && this.x < 405){
		this.x += 102;
	}
	if(keyPress == 'up' && this.y > 0){
		this.y -= 83;
	}
	if(keyPress == 'down' && this.y < 405){
		this.y +=83;
	}
	if(this.y <0) {
		setTimeout(function() {
			player.x= 202;
			player.y = 405;
			
		}, 600);
		gameOver();
		
	}

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies 

var scoreDiv = document.createElement('div');
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);


var allEnemies = [];
[63, 147, 230].forEach(function(locationY){
	enemy = new Enemy(0, locationY, 200);
	allEnemies.push(enemy);
	});


// Place the player object in a variable called player
var player = new Player(202, 405);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
	player.handleInput(allowedKeys[e.keyCode]);
	
});

Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
};

// custom
// increase enemies by score
var score = 0;
let seconds = 0,
    minutes = 0;
let timer = document.querySelector(".clock");
let interval;

/*
 * resets the game in case of collision
 */
 function gameMessage(){
	 if(score == 3){
		 alert("You Won!! Congratulation, Your score is " + score +' You were hit: ' + coll +' times' );
	 } 
 }

/*
 * game over successfully (reached water)
 */
function gameOver() {
	seconds = 0,
    minutes = 0;
	stopTimer();
    player.reset();
    score += 1;
    updateDisplay();
	resetCard ();
	gameMessage();
	
}

/*
 * updates the on screen score display
 */
function updateDisplay() {
    scoreDiv.innerHTML = 'Your score is: '+ score + ' You were hit :' + coll +' times';
}
let restart = document.querySelector('.restart');
function resetCard (){
	restart.addEventListener('click', function() {
	score = 0;
	coll =0;
	minutes = 0;
	seconds= 0;
	scoreDiv.innerHTML ='Your score is:' + 0 +' You were hit: ' + 0 +' times';
	timer.innerHTML = 0+ 'min' +  0 + 'sec';
	stopTimer();	
	});
}



function startTimer() {
    interval = setInterval(function() {
        timer.innerHTML = minutes + "mins " + seconds + "secs";
        seconds++;
        if (seconds == 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes == 60) {
            hour++;
            minutes = 0;
        }
    }, 200);
}
//stop timer
function stopTimer() {
    clearInterval(interval);
	return stopTimer;
}