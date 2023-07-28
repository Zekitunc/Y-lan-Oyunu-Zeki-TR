
const gameArea = document.querySelector('.Oyun');
const snakeElement = document.querySelector('.Yılan');
const foodElement = document.querySelector('.Yem');
const score = document.querySelector('.score')

const gridSize = 40;
const gridSizeInPixels = 790;
const speed = 120;


let snakeX = 0;
let snakeY = 0;
let snakeLength = 1;
let snakeDirection = 'right';
let snakeBody = [{ x: snakeX, y: snakeY }];


let foodX, foodY;

function generateFood() {
    foodX = Math.floor(Math.random() * gridSize) * gridSizeInPixels / gridSize;
    foodY = Math.floor(Math.random() * gridSize) * gridSizeInPixels / gridSize;
    foodElement.style.left = `${foodX}px`;
    foodElement.style.top = `${foodY}px`;
}


function moveSnake() {
    switch (snakeDirection) {
        case 'right':
            snakeX += gridSizeInPixels / gridSize;
            break;
        case 'left':
            snakeX -= gridSizeInPixels / gridSize;
            break;
        case 'up':
            snakeY -= gridSizeInPixels / gridSize;
            break;
        case 'down':
            snakeY += gridSizeInPixels / gridSize;
            break;
    }

    if (snakeX >= gridSizeInPixels) {
        snakeX = 0;
    } else if (snakeX < 0) {
        snakeX = gridSizeInPixels - gridSizeInPixels / gridSize;
    }

    if (snakeY >= gridSizeInPixels) {
        snakeY = 0;
    } else if (snakeY < 0) {
        snakeY = gridSizeInPixels - gridSizeInPixels / gridSize;
    }

    snakeElement.style.left = `${snakeX}px`;
    snakeElement.style.top = `${snakeY}px`;

    
    if (snakeX === foodX && snakeY === foodY) {
        snakeLength++;
        generateFood();
    }

    
    snakeBody.unshift({ x: snakeX, y: snakeY });
    if (snakeBody.length > snakeLength) {
        snakeBody.pop();
    }
    score.textContent = snakeLength;

    for (let i = 1; i < snakeBody.length; i++) {
        const segment = snakeBody[i];
        let segmentElement = document.querySelector(`[Yılan-segment="${i}"]`);

        if (!segmentElement) {
            segmentElement = document.createElement('div');
            segmentElement.setAttribute('Yılan-segment', i);
            segmentElement.classList.add('Yılan-segment');
            gameArea.appendChild(segmentElement);
        }

        segmentElement.style.left = `${segment.x}px`;
        segmentElement.style.top = `${segment.y}px`;
    }

    
}


function updateGame() {
    moveSnake();
    checkCollision();
}

//çakışma
function checkCollision() {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            alert('Game Over! Your score: ' + snakeLength);
            resetGame();
        }
    }
}


function resetGame() {
    snakeX = 0;
    snakeY = 0;
    snakeLength = 1;
    snakeDirection = 'right';
    snakeBody = [{ x: snakeX, y: snakeY }];
    snakeElement.style.left = `${snakeX}px`;
    snakeElement.style.top = `${snakeY}px`;
    generateFood();
    const segments = document.querySelectorAll('.Yılan-segment');
    segments.forEach(segment => segment.remove());
    
}

function handleKeyEvents(event) {
    switch (event.keyCode) {
        case 37:
            if (snakeDirection !== 'right')
                snakeDirection = 'left';
            break;
        case 38:
            if (snakeDirection !== 'down')
                snakeDirection = 'up';
            break;
        case 39:
            if (snakeDirection !== 'left')
                snakeDirection = 'right';
            break;
        case 40:
            if (snakeDirection !== 'up')
                snakeDirection = 'down';
            break;
    }
}



document.addEventListener('keydown', handleKeyEvents);
setInterval(updateGame, speed);
generateFood();
