'use strict'

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const IMG_SIZE = 80;

const field = document.querySelector('.game__field');
const gamePlayBtn = document.querySelector('.game__button');
const playBtnIcon = document.querySelector('.fa-play');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');
const popUp = document.querySelector('.pop-up');
const popUpMessage = document.querySelector('.pop-up__message'); 
const refreshBtn = document.querySelector('.pop-up__refreshBtn');

const SHOWING = 'showing';
const HIDDEN = 'hidden';
const CARROT_CLASSNAME = 'carrot';
const BUG_CLASSNAME = 'bug';

let TIME_DURATION = 5;
let score = 0;
let timer;
let started = false; 

const bgMusic = new Audio('./sound/bg.mp3');
const gameWonSound = new Audio('./sound/game_win.mp3');
const alertClickSound = new Audio('./sound/bug_pull.mp3');
const carrotClickSound = new Audio('./sound/carrot_pull.mp3');
const gameLostSound = new Audio('./sound/carrot_pull.mp3');


field.addEventListener('click', (e) => {
    // 현재 started는 true.
    if(!started){ // started 가 false라면(=게임이 시작하지 않았다면)
        return // 더 이상의 함수 실행을 진행하지 않고 종료한다
    }
    const target = e.target;
    if(target.matches(".carrot")) {
        target.remove();
        score++;
        updateScoreBoard();
        carrotClickSound.play();
    if(score === CARROT_COUNT) {
        finishGame(true); // 이겼다.
    }
    }else if(target.matches(".bug")) {
        finishGame(false); // 졌다.
    }
})

gamePlayBtn.addEventListener('click', () => {
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});

function startGame() {
    started=true;
    bgMusic.play();
    bgMusic.currentTime = 0;
    initGame();
    showStopBtn();
    startTimer();
}

function stopGame() {
    started=false;
    gameLostSound.play();
    bgMusic.pause();
    stopGameTimer();
    hideGameBtn();
    showPopupMessage('retry');
}

function finishGame(win) {
    started = false;
    bgMusic.pause();
    if(win === true) {
        gameWonSound.play();
    }else{
        alertClickSound.play();

    }
    hideGameBtn();
    stopGameTimer();
    showPopupMessage(win ? 'YOU WIN' : 'YOU LOST');
}

function showStopBtn() {
    playBtnIcon.classList.remove('fa-play');
    playBtnIcon.classList.add('fa-stop');
    gamePlayBtn.classList.remove('hidden');
}

refreshBtn.addEventListener('click', () => {
    startGame();
    hiddenPopUp();
});

function initGame() {
    score=0;
    field.innerHTML = '';
    gameScore.innerHTML = CARROT_COUNT;
    addItem('carrot', CARROT_COUNT, '/img/carrot.png');
    addItem('bug', BUG_COUNT, '/img/bug.png');
}

function addItem(className, count, src) {
    for(let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', src);
        img.setAttribute('id',`${i}`);

        field.appendChild(img);

        const x1 = 0;
        const y1 = 0;
        const x2 = field.getBoundingClientRect().width - IMG_SIZE;
        const y2 = field.getBoundingClientRect().height - IMG_SIZE;

        function generateNumm(min, max) {
            return Math.ceil(Math.random() * ( max + min) - min);
        } 

        const leftPosition = generateNumm(x1, x2);
        const topPosition = generateNumm(y1, y2);
        
        img.style.left=`${leftPosition}px`;
        img.style.top=`${topPosition}px`;
    }
}

function startTimer() {
    let remainingTimeSec = TIME_DURATION;
    updateTimerText(remainingTimeSec);
    timer = setInterval(() => {
        if(remainingTimeSec <= 0) {
            clearInterval(timer);
            finishGame(score === CARROT_COUNT);
            bgMusic.pause();
            gameLostSound.play();
            return
        }
        updateTimerText(--remainingTimeSec);
    } ,1000);
}

function updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    gameTimer.innerHTML = `${addZero(minutes)}:${addZero(seconds)}`

    function addZero(number) {
        return number < 10 ? `0${number}` : number
    }
}

function updateScoreBoard() {
    gameScore.innerHTML=CARROT_COUNT - score;
}

function stopGameTimer() {
    clearTimeout(timer);
}

function hideGameBtn() {
    gamePlayBtn.classList.add(HIDDEN);
}

function hiddenPopUp() {
    popUp.classList.add(HIDDEN);
}

function showPopupMessage(text) {
    popUp.classList.remove(HIDDEN);
    popUp.classList.add(SHOWING);
    popUpMessage.innerHTML = text;
}

// 문제
// 1. 팝업 메시지 떠있는 동안 stop 버튼 hideen
// 2. 게임 시작하면 stop 버튼 showing