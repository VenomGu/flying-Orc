document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');

    let birdLeft = 220;
    let birdBottom = 150;
    let gravity = 3;
    let isGameOver = false;
    let gap = 550;
    let updateCounter = document.getElementById('count');
    let counter = 0;
    let points = 0;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    let gameTimerId = setInterval(startGame, 20);

    // Function to control the bird jump
function jump() {
    if (birdBottom < 500) birdBottom += 50;
    bird.style.bottom = birdBottom + 'px';

    points += 25;
    document.getElementById('points').innerHTML = points;
    document.getElementById("points").style.fontSize = "50px"; // Fonte padrão

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

// Função para aplicar o efeito de aumentar fonte e cor, além de adicionar som
function triggerFontEffect(color, size, soundUrl) {
    // Aumenta o tamanho da fonte e muda a cor por 1 segundo
    let pointsElement = document.getElementById("points");
    
    // Audio de efeito especial
    const specialSound = new Audio(soundUrl);
    specialSound.play();

    // Modificando o estilo da fonte
    pointsElement.style.fontSize = size + "px";
    pointsElement.style.color = color;

    // Volta ao tamanho original após 1 segundo
    setTimeout(() => {
        pointsElement.style.fontSize = "50px"; // Retorna ao tamanho original
        pointsElement.style.color = "red";  // Retorna à cor original
    }, 1000);  // 1000ms = 1 segundo
}


    // Listen for keyboard input (Spacebar to jump)
    document.addEventListener('keyup', control);

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    // Add touch event listener for tap to jump
    document.addEventListener('touchstart', function() {
        jump(); // Trigger jump on touch
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
            obstacleLeft -= 10;
            
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';
            console.log("obstacleLeft",obstacleLeft);
            console.log("obstacleBottom",obstacleBottom);
            console.log("birdLeft",birdLeft);
            console.log("birdBottom",birdBottom);

            if (obstacleLeft === -100) {
                console.log('Obstacle removed');
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
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
        }, 20000000);
    }
});
