document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');

    let birdLeft = 220;
    let birdBottom = 150;
    let gravity = 3;
    let isGameOver = false;
    let gap = 550;
    let points = 0;
    let speed = 10;
    let finalScore = 0;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        increaseDificulty();
    }

    let gameTimerId = setInterval(startGame, 20);

function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';

    points += 25;
    document.getElementById('points').innerHTML = "Points: " + points;
    document.getElementById("points").style.fontSize = "50px"; 

    if (points == 1000 ) {
        triggerFontEffect("red", 70, 'sounds/get-tem.mp3');
    }

    if (points == 2000) {
        triggerFontEffect("blue", 80, 'sounds/get-tem.mp3');
    }

    if (points == 3000) {
        triggerFontEffect("green", 90, 'sounds/get-tem.mp3');
    }

    if (points == 4000) {
        triggerFontEffect("orange", 100, 'sounds/get-tem.mp3');
    }

    if (points == 5000) {
        triggerFontEffect("purple", 110, 'sounds/get-tem.mp3');
    }
}
function increaseDificulty() {
    if (points == 1000) {
        speed = 15;
    } else if (points == 2000) {
        speed = 20;
    } else if (points == 3000) {
        speed = 25;
    } else if (points == 4000) {
        speed = 30;
    } else if (points == 5000) {
        speed = 35;
    }
}

function triggerFontEffect(color, size, soundUrl) {
    let pointsElement = document.getElementById("points");
    
    const specialSound = new Audio(soundUrl);
    specialSound.play();

    pointsElement.style.fontSize = size + "px";
    pointsElement.style.color = color;

    setTimeout(() => {
        pointsElement.style.fontSize = "50px"; 
        pointsElement.style.color = "red";  
    }, 1000);  
}

    document.addEventListener('keyup', control);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    document.addEventListener('touchstart', function() {
        jump(); 
    });

    function generateObstacle() {
        let obstacleLeft = 2000;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');
        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }
        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);
        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -= speed;
            
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -100) {
                console.log('Obstacle removed');
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 300) ||
                birdBottom === 0
                
            ) {
                console.log('Game Over');
                gameOver();
                clearInterval(timerId);
            }
        }

        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) setTimeout(generateObstacle, 3000);
    }

    generateObstacle();

    function gameOver() {
        clearInterval(gameTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        ground.classList.add('ground');
        ground.classList.remove('ground-moving');

        const birdElement = document.querySelector('.bird');
        const birdLeft = birdElement.style.left;
        const birdBottom = birdElement.style.bottom;

        birdElement.style.display = 'none';

        const explosionGif = document.createElement('img');
        explosionGif.src = 'images/explosion.gif';
        explosionGif.alt = 'Explosion';
        explosionGif.classList.add('explosion');

        const skyElement = document.querySelector('.sky');
        explosionGif.style.position = 'absolute';
        explosionGif.style.left = birdLeft;
        explosionGif.style.bottom = birdBottom;

        skyElement.appendChild(explosionGif);

        const explosionSound = new Audio('sounds/explosion.mp3');
        explosionSound.play();

        setTimeout(() => {
            explosionGif.remove();
        }, 3000);

        setTimeout(() => {
            window.location.href = 'deathScreen.html';
        }, 2000);
    }
    

});
