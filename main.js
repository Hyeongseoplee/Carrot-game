'use strict'

const filed = document.querySelector('.game__field');
const playBTN = document.querySelector('.game__button');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const IMG_SIZE = 80;

let TIME_DURATION = 5; 

let started = false;

// field에 당근과 벌레 랜덤 배치

function initGame() {
    addItem('carrot', CARROT_COUNT, '/img/carrot.png');
    addItem('bug', BUG_COUNT, '/img/bug.png');
}

function addItem(className, count, src) {
    for(let i = 0; i < count; ++i) {
        const carrot = document.createElement('img');
        carrot.setAttribute('class', className);
        carrot.setAttribute('src', src);
        
        filed.appendChild(carrot);

        const x1 = 0;
        const y1 = 0;
        const x2 = filed.getBoundingClientRect().width - IMG_SIZE;
        const y2 = filed.getBoundingClientRect().height - IMG_SIZE; 
        
        function randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) - min)
        }

        const leftRandomNumber = randomNumber(x1, x2);
        const topRandomNumber = randomNumber(y1, y2);
        
        carrot.style.left = `${leftRandomNumber}px`;
        carrot.style.top = `${topRandomNumber}px`;
    }
}

// 게임 시작 & 정지 버튼

playBTN.addEventListener('click', () => {
    if(started) { // started = false
        startGame();
    } else {
        stopGame();
    }
});



function startGame() {
    filed.innerHTML = '';
    initGame();
    startTimer();
    updateScore(CARROT_COUNT);
}

function startTimer() {
    const interval = setInterval(() => {
            --TIME_DURATION;
            if(TIME_DURATION === 0) {
                clearInterval(interval);
            }
            gameTimer.innerHTML = `00:0${TIME_DURATION}`;
        }
    , 1000);
}

function updateScore(num) {
    gameScore.innerHTML = num;
}


