const cardArray = [
    "🍎", "🍎", "🍌", "🍌", "🍉", "🍉", "🍇", "🍇",
    "🍓", "🍓", "🥭", "🥭", "🍍", "🍍", "🥝", "🥝"
];

let flippedCards = [];
let matchedCards = [];
let moves = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function initGame() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = ""; // Clear board
    shuffledCards = shuffle(cardArray);

    shuffledCards.forEach((fruit, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.fruit = fruit;
        card.dataset.index = index;
        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);
    });

    flippedCards = [];
    matchedCards = [];
    moves = 0;
    document.getElementById("moves").innerText = moves;

    loadScoreHistory(); // Load previous scores
}

function flipCard() {
    if (flippedCards.length < 2 && !this.classList.contains("flipped") && !matchedCards.includes(this)) {
        this.innerText = this.dataset.fruit; // Show fruit
        this.classList.add("flipped");
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    moves++;
    document.getElementById("moves").innerText = moves;

    let [card1, card2] = flippedCards;
    if (card1.dataset.fruit === card2.dataset.fruit) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        showMotivationalMessage(); // Show encouragement

        if (matchedCards.length === cardArray.length) {
            setTimeout(() => {
                alert(`🎉 You won in ${moves} moves!`);
                saveScore(moves); // Save final score
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.innerText = "";
            card2.innerText = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

// 💾 Save Score to Local Storage
function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("memoryGameScores")) || [];
    scores.push({ score: score, date: new Date().toLocaleString() });
    localStorage.setItem("memoryGameScores", JSON.stringify(scores));
    loadScoreHistory();
}

// 📜 Load Score History
function loadScoreHistory() {
    let scores = JSON.parse(localStorage.getItem("memoryGameScores")) || [];
    let historyDiv = document.getElementById("score-history");
    historyDiv.innerHTML = "<h3>Score History</h3>";

    scores.slice().reverse().forEach(entry => {
        let p = document.createElement("p");
        p.innerText = `Moves: ${entry.score} - ${entry.date}`;
        historyDiv.appendChild(p);
    });
}

// 🔥 Motivational Messages
function showMotivationalMessage() {
    let totalPairs = cardArray.length / 2;  // Total number of pairs
    let remainingPairs = totalPairs - (matchedCards.length / 2); // Remaining unmatched pairs

    if (remainingPairs === Math.floor(totalPairs / 2)) {
        alert("🔥 You're halfway there! Keep going!");
    } else if (remainingPairs === 2) {
        alert("💪 Just a few more! Stay focused!");
    } else if (remainingPairs === 1) {
        alert("🧠 One last pair! You got this!");
    }
}

function playBackgroundMusic() {
    let bgMusic = document.getElementById("bg-music");
    bgMusic.play().catch(error => console.log("Autoplay blocked:", error));
}

function showMotivationalMessage() {
    let totalPairs = cardArray.length / 2;  
    let remainingPairs = totalPairs - (matchedCards.length / 2);

    let message = "";

    if (remainingPairs === Math.floor(totalPairs / 2)) {
        message = "🔥 You're halfway there! Keep going!";
    } else if (remainingPairs === 2) {
        message = "💪 Just a few more! Stay focused!";
    } else if (remainingPairs === 1) {
        message = "🧠 One last pair! You got this!";
    }

    if (message) {
        let messageDiv = document.getElementById("motivation-message");
        messageDiv.innerText = message;
        messageDiv.style.display = "block";

        setTimeout(() => {
            messageDiv.style.display = "none"; // Hide after 2 sec
        }, 2000);
    }
}

function showWinMessage(moves) {
    let winDiv = document.getElementById("win-message");
    winDiv.innerText = `🎉 You won in ${moves} moves!`;
    winDiv.style.display = "block";

    setTimeout(() => {
        winDiv.style.display = "none"; // Hide after 3 sec
    }, 3000);
}

// 🎯 Modify `checkMatch()` to Show Win Message
function checkMatch() {
    moves++;
    document.getElementById("moves").innerText = moves;

    let [card1, card2] = flippedCards;
    if (card1.dataset.fruit === card2.dataset.fruit) {
        matchedCards.push(card1, card2);
        flippedCards = [];

        showMotivationalMessage(); // Show encouragement

        if (matchedCards.length === cardArray.length) {
            setTimeout(() => {
                showWinMessage(moves); // Show win message
                saveScore(moves); // Save final score
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.innerText = "";
            card2.innerText = "";
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            flippedCards = [];
        }, 1000);
    }
}

function loadScoreHistory() {
    let scores = JSON.parse(localStorage.getItem("memoryGameScores")) || [];
    let historyDiv = document.getElementById("score-history");
    historyDiv.innerHTML = ""; // Clear previous scores

    if (scores.length === 0) {
        historyDiv.innerHTML = "<p>No scores yet. Play a game!</p>";
    } else {
        scores.slice().reverse().forEach(entry => {
            let p = document.createElement("p");
            p.innerText = `Moves: ${entry.score} - ${entry.date}`;
            historyDiv.appendChild(p);
        });
    }
}

document.addEventListener("click", playBackgroundMusic);
document.addEventListener("touchstart", playBackgroundMusic); // For mobile users

document.getElementById("restart").addEventListener("click", initGame);

initGame();
