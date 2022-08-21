// GLOBAL VARIABLES
const startBtn = document.querySelector("#new-game-btn");
const board = document.querySelector(".container");
const sqareCell = document.querySelectorAll("[data-cell]");
const popUpResult = document.querySelector(".winner");
const resultGame = document.querySelector("[data-winner]");
const btnRestart = document.getElementById("restart-btn");
const x_class = "x";
const o_class = "o";
let playerTurn = true;
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// GAME FUNCTIONALITY

function squareClick(e){
    playerTurn ? playerPlays(e) : aiPlays(e);
};

function playerPlays(e){
    if(board.classList.contains(x_class)) {
        board.classList.remove(x_class);
        board.classList.add(o_class)
    };
    const square = e.target;
    const currentTurn = playerTurn ? x_class : o_class;
    square.classList.add(currentTurn);
    if (checkWinner(currentTurn)){
        isWin(currentTurn);
    };
    playerTurn = !playerTurn;
};

function aiPlays(e){
    if(board.classList.contains(o_class)) {
        board.classList.remove(o_class);
        board.classList.add(x_class)
    };
    const square = e.target;
    const currentTurn = playerTurn ? x_class : o_class;
    square.classList.add(currentTurn);
    if (checkWinner(currentTurn)){
        isWin(currentTurn);
    };
    playerTurn = !playerTurn;
};

// RESULT GAME FUNCTIONS

function checkWinner(condition){
    if (isDraw()){
        popUpResult.classList.add("show");
        resultGame.textContent = "A draw it is!!!!";
        btnRestart.addEventListener("click", () => {
            popUpResult.classList.remove("show");
            start();
        });
    } else {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return sqareCell[index].classList.contains(condition)
            });
        });
    }
};

function isWin(active_player){
    popUpResult.classList.add("show");
    resultGame.textContent = `${active_player.toUpperCase()} wins!`;
    btnRestart.addEventListener("click", ()=> {
        popUpResult.classList.remove("show");
        start();
    });
};

function isDraw(){
    return [...sqareCell].every(squareFill => {
        return squareFill.classList.contains(x_class) || 
            squareFill.classList.contains(o_class);
    })
};

// TO START GAME

function start(){
    sqareCell.forEach(square => {
        square.classList.remove(x_class);
        square.classList.remove(o_class);
    });
    sqareCell.forEach(square => {
        square.addEventListener("click", squareClick, {once: true});
    });

};

startBtn.onclick = start;