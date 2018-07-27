// custom
// increase enemies by score
var score = 0;
var seconds = 0;
var minutes = 0;
var hours = 0;
let timer = document.querySelector(".clock");
//This is the close icon handler
 let closeicon = document.querySelector(".close");
//This is the modal handler
 let modal = document.getElementById("popup1")

 let modalloss = document.getElementById("popdown")
//let interval;



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

var playerCollide =0;
Enemy.prototype.checkCollision = function() {
	if(player.x < this.x + 80 &&
	player.x +80 > this.x &&
	player.y < this.y + 60 &&
	player.y + 60 > this.y){
		player.x = 202;
		player.y = 405;
		playerCollide += 1;
		
	}
	//this is to count the numbers of times that the player had collision with the bugs
	if(playerCollide === 5)	{
		//in this case, if the collisiongets to 5, then the game is over and the time is reported on the mdal panel
		gameOver();
		clearTimeout(t);
		finalTime = timer.innerHTML;// This stores the final time
		modalloss.classList.add("show"); // the dialog box shows up
		scoreDiv.innerHTML = 'Your score is: '+ score + ' You were hit :' + playerCollide +' times';
		document.getElementById("totalTime").innerHTML = finalTime;
		closePrompt();
	}
	updateDisplay();
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
var score = 0;
Player.prototype.handleInput = function(keyPress){
	
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
	startTimer();		
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

//This section listen to the input keyboard up and down arrow
/* *****************************************************************************/

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
//This section reste the player to the initial position -x and -y coordinates and then determines when the games ends
//The game ends when the score achieve 10 croses
/* *****************************************************************************/
Player.prototype.reset = function() {
    this.x = 202;
    this.y = 405;
	score += 1;	
	if(score === 10){
			gameOver();
		clearTimeout(t);
		finalTime = timer.innerHTML;
		modal.classList.add("show");
		scoreDiv.innerHTML = 'Your score is: '+ score + ' You were hit :' + playerCollide +' times';
		document.getElementById("totalTime").innerHTML = finalTime;
		closePrompt();
	}
};



//This section is calling different parts that makes up the gameover determinations
/* *****************************************************************************/

function gameOver(){
	seconds = 0; //when the player get to the river, after thee game is over, Everything here goes back to zero
    minutes = 0; 
	hours = 0;
    player.reset();
    updateDisplay();
}


/*
 * updates the on screen score display
 */
function updateDisplay() {
    scoreDiv.innerHTML = 'Your score is: '+ score + ' You were hit :' + playerCollide +' times';
}
//This section is for the restart button icon at the top of the game board
/* *****************************************************************************/
let restart = document.querySelector('.restart');
function resetCard (){
	restart.addEventListener('click', function() {
	score = 0; // when reste is selceted, the score board goes back to zero
	playerCollide =0; // when rest is selceted, the score for collision goes back to zero
	clearTimeout(t); // The clock is paused 
	seconds = 0; minutes = 0; hours = 0; //clock set back to zero
	scoreDiv.innerHTML = 'Your score is: '+ 0 + ' You were hit :' + 0 +' times';
	
	});
}

//This section is the time counter fuctionality
/* *****************************************************************************/
var t //Global variable for time
// I got this code from https://jsfiddle.net/Daniel_Hug/pvk6p/. 
//I want the time to stoop when the game is reset but I couldn't get it done: it smiply wouldn't stop

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
   timer.innerHTML = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + 
   (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + 
   (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}

function startTimer() {
    t = setTimeout(add, 1000);
}

//This section is for the dialog box functionality
/* *****************************************************************************/
function closePrompt(){
	closeicon.addEventListener("click", function(){
		resetCard ();
		modal.classList.remove("show");
		modalloss.classList.remove("show");
    });
}
// ths is the fuction where the replaybuttn on the modal dialog box is called
function playAgain(){
	resetCard();
	score = 0; // when reste is selceted, the score board goes back to zero
	playerCollide =0;
	scoreDiv.innerHTML = 'Your score is: '+ 0 + ' You were hit :' + 0 +' times';
	modal.classList.remove("show");
	modalloss.classList.remove("show");
	
}