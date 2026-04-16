const squares = document.querySelectorAll('.square');
const restartGameButton = document.getElementById('RG');
const playAgainButton = document.getElementById('PG');
const message = document.getElementById('msg-winner');
const playerScore = document.getElementById('player-score');
const computerScore = document.getElementById('computer-score');
const drawScore = document.getElementById('draws')
const hidden = document.getElementById('hidden-msg');
const buttons = document.querySelectorAll('.buttons')


let player = 'X'
let computer = 'O'
let gameOver = false;
let playerWins = 0;
let computerWins = 0;
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

// player move
squares.forEach(square => {
    square.addEventListener("click", () => {
        if (gameOver) return; 
        if (square.textContent !== "") return;
        square.textContent = player; 
        
        checkWinner(player);
        if (!gameOver) {
            computerMove();
        }
    })
});


function computerMove(){
    if (gameOver) return;
    setTimeout(() => {
        const emptySquares = [...squares].filter(s => s.textContent === '');
        const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        randomSquare.textContent = computer;
        checkWinner(computer);
    }, 200);
}

function checkWinner(currentPlayer) {
    for (let i = 0; i < wins.length; i++) {
        let [a, b, c] = wins[i];
        if (squares[a].textContent === currentPlayer &&
            squares[b].textContent === currentPlayer &&
            squares[c].textContent === currentPlayer
        ) {
            gameOver = true;
            if (currentPlayer === player) {
                message.textContent = 'The winner is: Player';
                playerWins++
                playerScore.textContent = playerWins;
                displayButtons();
                
            }else{
                message.textContent = 'The winner is: Computer';
                computerWins++
                computerScore.textContent = computerWins;
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
        message.textContent = '';
        playerWins = 0;
        playerScore.textContent = playerWins;
        computerWins = 0;
        computerScore.textContent = computerWins;
        displayButtons();
    }
    function resetCurrentGame() {
        squares.forEach(square => {
            square.textContent = "";
        });
        gameOver = false;
        message.textContent = '';
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



