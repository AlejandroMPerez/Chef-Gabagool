window.onload = () => {
    document.getElementById("startGameButton").onclick = () => {
      startGame();
    };

const canvas = document.querySelector("canvas"); 
const ctx = canvas.getContext("2d"); 
canvas.width = innerWidth; 
canvas.height = innerHeight; 
const w = canvas.width;
const h = canvas.height;

class Player { 
    constructor(x, y, w, h) {
        this.x = x; 
        this.y = y; 
        this.w = w; 
        this.h = h; 
    }  
}

//Projectile Image
const projectileImage = new Image();
projectileImage.src = "Images/Tomatoe.svg"
projectileImage.onload = function () {
    ctx.imageSmoothingEnabled = true;
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

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
}

//Player
let player = new Player (w/2, h/2, 90, 90)

const playerImage = new Image();
playerImage.src = "Images/Chef.png"
playerImage.onload = function () {
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)
}

let projectilesArr = []

let enemies = new Enemies();
let enemiesArr = []

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
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) 
                    velocity = {
                        x: Math.cos(angle) * 1.5, //Gets the velocity on the x axis.
                        y: Math.sin(angle) * 1.5 //Gets the velocity on the y axis.
                    }
                    enemiesArr.push(new Enemies(x, y, 10, "black", velocity))
                break;
            case 1:
                    x = Math.random() * w;
                    y = 0;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) 
                    velocity = {
                        x: Math.cos(angle) * 1.5, 
                        y: Math.sin(angle) * 1.5 
                    }
                    enemiesArr.push(new Enemies(x, y, 10, "black", velocity))
                break;
            case 2:
                    x = w;
                    y = Math.random() * h;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) 
                    velocity = {
                        x: Math.cos(angle) * 1.5, 
                        y: Math.sin(angle) * 1.5 
                    }
                    enemiesArr.push(new Enemies(x, y, 10, "black", velocity))
                break;
            case 3:
                    x = Math.random() * w;
                    y = h;
                    angle = Math.atan2((h/2 + player.h/2) - y, (w/2 + player.w/2) - x) 
                    velocity = {
                        x: Math.cos(angle) * 1.5, 
                        y: Math.sin(angle) * 1.5 
                    }
                    enemiesArr.push(new Enemies(x, y, 10, "black", velocity))
                break;
        }
    }, 2600)
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

let game;
let score = 0;
const scoreEl = document.getElementById("scoreEl")

function animate() {
    game = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)
    
    projectilesArr.forEach((projectile, index) => { 
        projectile.draw(), projectile.update()

        if (projectile.x + projectile.radius < 0 ||
            projectile.x - projectile.radius > w ||
            projectile.y + projectile.radius < 0 ||
            projectile.y - projectile.radius > h) 
            {
                projectilesArr.splice(index, 1)
            }
    }) 

    
    let lose = false
    enemiesArr.forEach((enemy, enemyIndex) => {
        enemy.draw();
        enemy.update();

        let playerDidCollide = playerDetectCollision(player, enemy)
        
        if (playerDidCollide === true) {
            lose = true
        }

        projectilesArr.forEach((projectile, projectileIndex) => {

            let projectileDidCollide = projectileDetectCollision(projectile, enemy);

            if (projectileDidCollide) {
                score += 25
                scoreEl.innerHTML = score
                enemiesArr.splice(enemyIndex, 1)
                projectilesArr.splice(projectileIndex, 1)
            }
        }) 
    })
    if (lose === true) {
        gameOver()
    }
}


addEventListener("click", (event) => {
    
   const angle = Math.atan2(event.offsetY - (h/2 + player.h/2), event.offsetX - (w/2 + player.w/2)) 

   const velocity = {
       x: Math.cos(angle)* 3, 
       y: Math.sin(angle) * 3 
   }

   projectilesArr.push(new Projectile((w/2 + player.w/2), (h/2 + player.h/2), 10, "red", velocity))
})


function gameOver() {
    gameOn = false;
    window.cancelAnimationFrame(game)
    projectilesArr=[]
    enemiesArr = []
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, w, h)
    ctx.font = "50px sans-serif";
    ctx.fillStyle = "white"
    ctx.fillText("FINE PARTITA", 600, 300)
    ctx.font = "50px sans-serif";
    ctx.fillText(`Final Score: ${score}`, 580, 400)
    ctx.font = "50px sans-serif";
    ctx.fillText("Click Start Button To Play Again", 445, 500)
}
}



