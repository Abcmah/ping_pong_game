const canvas = document.querySelector('canvas')
const home = document.querySelector('.container-sm')
const ctx = canvas.getContext('2d')
const up = document.querySelector('.up')
const down = document.querySelector('.down')
const pc = document.querySelector('.pc');
const btns = document.querySelector('.touch');
const mobile = document.querySelector('.mobile');
let speedRate = 0.5;
let score =0;
let gameOver = false;
let chances = 3;
let highscore = false;
let gameRunning = false;
let mouse = true
let touch = true
let canvasH = canvas.height;
let canvasW= canvas.width;
let image = new Image()
let ball ={
    x:200,
    y:200,
    r:10,
    color:'#e81058',
    dx:2,
    dy:-1
}

let keyboard = false;

let leftPeddle ={
    x:0,
    y:150,
    width:10,
    height:70,
    dy:0,
    speed:5

}
let rightPeddle ={
    x:400 -10,
    y:150,
    width:10,
    height:70,
    dy:0

}

let gameover ={
    x:0,
    y:0,
    width:200,
    height:200,
    source:"asserts/GameOver.png"
}
let topBar={
    x:0,
    y:0,
    width:canvas.width,
    height:20

}
function restGame(){
     ball ={
        x:200,
        y:200,
        r:10,
        color:'brown',
        dx:2,
        dy:-1
    }

    leftPeddle ={
        x:0,
        y:150,
        width:10,
        height:70,
        dy:0,
        speed:5
    
    }
}
btns.style.display = 'none';
function superRest(){
    autoClosing();
    setTimeout(() => {
        window.location.reload();
        home.style.display = 'flex';
        btns.style.display = 'none';
        
    }, 3000);
    
    
}
screenSize()
function screenSize(){
    if(visualViewport.width < 600){
        mouse = false;
        touch = true;
    }
    else{
        mouse=true
        btns.style.display='none';
        touch = false;
    }
}
function restHS(){
localStorage.setItem('sData',0)
}

function autoClosing(){
    setTimeout(() => {
        window.close();
    },10000)
}
function drawBall(){
    ctx.beginPath()
    ctx.fillStyle = ball.color
    ctx.arc(ball.x,ball.y,ball.r,2*Math.PI,false)
    ctx.fill();
    ctx.closePath()
}
function drawTopBar(){
    ctx.beginPath()
    ctx.fillStyle ="#9fa6a5"
    ctx.rect(topBar.x,topBar.y,topBar.width,topBar.height)
    ctx.fill()
    ctx.closePath()
}
function drawLeftPeddle(){
    ctx.beginPath()
    ctx.fillStyle='#03010d';
    ctx.rect(leftPeddle.x,leftPeddle.y,leftPeddle.width,leftPeddle.height)
    ctx.fill();
    ctx.closePath()
}

function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function showScore(){
    ctx.beginPath()
    ctx.fillStyle ="#4e4e52"
    ctx.font = "12px Arial";
    ctx.fillText('Score:'+score,15,15)
    ctx.fill()
    ctx.closePath()

}

function moveLeftPeddle(){
    if(mouse){
        document.addEventListener('mousemove', e => {
            leftPeddle.y = e.screenY -200
            //leftPeddle.y = ball.y - rightPeddle.height /2;
        })
    }
   
if(keyboard){
    leftPeddle.y += leftPeddle.dy;
}
if(touch){
    leftPeddle.y += leftPeddle.dy;
}

}

function moveRightPeddle(){
    rightPeddle.y = ball.y - rightPeddle.height /2;
}

function drawRightPeddle(){
    ctx.beginPath()
    ctx.fillStyle = '#03010d'
    ctx.rect(rightPeddle.x,rightPeddle.y,rightPeddle.width,rightPeddle.height)
    ctx.fill()
    ctx.closePath()

}

function collision(){
    // ball collision

    // right peddle
    if(ball.x > rightPeddle.x-rightPeddle.width){
        ball.dx *= -1;
    }

    // down wall
    if(ball.y > canvas.height-10){
        ball.dy *=-1;
    }
    // up 
    if(ball.y < topBar.height+10){
        ball.dy *=-1;
    }
// left peddle

    if(ball.x < leftPeddle.x + leftPeddle.width+10 && ball.y > leftPeddle.y && ball.y < leftPeddle.y + leftPeddle.height){
        ball.dx *= -1;
        ball.dx += speedRate;
        ball.dy+=speedRate;
        score++;
      
    }

    // gameover
    if(ball.x < 0){
        if(chances<2){
            gameOver = true;
            drawGameOver();
            stop();
        
        }
        else{
            chances--;
            restGame()
        }
    }
if(rightPeddle.y < 20){
    rightPeddle.y = 20
    
}
if(leftPeddle.y < 20){
    leftPeddle.y=20
}
if(rightPeddle.y+rightPeddle.height > canvasH){
  rightPeddle.y = canvasH-rightPeddle.height;
}
if(leftPeddle.y+rightPeddle.height > canvasH){
  leftPeddle.y = canvasH-leftPeddle.height;
}
}
function drawTrials(){
    ctx.beginPath()
    ctx.fillStyle ="red"
    ctx.font = "12px Arial";
    ctx.fillText('❤ :'+chances,180,13)
    ctx.fill()
    ctx.closePath()
}
function drawGameOver(){
    if(gameOver){
        image.src = gameover.source;
        ctx.drawImage(image,0,0,canvas.width,canvas.height)
        stop();
        ctx.beginPath();
        ctx.fillStyle ="#edd21f";
        ctx.font = "30px Arial";
        ctx.fillText('Your is score: '+score,100,280);
        ctx.fill();
        ctx.closePath();
        setHighScore();
        newHighScore();
    } 
    
}

function storeScore(score){
    localStorage.setItem('sData',score)
}

function newHighScore(){
    if(highscore){
        ctx.beginPath();
        ctx.fillStyle ="#14b58a";
        ctx.font = "20px Arial";
        ctx.fillText('New Highscore: '+score,120,315);
        ctx.fill();
        ctx.closePath();
       
    }
    
}
function showHighScore(){
    let sData = localStorage.getItem("sData")
    ctx.beginPath()
    ctx.fillStyle ="#4e4e52"
    ctx.font = "12px Arial";
    ctx.fillText('highscore:'+sData,320,15)
    ctx.fill()
    ctx.closePath()
}
function setHighScore(){
    scoreInt = parseInt(score);
    let sData = localStorage.getItem("sData")
    
    if(sData != null){
        sDataInt = parseInt(sData);
        if(scoreInt > sDataInt){
            highscore = true;
            newHighScore();
            storeScore(scoreInt);
            
        }
           
    }
    else{
        storeScore(scoreInt)

    }
    
   
}



function stop(){
setTimeout(() => {
    gameRunning =false;
    superRest();
}, 300);
}


function wrapper(){
    if(gameRunning){
        startGame()
     
     
     function startGame(){
         ctx.clearRect(0,0,canvas.width,canvas.height)
         drawBall()
         moveBall()
         drawTopBar()
         drawLeftPeddle()
         screenSize();
         moveLeftPeddle()
         drawRightPeddle()
         moveRightPeddle()
         collision()
         showScore();
         drawTrials();
         showHighScore()
         drawGameOver()
         keysNavigation();
         touchNavigation()
         if(gameRunning){
             requestAnimationFrame(startGame);
         }
         
     }
     }
}

function intGame(){
    gameRunning = true;
    restGame();
    canvas.style.display = "flex";
    home.style.display ="none";
    mobile.style.display="none"
    btns.style.display="flex"
    wrapper();
}
function quit(){
    close();
    console.log('closing')
}

function moveUp(){
    leftPeddle.dy = -leftPeddle.speed
}
function moveDown(){
    leftPeddle.dy = leftPeddle.speed;
}

function keyDown(e){
    keyboard = true;
    if(e.key == 'ArrowUp'){
        moveUp()
    }
    if(e.key == 'ArrowDown'){
        moveDown()
    }
}

function keyUp(){
    leftPeddle.dy =0;
}
function touchNavigation(){
    
    up.addEventListener('mousedown',moveUp);
    down.addEventListener('mouseup',keyUp);
    up.addEventListener('mouseup',keyUp);
    down.addEventListener('mousedown',moveDown);
    
}
function keysNavigation(){
    document.addEventListener('keydown',keyDown,false);
    document.addEventListener('keyup',keyUp,false);
}