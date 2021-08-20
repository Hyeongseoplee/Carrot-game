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
const SHOWING = 'showing';
const CARROT_CLASSNAME = 'carrot';
const BUG_CLASSNAME = 'bug';

let TIME_DURATION = 5;

// 게임이 시작 했다는 것을 알려주는 변수에 boolean 인 true(시작했다)값과 false(시작하지않았다)값을 넣어 줄 수 있다
let started = false; 

function startGame() {
    initGame();
    startTimer();
}

filed.addEventListener('click', (e) => {
    // 현재 started는 true.
    if(!started){ // started 가 false라면, 게임이 시작하지 않았다면
        return // 더 이상 함수 실행을 진행하지 않고 종료한다.
    }

    const target = e.target;
    if(target.matches(".carrot")) {
        target.remove();
    }else if(target.matches(".bug")) {
        popUp.classList.add(SHOWING);
        return
    }
})

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

        // filed.addEventListener('click', (e) => {
        //     const carrot = document.querySelector('.carrot');
        //     const target = e.target;
            
        //     if(target.className === CARROT_CLASSNAME) {
        //         console.dir(target) // 클릭된 요소 하나만 삭제
        //     }else if(e.target.className === BUG_CLASSNAME){
        //         console.log("What the..")
        //     }else {
        //         console.log("nothing")
        //     }
        // }
        //     )

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

function startTimer() {
    const timerId = setInterval(() => {
        TIME_DURATION--;
        if(TIME_DURATION === 0) {
            popUp.classList.add(SHOWING);
            clearInterval(timerId);
        }
        gameTimer.innerHTML=`00:0${TIME_DURATION}`
    } ,1000);
}


    function decreaseTime() {
        console.log(TIME_DURATION--);
    }

gamePlayBtn.addEventListener('click', () => {
    if(started) { // started = true라면 (게임이 시작했다면)

    } else {
        startGame();  // started = false라면 (게임이 시작했다면)
    }
    started = !started;
});
