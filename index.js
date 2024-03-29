 const canvas=document.getElementById('game');
 const ctx=canvas.getContext('2d');

class SnakePart {
    constructor(x,y) {
    this.x=x;
    this.y=y;
    }
}
 let speed=7;
let tileCount=20;
tileSize=canvas.width/tileCount-2;
let headX=10;
let headY=10;
const snakeParts=[];
let tailLength=2;
let xVelocity=0;
let yVelocity=0;

let appleX=5;
let appleY=5;

let score=0;
const sound=new Audio("gulp.mp3");
 //game loop
 function drawGame() {
    changeSnakePosition();
    let result=isGameOver();
    if(result) {
        return;
    }

    clearScreen();
    checkAppleCollison();
    drawApple();
    drawSnake();
    drawScore();
    if(score >5) {
        speed=9;
    }
    if(score>8) {
        speed=12;
    }
    if(score>20) {
        speed=16
    }
    if(score>25) {
        speed=20
    }
    setTimeout(drawGame,1000/speed);
 }
function isGameOver() {
    let gameOver=false;
    if(xVelocity===0 &&yVelocity===0) {
        return false;
    }

    //walls
    if(headX<0 || headX==20 || headY<0 || headY==20) {
        gameOver=true;
    }
    for(let i=0;i<snakeParts.length;i++) {
        let part=snakeParts[i];
        if(part.x===headX && part.y===headY) {
            gameOver=true;
            break;
        }
    }
    if(gameOver) {
        ctx.fillStyle="white";
        ctx.font="50px Verdanna"
 ctx.fillText("Game Over",canvas.width/6.5,canvas.height/2);
    }
    return gameOver;
}
 function drawScore () {
    ctx.fillStyle="white";
    ctx.font="10px verdana";
    ctx.fillText("score"+score,canvas.width-50,10);
 }

 function clearScreen () {
    ctx.fillStyle='black';
    ctx.fillRect(0,0,canvas.width,canvas.height);
 }
 function drawSnake () {
    ctx.fillStyle='blue';
    for(let i=0;i<snakeParts.length;i++) {
        let part=snakeParts[i];
        ctx.fillRect(part.x*tileCount,part.y*tileCount,tileSize,tileSize);
    }
    snakeParts.push(new SnakePart(headX,headY));
    if(snakeParts.length>tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle='yellow';
    ctx.fillRect(headX*tileCount,headY*tileCount,tileSize,tileSize);
   
 }
function changeSnakePosition () {
    headX=headX+xVelocity;
    headY=headY+yVelocity;
}
function checkAppleCollison(){
    if(appleX==headX && appleY==headY) {
       appleX= Math.floor(Math.random()*tileCount);
       appleY=Math.floor(Math.random()*tileCount);
       tailLength++;
       score++;
       sound.play();
    }
}
function drawApple () {
    ctx.fillStyle='red';
    ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize);
}

 document.body.addEventListener('keydown',keyDown);
 function keyDown(event) {
    //up
    if(event.keyCode==38) {
        if(yVelocity==1) {
            return;
        }
        yVelocity=-1;
        xVelocity=0;
    }
    //down
    if(event.keyCode==40) {
        if(yVelocity==-1) {
            return;
        }
        yVelocity=1;
        xVelocity=0;
    }

    //left
    if(event.keyCode==37) {
        if(xVelocity==1) {
            return;
        }
        xVelocity=-1;
        yVelocity=0;
    }
    if(event.keyCode==39) {
        if(xVelocity==-1) {
            return;
        }
        xVelocity=1;
        yVelocity=0;
    }
 }

 drawGame();
