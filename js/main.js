// Global Variables
const startBtn = document.querySelector("#new-game-btn");
const board = document.querySelector(".container");
const sqareCell = document.querySelectorAll("[data-cell]");
const x_class = "x";
const o_class = "o";
let playerTurn = true;

sqareCell.forEach(square => {
    square.addEventListener("click", squareClick, {once: true});
});


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
    playerTurn = false;
}

function aiPlays(e){
    if(board.classList.contains(o_class)) {
        board.classList.remove(o_class);
        board.classList.add(x_class)
    };
    const square = e.target;
    const currentTurn = playerTurn ? x_class : o_class;
    square.classList.add(currentTurn);
    playerTurn = true;
};

function start(){
    console.log("clicked")
};

startBtn.onclick = start;