const squares = document.querySelectorAll('.square');
const restartGameButton = document.getElementById('RG');
const playAgainButton = document.getElementById('PG');
const message = document.getElementById('msg-winner');
const player1Score = document.getElementById('player1-score');
const opponentName = document.getElementById('opponent-name');
const opponentScore = document.getElementById('opponent-score'); 
const drawScore = document.getElementById('draws')
const hidden = document.getElementById('hidden-msg');
const buttons = document.querySelectorAll('.buttons');
const mode = document.getElementById('game-mode');



let gameMode = "computer";
let currentPlayer = 'X';
let gameOver = false;
let player1Wins = 0;
let opponentWins = 0;
let draws = 0;

const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

]

mode.addEventListener('change', (option) => {
    gameMode = mode.value;
    console.log(gameMode);
    
    if (gameMode === 'computer') {
        opponentName.textContent = 'Computer'
    }else{
       opponentName.textContent = 'Player 2' 
    }

    resetCurrentGame();
})

// player move
squares.forEach(square => {
    square.addEventListener("click", () => {
        if (gameOver) return; 
        if (square.textContent !== "") return;
        square.textContent = currentPlayer; 
        
        checkWinner(currentPlayer);
        if (!gameOver) {
            if (currentPlayer === 'X'){
                currentPlayer = 'O';
                message.textContent = "O's turn"
                if (gameMode === 'computer') {
                    computerMove();
                }
            }else{
                currentPlayer = 'X';
                message.textContent = "X's turn";
            }
        }
    })
});


function computerMove(){
    if (gameOver) return;
    setTimeout(() => {
        const emptySquares = [...squares].filter(s => s.textContent === '');
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.textContent = 'O';
        checkWinner('O');

        if (!gameOver) {
            currentPlayer = 'X';
            message.textContent = "X's turn!"
        }
    }, 200);
}

function checkWinner(player) {
    for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        if (squares[a].textContent === player &&
            squares[b].textContent === player &&
            squares[c].textContent === player
        ) {
            gameOver = true;
            if (player === 'X') {
                message.textContent = 'Player Wins!';
                player1Wins++
                player1Score.textContent = player1Wins;
                displayButtons();
                
            }else{
                opponentWins++
                opponentScore.textContent = opponentWins;
                if (gameMode == 'computer') {
                    message.textContent = 'Computer Wins!'
                }else{
                    message.textContent = 'Player 2 Wins!'
                }
                displayButtons();
            }
            return;
        }

        }

    let isDraw = true;

    squares.forEach(square => {
        if(square.textContent === ""){
            isDraw = false
        }
    })
    
    if (isDraw && !gameOver) {
        gameOver = true;
        draws++;
        message.textContent = 'Its a draw!';
        drawScore.textContent = draws;
        displayButtons();
    }
    }

    function resetGame() {
        squares.forEach(square => {
            square.textContent = "";
        });
        gameOver = false;
        currentPlayer = 'X';
        message.textContent = "X's turn";
        player1Wins = 0;
        player1Score.textContent = player1Wins;
        opponentWins = 0;
        opponentScore.textContent = opponentWins;
        displayButtons();
    }
    function resetCurrentGame() {
        squares.forEach(square => {
            square.textContent = "";
        });
        gameOver = false;
        currentPlayer = 'X';
        message.textContent = "X's turn";
        displayButtons();
    }

    restartGameButton.addEventListener("click", resetGame)
    playAgainButton.addEventListener("click", resetCurrentGame)   

    function displayButtons() {
        buttons.forEach((button) => {
            if (gameOver) {
                button.style.display = "block"; 
            }else{
                button.style.display = "none";
            }
        }) 
    }

    displayButtons();



