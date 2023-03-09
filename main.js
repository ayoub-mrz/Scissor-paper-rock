const rulesBtn = document.querySelector(".rules button");
const rulesBg = document.querySelector(".rules-background");
const closeBtn = document.body.clientWidth >= 768 ? document.querySelector(".close-rules-desktop") : document.querySelector(".close-rules-mobile");
let score = document.querySelector(".score-num");
const onePlus = document.querySelector(".game-score .plus");
const pieces = document.querySelectorAll(".step-one .piece");
const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
const user = document.querySelector(".user");
const house = document.querySelector(".house");
let userChoice, houseChoise;
const playAgain = document.querySelector(".play-again");
const resultMsg = document.querySelector(".result");
const userSelection = stepTwo.children[0].firstElementChild;
const houseSelection = stepTwo.children[1].firstElementChild;
const winAudio = document.getElementById("win");
const loseAudio = document.getElementById("lose");
const drawAudio = document.getElementById("draw");
const choseAudio = document.getElementById("chose");
// Create an array of pieces, and return random piece
const arrayOfPieces = ["paper", "scissor", "rock"]
/*-------------------------------------------------------------------------*/

// Checking if there is a data in localStoreg, if yes get data and place it, if no create new item(Score) in localStoreg
let ScoreData = localStorage.getItem("score") || 0;
!ScoreData && localStorage.setItem("score", 0);
score.textContent = ScoreData 

// Toggle rules visibility
rulesBtn.addEventListener("click", () => {
    rulesBg.classList.add("show");
    setTimeout(() => rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(1)", 200);
})
closeBtn.addEventListener("click", () => {
    rulesBg.children[0].style.transform = "translate(-50%, -50%) scale(0)";
    setTimeout(() => rulesBg.classList.remove("show"), 500);
})

// Animation for increment score
function scoreIncrement() {
    // Apply animation for incrementing score
    onePlus.style.animation = "IncrementScore 2s";
    // Add 1 to score in document
    score.textContent = +score.textContent + 1;

    // Update score data in localStoreg
    localStorage.setItem("score", score.textContent)

}

// Add event(click) to all pieces in step one section
pieces.forEach(piece => {
    piece.addEventListener("click", (e) => {

        // Go to step one by (hidding step one and showing step two)
        setTimeout(() => {
            stepOne.style.opacity = 0;
            setTimeout(() => {
                stepOne.style.display = "none";
                stepTwo.style.display = "flex";
                stepTwo.style.opacity = 1;
            }, 800);
        }, 1500);

        // Getting user choise
        // If the target has className(Piece), get his second className 
        // If the target hasn't className(Piece), get his parent second className 
        userChoice = e.target.classList.contains("piece") ? e.target.classList[1] : e.target.parentElement.classList[1];

        // Generate house choise
        houseChoise = randomPiece();

        // Append choises to selection area
        // User selection
        appendingPiece(userChoice, userSelection);
        
        // House selection
        appendingPiece(houseChoise, houseSelection);

        transitionAnimation(0, "none");

        // Audio for piece click
        choseAudio.play();

    })
})

// Generat random piece
function randomPiece() {
    let randomNum = Math.floor(Math.random() * arrayOfPieces.length);
    return arrayOfPieces[randomNum];
}

// Append chosen pieces in document
function appendingPiece(choice, place) {

    // Create piece elemnent
    let piece = document.createElement("div");
    piece.className = `piece ${choice}`;
    
    // Create img elemnent
    let img = document.createElement("img");
    img.src = `IMG/icon-${choice}.svg`;
    img.alt = choice;
    piece.append(img);

    // If place parent is house it will take a moment, then append piece. (like the house is thinking for choosing piece😐)
    if (place.parentElement.classList.value === "user") {
        place.append(piece)
    } else {
        setTimeout(() => {
            place.append(piece); 
            setTimeout(() => resultMsg.style.opacity = "1", 800);
            resultMsg.firstElementChild.innerHTML = result()
        }, 3000);
    }
}

function result() {

    // If result is not win or lose, then draw its the default value
    let result = "Draw";

    // Depend on user choice, it will assign a logical msg.
    switch (userChoice) {
        case "paper": 
            if (houseChoise === "scissor") {
                result  = "You lose";
            } else if (houseChoise === "rock") {
                result  = "You Win";
            }
        break;
        case "scissor":
            if (houseChoise === "paper") {
                result  = "You Win";
            } else if (houseChoise === "rock") {
                result  = "You lose";
            }
        break;
        case "rock": 
            if (houseChoise === "paper") {
                result  = "You lose";
            } else if (houseChoise === "scissor") {
                result  = "You Win";
            }
        break;
    }

    // Depend on result, it will play an audio, and set an animation for the winner
    if (result === "You Win") {
        scoreIncrement();
        winAudio.play();
        activeWinnerAnimation(user);
    } else if (result === "You lose") {
        loseAudio.play();
        activeWinnerAnimation(house);
    } else {
        drawAudio.play();
    }

    return result;
}

// Event for Reset Game
playAgain.addEventListener("click", () => {
    resetGame();
})

// Adding winner class to winner(User || House)
function activeWinnerAnimation(winner) {
    winner.classList.add("winner");
}

// Animation for focusing on chosed piece
function transitionAnimation(pieceOp, backgroundImg) {
    // Getting all unchosed pieced
    let pieces = arrayOfPieces.filter(piece => piece !== userChoice);
    // Hiding unchosed pieced
    pieces.forEach(piece => {
        document.querySelector(`.${piece}`).style.opacity = pieceOp;
    })
    // Toggle step one background
    stepOne.style.backgroundImage = backgroundImg;
    // Toggle chosen class in userchoice (piece)
    document.querySelector(`.${userChoice}`).classList.toggle('chosen'); 
}

// Reset all changes to default (Like Clicking refresh)
function resetGame() {

    // Return back to step one
    stepTwo.style.opacity = 0;
    setTimeout(() => {
        stepTwo.style.display = "none";
        stepOne.style.display = "flex";
        stepOne.style.opacity = 1;
    }, 800);

    // Remove pieces 
    userSelection.innerHTML = "";
    houseSelection.innerHTML = "";

    // Hide result msg
    resultMsg.style.opacity = "0";

    // Reset increment animation
    onePlus.style.animation = "none";

    // Remove class winner from previous winner(user || house);
    const winner = document.querySelector(".winner");
    winner?.classList.remove("winner");

    transitionAnimation(1, "url(IMG/bg-triangle.svg)")

    // Clear all used variables
    userChoice = "";
    houseChoise = "";

}