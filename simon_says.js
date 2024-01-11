let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"]

let level = 0;
let highestScore = 0;
let isStarted = false;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!isStarted) {
        isStarted = true;

        levelUp();
    }
});

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(() => {
        btn.classList.remove("game-flash");
    }, 250);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", buttonPress);
}

function buttonPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkSeq(userSeq.length - 1);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 250);
}

function checkSeq(Idx) {
    if (userSeq[Idx] == gameSeq[Idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        restart();
    }
}

function restart() {
    let body = document.querySelector("body");
    body.style.backgroundColor = "red";
    setTimeout(() => {
        body.style.backgroundColor = "white";
    }, 150);
    h2.innerHTML = `GAME OVER! Your score was <b>${level-1}</b><br> Press any key to start the game`
    isStarted = false;
    
    level = 0;
    gameSeq = [];
}