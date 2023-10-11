const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const NewGameBtn = document.querySelector("#btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function inItGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // CLEANING THE UI
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";

        box.classList = `box box${index+1}`;
    })
    NewGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

inItGame();

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O";
    }

    else{
        currentPlayer = "X";
    }
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer = "";
    winningPositions.forEach((position) => {
        if ( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[2]] === gameGrid[position[1]])) {
               
                if (gameGrid[position[0]] === "X") {
                    answer = "X";
                } 
                else {
                    answer = "O";
                }

                // DISABLING POINTER EVENT 
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                });

                boxes[position[0]].classList.add("win")
                boxes[position[1]].classList.add("win")
                boxes[position[2]].classList.add("win")
        }
    });

    // WHEN WE HAVE WINNER
    if (answer !== "") {
        gameInfo.innerText = `Winner is - ${answer}`;
        NewGameBtn.classList.add("active");
        return;
    }

    // WHEN WE DONT HAVE WINNER 
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== ""){
            fillCount++;
        }
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game tied";
        NewGameBtn.classList.add("active")
    }
    
}
 
 

function handleClick(index) {
    if(gameGrid[index] === ""){
        gameGrid[index] = currentPlayer;
        boxes[index].innerText = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // TIME TO CHANGE THE TURN OF THE PLAYER
        swapTurn();
        // CHECKING FOR THE RESULT OF THE GAME
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});