const board = document.querySelector('.board');
const box = document.querySelectorAll('.box');
const players = ['❌', '⭕'];
let currentPlayer = players[0]; //X goes first
let playerXWins = 0;
let playerOWins = 0;
let draw = 0;
let gameActive = true;

const message = document.createElement('h2');
message.textContent = `Player ${currentPlayer}'s turn`;
message.style.textAlign = 'center';
message.style.marginTop = '20px';
board.after(message);

// update scores of players
function updateScoreBoard() {
    document.querySelector('#playerXWins').textContent = playerXWins;
    document.querySelector('#playerOWins').textContent = playerOWins;
    document.querySelector('#drawGames').textContent = draw;
}

// Now we define the winning combinitions in an array
const winningCombitions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// clear the board and set the currentPlayer to the initial state
const clearBoard = () => {
    for(let i = 0; i<box.length; i++){
        box[i].textContent = "";
    }
    gameActive = true;
    currentPlayer = players[0];
    message.textContent = `Player ${currentPlayer}'s turn`;
    message.style.display = 'block';
    updateScoreBoard();
}
//If clicked, it will refresh the board
const refreshBtn = document.querySelector('#refreshButton');
refreshBtn.addEventListener('click', () => {
    clearBoard();
});

// We add an event listener to each box and check if the box is empty, then we add the currentPlayer to the box and check if the currentPlayer wins or it's a draw
for(let i = 0; i<box.length; i++){
    box[i].addEventListener('click', () => {
        if(!gameActive){
            alert("Please click on Refresh Board button");
            return;
        }
        if(box[i].textContent !== ''){
            return
        }
        box[i].textContent = currentPlayer;
        if(checkWinner(currentPlayer)){
            message.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            updateScoreBoard();
            setTimeout(() => {
                alert("Please click on Refresh Board button");
            } , 1000);
            return
        }
        if(checkDraw()){
            message.textContent = `It's a draw!`;
            gameActive = false;
            updateScoreBoard();
            setTimeout(() => {
                alert("Please click on Refresh Board button");
            } , 1000);
            return
        }
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
        message.textContent = `${currentPlayer}'s turn`;
    })

}


// We check if the combinition are met for a player and if true, player wins and we return true, otherwise false!
const checkWinner = () => {
    for(let i = 0; i<winningCombitions.length; i++){
        const [a, b, c] = winningCombitions[i];
        if(box[a].textContent === currentPlayer && box[b].textContent === currentPlayer && box[c].textContent === currentPlayer){
            if(currentPlayer === '❌'){
                playerXWins++;
            } else if (currentPlayer === '⭕'){
                playerOWins++;
            }
            gameActive = false;
            updateScoreBoard();
            return true;
        }
    }
    return false;
}

// Check if the box are full and no one wins, then it's a draw!
const checkDraw = () => {
    for(let i = 0; i<box.length; i++){
        if(box[i].textContent === ''){
            return false;
        }
    }
    draw++;
    gameActive = false;
    updateScoreBoard();
    return true;
}

// When clicking the reset button, we reset the game and clear the box with "" and set the message and currentPlayer to the initial state
const resetBtn = document.querySelector('#resetButton');
resetBtn.addEventListener('click', () => {
    for(let i = 0; i<box.length; i++){
        box[i].textContent = "";
    }
    gameActive = true;
    currentPlayer = players[0];
    message.textContent = `Player ${currentPlayer}'s turn`;
    playerXWins = 0;
    playerOWins = 0;
    draw = 0;
    updateScoreBoard();
});