// Enemies our player must avoid
const Enemy = function(startx,starty,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.x = startx;
    this.y = starty;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x += (dt*this.speed);
  // Move enemies back to the start of the road when
  // they leave the canvas
  if (this.x >= 500) {
    this.x = -100;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
const Player = function() {
  this.sprite = "images/char-cat-girl.png"
  // Starting position
  this.x = 200;
  this.y = 380;
};

Player.prototype.update = function(dt) {
  // Check for enemy collision
  for (const enm of allEnemies) {
    // Reset player position in case of collision
    // IDEA: Add special 'Game Over' alert
    if (this.x < enm.x+30 && this.x > enm.x-30 && this.y < enm.y+30 && this.y > enm.y-30) {
      this.x = 200;
      this.y = 380;
    }
  }
};

Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyCode) {
  // React to keystrokes only when inside the canvas
  if (keyCode === 'left' && this.x != -2) {
    this.x -= 101;
  }
  if (keyCode === 'up') {
    this.y -= 83;
  }
  if (keyCode === 'right' && this.x != 402) {
    this.x += 101;
  }
  if (keyCode === 'down' && this.y != 380) {
    this.y += 83;
  }
  if (this.y === -35) {
    // Reset to start position when 'water' is reached
    // IDEA: Add special 'Game Completed!' alert
      this.x = 200;
      this.y = 380;
  }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// Instantiate enemies with x-position, y-position and speed
// as arguments

// IDEA: Implement different difficulty presets: the number
// and speed of instantiated enemy objects should change
// according to chosen difficulty.
const enm1 = new Enemy(-20,48,100);
const enm2 = new Enemy(-20,131,300);
const enm3 = new Enemy(-20,214,500);


const allEnemies = [enm1, enm2, enm3];
const player = new Player();

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
