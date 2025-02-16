let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
    setTimeout(() => {
        setGame();
        loadScoreHistory();
        playBackgroundMusic();
    }, 500);
};


function playBackgroundMusic() {
    let bgMusic = document.getElementById("bg-music");

    if (bgMusic.paused) {
        bgMusic
            .play()
            .then(() => console.log("Background music playing! 🎵"))
            .catch(error => console.log("Autoplay blocked: " + error));
    }
}

document.addEventListener("click", playBackgroundMusic);



function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    setInterval(setMole, 2500);
    setInterval(setPlant, 3000);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

let lastMoleTile = null; // Stores last mole position

function setMole() {
    if (gameOver) return;

    if (currMoleTile) currMoleTile.innerHTML = "";

    let num;
    do {
        num = getRandomTile();
    } while (num === lastMoleTile || (currPlantTile && currPlantTile.id === num)); // 🔥 Ensures no repeat

    currMoleTile = document.getElementById(num);
    lastMoleTile = num; 

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";
    currMoleTile.appendChild(mole);

    setTimeout(() => {
        if (currMoleTile) currMoleTile.innerHTML = "";
    }, 1500);
}



let lastPlantTile = null;

function setPlant() {
    if (gameOver) return;

    if (currPlantTile) currPlantTile.innerHTML = "";

    let num;
    do {
        num = getRandomTile();
    } while (num === lastPlantTile || num === lastMoleTile); // 🔥 Ensures no repeat & no mole overlap

    currPlantTile = document.getElementById(num);
    lastPlantTile = num;

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";
    currPlantTile.appendChild(plant);
}

function showMotivationalMessage(score) {
    let messages = {
        50: "🔥 You're on fire! Keep going!",
        100: "🎯 Amazing! You’re a whacking pro!",
        150: "💪 Unstoppable! Can you beat your high score?"
    };

    if (messages[score]) {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("motivational-message");
        messageDiv.innerText = messages[score];

        document.body.appendChild(messageDiv);

        setTimeout(() => messageDiv.remove(), 2000); // Remove after 2 sec
    }
}


function selectTile() {
    if (gameOver) return;

    let hitSound = document.getElementById("hit-sound");
    let gameOverSound = document.getElementById("gameover-sound");

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();

        hitSound.currentTime = 0; 
        hitSound.play();

        showMotivationalMessage(score);
    } 
    else if (this === currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        
        gameOverSound.currentTime = 0;
        gameOverSound.play();

        saveScore(score);
        gameOver = true;
    }
}




function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push({ score: score, date: new Date().toLocaleString() });
    localStorage.setItem("scores", JSON.stringify(scores));
    loadScoreHistory();
}


function loadScoreHistory() {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    let historyDiv = document.getElementById("score-history");
    historyDiv.innerHTML = "<h3>Score History</h3>";
    
    scores.slice().reverse().forEach(entry => {
        let p = document.createElement("p");
        p.innerText = `Score: ${entry.score} - ${entry.date}`;
        historyDiv.appendChild(p);
    });
}
