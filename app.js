
document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')
    const gameDisplay = document.querySelector('.game-container')
    const ground = document.querySelector('.ground-moving')

    let birdLeft = 220;
    let birdBottom = 150;
    let gravity = 3;
    let isGameOver = false;
    let gap = 430;
    let updateCounter = document.getElementById('count');
    let counter = 0;

    function count() {
    if (counter < 4) {
    updateCounter.innerHTML = counter;
    counter++;
    setTimeout(count, 1000);
    } else {
    if (counter === 4) {
        updateCounter.innerHTML = "Go!";
    }
    }
    window.location.href = 'index.html';
    startGame();
}

    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -60) {
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === 0 
                ) {
                gameOver()
                clearInterval(timerId)
            }
        }
        let timerId = setInterval(moveObstacle, 20) 
        if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()

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
    }, 2000);  

    setTimeout(() => {
        window.location.href = 'deathScreen.html';
    }, 2000);  
}
})
