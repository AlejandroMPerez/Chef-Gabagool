
const canvas = document.querySelector("canvas"); //Targeting the canvas in index.html.
const ctx = canvas.getContext("2d"); //Creating the canvas and setting it to 2 dimensional.
canvas.width = innerWidth; //Setting the canvas to the width of the screen.
canvas.height = innerHeight; //Setting the canvas to the height of the screen.
const w = canvas.width;
const h = canvas.height;


class Player { //This Player method defines the square.
    constructor(x, y, w, h) {
        this.x = x; //X position
        this.y = y; //Y position
        this.w = w; //Rect. width
        this.h = h; //Rect. height
    }  
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
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) 
        ctx.fillStyle = this.color 
        ctx.fill() 
        ctx.closePath()
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }
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
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false) 
        ctx.fillStyle = this.color 
        ctx.fill() 
        ctx.closePath()
    }

    update() {
        this.x = this.x + this.velocity.x
        this.y = this.y + this.velocity.y
    }

}


//Player
let player = new Player (w/2, h/2, 60, 90)

const playerImage = new Image();
playerImage.src = "/Images/Italian Chef.png"
playerImage.onload = function () {
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)
}

//Projectile
let projectilesArr = []

//Enemies
let enemiesArr = []

function spawnEnemies() {
    
    setInterval(() => {

        let randomNumberGenerator = Math.floor(Math.random() * 4);

        let randomX;
        let randomY;

        const angle = Math.atan2(randomY - (h/2 + player.h/2), randomX - (w/2 + player.w/2)) //Provides the angle between the enemy and the players center position

        const velocity = {
        x: Math.cos(angle), //Gets the velocity on the x axis.
        y: Math.sin(angle) //Gets the velocity on the y axis.
        }

        switch (randomNumberGenerator) {

            case 0:
                if (randomNumberGenerator === 0) 
                    randomX = 0;
                    randomY = Math.random() * h;
                    enemiesArr.push(new Enemies(randomX, randomY, 10, "black", velocity))
                break;
            case 1:
                if (randomNumberGenerator === 1) 
                    randomX = Math.random() * w;
                    randomY = 0;
                    enemiesArr.push(new Enemies(randomX, randomY, 10, "black", velocity))
                break;
            case 2:
                if (randomNumberGenerator === 2) 
                    randomX = w;
                    randomY = Math.random() * h;
                    enemiesArr.push(new Enemies(randomX, randomY, 10, "black", velocity))
                break;
            case 3:
                if (randomNumberGenerator === 3) 
                    randomX = Math.random() * w;
                    randomY = h;
                    enemiesArr.push(new Enemies(randomX, randomY, 10, "black", velocity))
                break;
        }

    }, 1000)
}




//Animation Frame
function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, w, h)
    ctx.drawImage(playerImage, player.x, player.y, player.w, player.h)

    //Projectile
    projectilesArr.forEach((projectile) => { 
        projectile.draw(), projectile.update()
    })

    //Enemies
    enemiesArr.forEach((enemies) => {
        enemies.draw(), enemies.update()
    })
}


//Click Event
addEventListener("click", (event) => {

   const angle = Math.atan2(event.clientY - (h/2 + player.h/2), event.clientX - (w/2 + player.w/2)) //Provides the angle between where you click and the pojectiles center position

   const velocity = {
       x: Math.cos(angle), //Gets the velocity on the x axis.
       y: Math.sin(angle) //Gets the velocity on the y axis.
   }

   projectilesArr.push(new Projectile((w/2) + (player.w/2), (h/2 + player.h/2), 5, "red", velocity))
})


animate()
