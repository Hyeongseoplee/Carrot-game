'use strict'

const filed = document.querySelector('.game__field');
const gamePlayBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.timer');
const gameScore = document.querySelector('.score');
const gamePlayBtnIcon = document.querySelector('.fa-play');
const popUp = document.querySelector('.pop-up'); 

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const IMG_SIZE = 80;

let TIME_DURATION = 5;

// 게임이 시작 했다는 것을 알려주는 변수에 boolean 인 true(시작했다)값과 false(시작하지않았다)값을 넣어 줄 수 있다
let started = false; 

function startGame() {
    filed.innerHTML = '';
    initGame();
}

function initGame() {
    addItem('carrot', CARROT_COUNT, '/img/carrot.png');
    addItem('bug', BUG_COUNT, '/img/bug.png');
}

function addItem(className, count, src) {
    for(let i = 0; i < count; i++) {
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', src);
        img.setAttribute('id',`${i}`);

        filed.appendChild(img);

        const x1 = 0;
        const y1 = 0;
        const x2 = filed.getBoundingClientRect().width - IMG_SIZE;
        const y2 = filed.getBoundingClientRect().height - IMG_SIZE;

        function generateNumm(min, max) {
            return Math.ceil(Math.random() * ( max + min) - min);
        } 

        const leftPosition = generateNumm(x1, x2);
        const topPosition = generateNumm(y1, y2);
        
        img.style.left=`${leftPosition}px`;
        img.style.top=`${topPosition}px`;
    }
}

// function showStopBtn() {
//     gamePlayBtnIcon.classList.toggle('fa-stop');
// }

// function startTimer() {
//     const interval = setInterval(() => {
//             --TIME_DURATION;
//             if(TIME_DURATION === 0) {
//                 clearInterval(interval);
//             }
//             gameTimer.innerHTML = `00:0${TIME_DURATION}`;
//         }
//     , 1000);
// }

gamePlayBtn.addEventListener('click', () => {
    if(started) { // started = true라면 (게임이 시작했다면)
    } else {
        startGame();  // started = false라면 (게임이 시작했다면)
    }
    started = !started;
});
