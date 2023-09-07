let body = document.querySelector("body");
let started = false;
let level = 0;
let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "blue"];
let innerDiv = document.querySelectorAll(".inner-div");
let h2 = document.querySelector("h2");
let startBtn = document.querySelector(".start-button");

startBtn.addEventListener("click", () => {
    if (started != true) {
        started = true;
        levelUp();
        startBtn.innerText = "RESET";
    } else {
        // started = false;
        startBtn.innerText = "START";
        gameReset();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        if (started != true) {
            // console.log("now started");
            started = true;
            startBtn.innerText = "RESET";
            levelUp();
        }
    }
});

function gameFlash(btn) {
    btn.classList.add("game-flash");
    setTimeout(() => {
        btn.classList.remove("game-flash");
    }, 200);
}

function userFlash(btn) {
    btn.classList.add("user-flash");
    setTimeout(() => {
        btn.classList.remove("user-flash");
    }, 100);
}

function gameOverFlash() {
    let id = setInterval(() => {
        body.classList.add("gameOver-flash");
        setTimeout(() => {
            body.classList.remove("gameOver-flash");
        }, 50);
    }, 100);

    setTimeout(() => {
        clearInterval(id);
    }, 200);
}

function levelUpFlash() {
    let id = setInterval(() => {
        body.classList.add("levelUp-flash");
        setTimeout(() => {
            body.classList.remove("levelUp-flash");
        }, 50);
    }, 100);

    setTimeout(() => {
        clearInterval(id);
    }, 200);
}

function gameOver() {
    gameOverFlash();
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    h2.innerHTML =
        "Game over Press <strong>START</strong> button or <b>Space</b> to start the Game";
    startBtn.innerText = "START";
}

function gameReset() {
    gameOverFlash();
    gameSeq = [];
    userSeq = [];
    started = false;
    level = 0;
    h2.innerHTML =
        "Game reset Press <strong>START</strong> button or <b>Spacebar</b> to start the Game";
    startBtn.innerText = "START";
}

function levelUp() {
    // levelUpFlash();
    level++;
    let ranIdx = Math.floor(Math.random() * 4);
    let ranBtn = btns[ranIdx];
    gameFlash(document.querySelector(`.${ranBtn}`));
    gameSeq.push(ranBtn);
    // console.log(gameSeq); //this is the hack.

    h2.innerText = `Level ${level}`;
}

function checkAns() {
    if (userSeq.length != gameSeq.length) {
        if (userSeq[userSeq.length - 1] != gameSeq[userSeq.length - 1]) {
            // console.log("game over");
            gameOver();
        }
    } else {
        if (userSeq.toString() == gameSeq.toString()) {
            setTimeout(levelUp, 500);
            userSeq = [];
        } else {
            // console.log("game over");
            gameOver();
        }
    }
}

for (btn of innerDiv) {
    btn.addEventListener("click", (event) => {
        if (started == true) {
            userResponse = event.target.classList[1];
            userFlash(document.querySelector(`.${userResponse}`));
            userSeq.push(userResponse);
            // console.log(`gameseq is ${gameSeq.slice(0, userSeq.length)}`);
            // console.log(`userseq is ${userSeq}`);

            checkAns();
        }
    });
}
