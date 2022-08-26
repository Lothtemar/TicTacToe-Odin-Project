// GLOBAL VARIABLES
const startBtn = document.querySelector("#new-game-btn");
const selectMenu = document.querySelector(".layer")
const board = document.querySelector(".container");
const sqareCell = document.querySelectorAll("[data-cell]");
const popUpResult = document.querySelector(".winner");
const resultGame = document.querySelector("[data-winner]");
const btnRestart = document.getElementById("restart-btn");
const popUpOptions = document.querySelector(".popup-choose");
const pvp_card = document.querySelector(".pvp");
const pvai_card = document.querySelector(".pvai");
const x_card = document.querySelector(".x-card");
const o_card = document.querySelector(".o-card");
const goBtn = document.querySelector(".gobtn")
const x_class = "x";
const o_class = "o";
let aIPlaying = false;
let aITurn = false;
let xTurn = true;
let parameters = [true, true];
let boardCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let isEnd = false;
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

// RESULT GAME FUNCTIONS

function winCombination(condition){
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return sqareCell[index].classList.contains(condition)
        });
    });
}

function checkWinner(condition){
    if (isDraw() && !winCombination(condition)){
        selectMenu.classList.remove("hidden");
        popUpResult.classList.add("show");
        resultGame.textContent = "A draw it is!!!!";
        btnRestart.addEventListener("click", () => {
            popUpResult.classList.remove("show");
            initialize();
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
    selectMenu.classList.remove("hidden");
    popUpResult.classList.add("show");
    resultGame.textContent = `${active_player.toUpperCase()} wins!`;
    btnRestart.addEventListener("click", ()=> {
        popUpResult.classList.remove("show");
        initialize();
    });
};

function isDraw(){
    return [...sqareCell].every(squareFill => {
        return squareFill.classList.contains(x_class) || 
            squareFill.classList.contains(o_class);
    })
};

// GAME FUNCTIONALITY

function emptyCells(){
    return boardCells.filter(element => typeof element === "number")
};

function aiChoose(){
    return emptyCells()[0];
}

function turnMechanic(e, ai){
    if (ai == null) {
        console.log(`Opcion 1 AI${aIPlaying} AI Turn ${aITurn}`);
        const square = e.target;
        const currentTurn = xTurn ? x_class : o_class;
        square.classList.add(currentTurn);
        boardCells[e.target.id] = currentTurn;
        if (checkWinner(currentTurn)){
            isEnd= true;
            isWin(currentTurn);
        } else {
            xTurn = !xTurn;
        };
        
    } else if (ai == true && aITurn == false){
        const square = e.target;
        const currentTurn = xTurn ? x_class : o_class;
        square.classList.add(currentTurn);
        boardCells[e.target.id] = currentTurn;
        if (checkWinner(currentTurn)){
            isEnd= true;
            aITurn = !aITurn
            isWin(currentTurn);
        } else {
            xTurn = !xTurn;
            aITurn = !aITurn
            turnOne(aiChoose(), true)
        }

    } else if (ai == true && aITurn == true) {
        console.log(`Opcion 3 AI${aIPlaying} AI Turn ${aITurn}`);
        const square = sqareCell[e];
        const currentTurn = xTurn ? x_class : o_class;
        square.classList.add(currentTurn);
        boardCells[e] = currentTurn;
        if (checkWinner(currentTurn)){
            isEnd = true;
            aITurn = !aITurn
            isWin(currentTurn);
        } else {
            xTurn = !xTurn;
            aITurn = !aITurn
        }
    }

}

function turnOne(e, ai){
    if(!isEnd){
        if(board.classList.contains(x_class)) {
            board.classList.remove(x_class);
            board.classList.add(o_class)
        } else {
            board.classList.remove(o_class);
            board.classList.add(x_class)
        }
    turnMechanic(e, ai);
    };


};

function humanMovement(e){
    if(!aIPlaying){
        turnOne(e, null);
    } else {
        turnOne(e, true);
 
    }

};


// START GAME

function startGame(){
    isEnd = false;
    if(selectMenu.classList.contains("show")){selectMenu.classList.remove("show")};
    selectMenu.classList.add("hidden");
    popUpOptions.classList.add("hidden");

    sqareCell.forEach(square => {
        square.addEventListener("click", humanMovement, {once: true});
    });
    setUp(parameters)

    if(aIPlaying && !xTurn){
        aITurn = !aITurn;
        turnOne(aiChoose(), true);

    };

};


// GAME OPTIONS MENU

function popUpGameMode(){
    selectMenu.classList.remove("hidden");
    selectMenu.classList.add("show");
    if(popUpOptions.classList.contains("hidden")){
        popUpOptions.classList.remove("hidden");
    };

    parameters[0] === true ? pvai_card.classList.add("selected") : 
        pvp_card.classList.add("selected");
    parameters[1] === true ? x_card.classList.add("selected") :
    o_card.classList.add("selected")


    document.querySelectorAll(".card").forEach(card => {
        card.addEventListener("click", (e) => controls(e));
    });

};

function controls(e){
    if (e.target.id === "x1" | e.target.id === "x2"){
        if (e.target.id === "x1"){
            parameters[0] = false;
            e.target.classList.add("selected")
            if (pvai_card.classList.contains("selected")){
                pvai_card.classList.remove("selected");
            } 
        } else {
            parameters[0] = true;
            e.target.classList.add("selected");
            pvp_card.classList.remove("selected");
        }
    } else if (e.target.id === "x3" | e.target.id === "x4" ){
        if(e.target.id === "x3"){
            parameters[1] = true; 
            e.target.classList.add("selected");
            if (o_card.classList.contains("selected")){
                o_card.classList.remove("selected");
            } 
        } else {
            parameters[1] = false
            e.target.classList.add("selected");
            x_card.classList.remove("selected");
        }
    }
};

function setUp(parameters){
parameters[0] === true ? aIPlaying = true : aIPlaying = false;
parameters[1] === true ? xTurn = true : xTurn = false;
xTurn === true ? board.classList.add(x_class) : board.classList.add(o_class);
};


// CLEAN BOARD AND SQUARE
function cleanGame(){
    sqareCell.forEach(square => {
        square.classList.remove(x_class);
        square.classList.remove(o_class);
    });
    board.classList.remove(x_class, o_class);
    boardCells.forEach((element, index)=> {boardCells[index] = index });
    aITurn = false;
}

// START BUTTON

function initialize(){
    cleanGame();
    popUpGameMode();
};

goBtn.onclick = startGame;
startBtn.onclick = initialize;
