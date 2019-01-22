// Enemies our player must avoid
var valueOfY = [50,130,210];
var counter = 0;

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = valueOfY[Math.floor(Math.random() * 3)];
    this.speed = Math.floor(Math.random() * 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    
    if (this.x > 505) {
        this.x = -201;
        this.y = this.y + 83;
        this.speed = Math.floor(100 + (Math.random() * 200));

        // avoids enemy to allocate any Y location on grass rows
        if (this.y > 226) {
            this.y = 60;
        }
    }
    checkCollision(this, player);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.sprite = "images/char-boy.png";
    this.x = 200;
    this.y = 400;
    return this;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
Player.prototype.update = function() {
     // moving player in the direction button is pressed
    if (this.ctrlKey === 'left' && this.x !== 0) {
        this.x = this.x - 100;
    } else if (this.ctrlKey === 'right' && this.x != 400) {
        this.x = this.x + 100;
    } else if (this.ctrlKey === 'up') {
        this.y = this.y - 83;
    } else if (this.ctrlKey === 'down' && this.y != 400) {
        this.y = this.y + 83;
    }
    // setting value of ctlKey to null will give player a hop movement
    // otherwise, player will continue to move in the one direction
    // unless, change its direction of movement
    // player will never come to a stop
    this.ctrlKey = null;

    // reseting player location
    if (this.y < 60) {
        alert('You Won!\n' + '\n' + 'Resetting Game..');
        player.reset();
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key){
    this.ctrlKey = key;
};

// resetting Players location
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

var checkCollision = function(bug, you) {
    // check for collision between enemy and player
    // limited number of collisions allowed, else Game over
    if (!(bug.y + 83 < you.y ||
        bug.y > you.y + 83 ||
        bug.x + 100 < you.x ||
        bug.x > you.x + 100)) {
            counter = counter + 1;
            if(counter >= 5) {
                alert('Game Over!');
                counter = 0;
            }
            you.reset();
        }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var totalEnemies = 3;
var allEnemies = [];

for (var i = 0; i < totalEnemies; i++) {
    allEnemies.push(new Enemy());
}

var player = new Player();


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
