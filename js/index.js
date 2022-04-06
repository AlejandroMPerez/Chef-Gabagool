window.onload = () => {
    document.getElementById("startGameButton").onclick = () => {
      startGame();
    };


const canvas = document.querySelector("canvas"); //Targeting the canvas in index.html.
const ctx = canvas.getContext("2d"); //Creating the canvas and setting it to 2 dimensional.
canvas.width = innerWidth; //Setting the canvas to the width of the screen.
canvas.height = innerHeight; //Setting the canvas to the height of the screen.
const w = canvas.width;
const h = canvas.height;

//const startGameButton = document.getElementById("startGameButton")


class Player { //This Player method defines the square.
    constructor(x, y, w, h) {
        this.x = x; //X position
        this.y = y; //Y position
        this.w = w; //Rect. width
        this.h = h; //Rect. height
    }  
}

//Projectile Image
const projectileImage = new Image();
projectileImage.src = "Images/Tomatoe.svg"
projectileImage.onload = function () {
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(projectileImage, projectile.x, projectile.y, projectile.radius)
}

class Projectile {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        ctx.drawImage(projectileImage, this.x, this.y, 20, 20)
    }

    //To go back to a basic circle, uncomment.
    // draw() {
    //     ctx.beginPath()
    //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) 
    //     ctx.fillStyle = this.color 
    //     ctx.fill() 
    //     ctx.closePath()
    // }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//Enemies Image
const enemiesImage = new Image();
enemiesImage.src = "Images/Spaghetti.svg"
enemiesImage.onload = function () {
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(enemiesImage, enemies.x, enemies.y, enemies.radius)
}

class Enemies {
    constructor(x, y, radius, color, velocity)  {
        this.x = x; 
        this.y = y; 
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }  

    draw() {
        ctx.drawImage(enemiesImage, this.x, this.y, 30, 30)
    }

    //To go back to a basic circle, uncomment.
    // draw() {
    //     ctx.beginPath()
    //     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) 
    //     ctx.fillStyle = this.color 
    //     ctx.fill() 
    //     ctx.closePath()
    // }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}


//Player
let player = new Player (w/2, h/2, 70, 70)

const playerImage = new Image();
playerImage.src = "Images/Chef.svg"
playerImage.onload = function () {
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)
}

//Projectile


let projectilesArr = []


//Enemies
let enemies = new Enemies();

let enemiesArr = []

console.log(enemiesArr)

function spawnEnemies() {
    
    setInterval(() => {

        let randomNumberGenerator = Math.floor(Math.random() * 4);

        let x;
        let y;

        let angle; 
        let velocity;

        switch (randomNumberGenerator) {

            case 0:
                    x = 0;
                    y = Math.random() * h;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) //Provides the angle between the enemy and the players center position
                    velocity = {
                        x: Math.cos(angle) * 2, //Gets the velocity on the x axis.
                        y: Math.sin(angle) * 2 //Gets the velocity on the y axis.
                    }
                    enemiesArr.push(new Enemies(x, y, 30, "black", velocity))
                break;
            case 1:
                    x = Math.random() * w;
                    y = 0;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) //Provides the angle between the enemy and the players center position
                    velocity = {
                        x: Math.cos(angle), //Gets the velocity on the x axis.
                        y: Math.sin(angle) //Gets the velocity on the y axis.
                    }
                    enemiesArr.push(new Enemies(x, y, 30, "black", velocity))
                break;
            case 2:
                    x = w;
                    y = Math.random() * h;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) //Provides the angle between the enemy and the players center position
                    velocity = {
                        x: Math.cos(angle), //Gets the velocity on the x axis.
                        y: Math.sin(angle) //Gets the velocity on the y axis.
                    }
                    enemiesArr.push(new Enemies(x, y, 30, "black", velocity))
                break;
            case 3:
                    x = Math.random() * w;
                    y = h;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) //Provides the angle between the enemy and the players center position
                    velocity = {
                        x: Math.cos(angle), //Gets the velocity on the x axis.
                        y: Math.sin(angle) //Gets the velocity on the y axis.
                    }
                    enemiesArr.push(new Enemies(x, y, 30, "black", velocity))
                break;
        }
    }, 2000)
}


function projectileDetectCollision(projectile, enemy) {
    if (
        projectile.x < enemy.x + enemy.radius &&
        projectile.x + projectile.radius > enemy.x &&
        projectile.y < enemy.y + enemy.radius &&
        projectile.y + projectile.radius > enemy.y
    ) {
      return true;
    } else {
      return false;
    }
}


function playerDetectCollision(player, enemy) {

    let distX = Math.abs(enemy.x - player.x - player.w/2);
    let distY = Math.abs(enemy.y - player.y - player.h/2);
    
    if ((distX > (player.w/2 + enemy.radius)) || (distY > (player.h/2 + enemy.radius))) {
      return false;
    } else if ((distX <= (player.w/2)) || (distY <= (player.h/2))) {
      return true;
    }
}


//Start Game
let gameOn = false;
function startGame() {
    if (gameOn === false) {
        gameOn = true;
        projectilesArr = []
        enemiesArr = []
        score = 0
        scoreEl.innerHTML = score
        animate()
        spawnEnemies()
    }    
}

//Animation
let game;
let score = 0;
const scoreEl = document.getElementById("scoreEl")

function animate() {
    game = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)
    
    //Projectile
    projectilesArr.forEach((projectile, index) => { 
        projectile.draw(), projectile.update()

        //If projectile exits the canvas space, remove from array.
        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > w ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > h) 
            {
                projectilesArr.splice(index, 1)
            }
    }) 
    
    //Enemies
    enemiesArr.forEach((enemy, enemyIndex) => {
        enemy.draw();
        enemy.update();

        //If player and enemy collide, end game.
        let playerDidCollide = playerDetectCollision(player, enemy)
        
        if (playerDidCollide === true) {
            gameOver()
        }

        //If projectiles and enemy collide, remove from screen
        projectilesArr.forEach((projectile, projectileIndex) => {

            let projectileDidCollide = projectileDetectCollision(projectile, enemy);

            if (projectileDidCollide) {
                score += 100
                scoreEl.innerHTML = score
                enemiesArr.splice(enemyIndex, 1)
                projectilesArr.splice(projectileIndex, 1)
            }
        }) 
    })
}


//Click Event
addEventListener("click", (event) => {

   const angle = Math.atan2(event.clientY - (h/2 + player.h/2), event.clientX - (w/2 + player.w/2)) //Provides the angle between where you click and the pojectiles center position

   const velocity = {
       x: Math.cos(angle)* 3, //Gets the velocity on the x axis.
       y: Math.sin(angle) * 3 //Gets the velocity on the y axis.
   }

   projectilesArr.push(new Projectile((w/2 + player.w/2), (h/2 + player.h/2), 5, "red", velocity))
})


//Game Over
function gameOver() {
    gameOn = false;
    cancelAnimationFrame(game)
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h)
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "white"
    ctx.fillText("GAME OVER", 600, 300)
    ctx.font = "35px sans-serif";
    ctx.fillText(`Final Score: ${score}`, 643, 400)
}

}


