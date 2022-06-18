const canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.4;
/**
 * Player class
 */
function Player() {
    this.position = {
        x: 100,
        y: 100,
    };
    this.velocity = {
        x: 0,
        y: 0,
    };
    this.width = 30;
    this.height = 30;
    this.jumping = false
}

Player.prototype.draw = function () {
    c.fillStyle = 'salmon';
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
};

Player.prototype.update = function () {
    this.draw();
    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    // landing and jumping logic
    if (this.position.y 
        + this.height 
        + this.velocity.y 
        <= canvas.height - 20) {
        this.velocity.y += gravity;
        this.jumping = true
    } else {
        this.velocity.y = 0
        this.jumping = false
    }
};

const player = new Player();

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.update();
    console.log('player vel', player.velocity.x)

    if (keys.left.pressed || keys.right.pressed) {
        if(Math.abs(player.velocity.x) > 15) {
            player.velocity.x -= player.velocity.x /5
            return;
        };
        if (keys.right.pressed) player.velocity.x += 2 
        if (keys.left.pressed) player.velocity.x += -2 
    } else {
        if (player.jumping) {
            player.velocity.x -= player.velocity.x / 10
        } else player.velocity.x -= player.velocity.x / 5
    }
    if (Math.abs(player.velocity.x) < 2) player.velocity.x = 0
}

animate();

const directions = { UP: 'UP', }

window.addEventListener('keydown', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            // player.velocity.x -=5
            keys.left.pressed = true
            if (player.velocity.x < 10){
            }
            break;
        case 68:
            console.log('right')
            // player.velocity.x +=5
            keys.right.pressed = true
            if (player.velocity.x < 10){
            }
            break;
        case 83:
            console.log('down')
            break;
        case 32:
            console.log('up')
            if (player.jumping === false) {
                player.velocity.y -= 10
                player.jumping = true 
            }
            break;
        default:
            break;
    }
})
window.addEventListener('keyup', ({keyCode}) => {
    switch (keyCode) {
        case 65:
            console.log('left')
            keys.left.pressed = false
            // player.velocity.x +=5
            if (player.velocity.x < 10){
            }
            break;
        case 68:
            console.log('right')
            keys.right.pressed = false
            // player.velocity.x -=5
            if (player.velocity.x < 10){
            }
            break;
        case 83:
            console.log('down')
            break;
        case 32:
            console.log('up')
            if (player.jumping === false) {
                player.velocity.y -= 10
                player.jumping = true 
            }
            break;
        default:
            break;
    }
})