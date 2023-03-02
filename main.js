const rulesBtn = document.querySelector(".rules button");
const rulesBg = document.querySelector(".rules-background");
const closeBtn = document.body.clientWidth >= 768 ? document.querySelector(".close-rules-desktop") : document.querySelector(".close-rules-mobile");
let score = document.querySelector(".score-num");
const onePlus = document.querySelector(".game-score .plus");
const pieces = document.querySelectorAll(".step-one .piece");
const stepOne = document.querySelector(".step-one");
const stepTwo = document.querySelector(".step-two");
let userChoice, houseChoise;
const playAgain = document.querySelector(".play-again");
const resultMsg = document.querySelector(".result");
const userSelection = stepTwo.children[0].firstElementChild;
const houseSelection = stepTwo.children[1].firstElementChild;
const winAudio = document.getElementById("win");
const loseAudio = document.getElementById("lose");
const drawAudio = document.getElementById("draw");
/*-------------------------------------------------------------------------*/

//
let ScoreData = localStorage.getItem("score") || false;
if (ScoreData) {
    score.textContent = ScoreData;
} else {
    localStorage.setItem("score", 0)
}


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
    onePlus.style.animation = "IncrementScore 2s";
    score.textContent = +score.textContent + 1;

    //
    localStorage.setItem("score", score.textContent)

}

// 
pieces.forEach(piece => {
    piece.addEventListener("click", (e) => {

        // Toggle steps visibility
        stepOne.style.display = "none";
        stepTwo.style.display = "flex";

        // Select User choise
        userChoice = e.target.classList.contains("piece") ? e.target.classList[1] : e.target.parentElement.classList[1];

        // Generate house choise
        randomPiece();

        // Append choises to selection area
        // User selection
        appendingPiece(userChoice, userSelection);
        
        // User selection
        appendingPiece(houseChoise, houseSelection);

    })
})

// Generat random piece
function randomPiece() {
    // Create an array of peices, and assign random piece to house choice
    const arrayOfPieces = ["paper", "scissor", "rock","paper", "scissor", "rock","paper", "scissor", "rock","paper", "scissor", "rock","paper", "scissor", "rock"]
    let randomNum = Math.floor(Math.random() * arrayOfPieces.length);
    houseChoise = arrayOfPieces[randomNum];
}

//
function appendingPiece(choice, place) {

    let piece = document.createElement("div");
    piece.className = `piece ${choice}`;

    let img = document.createElement("img");
    img.src = `IMG/icon-${choice}.svg`;
    img.alt = choice;
    piece.append(img);

    if (place.parentElement.classList.value === "user") {
        place.append(piece)
    } else {
        setTimeout(() => {
            place.append(piece); 
            resultMsg.style.display = "block"; 
            resultMsg.firstElementChild.innerHTML = result()
        }, 1500);
    }

}

//
function result() {
    // Draw its the default value of result
    let result = "Draw";
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

    //
    if (result === "You Win") {
        scoreIncrement();
        winAudio.play();
    } else if (result === "You lose") {
        loseAudio.play();
    } else {
        drawAudio.play();
    }

    return result;
}

//
playAgain.addEventListener("click", () => {
    resetGame();
})

//
function resetGame() {
    //
    stepOne.style.display = "block";
    stepTwo.style.display = "none";

    //
    userSelection.innerHTML = "";
    houseSelection.innerHTML = "";

    //
    resultMsg.style.display = "none";

    //
    onePlus.style.animation = "none";

}

/*
1- Fix result styles
2- Clean up the code
3- Comment all confusing lines.
*/