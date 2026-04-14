const squares = document.querySelectorAll('.square');
const restartGameButton = document.getElementById('RG');
const playAgainButton = document.getElementById('PG');
const message = document.getElementById('msg-winner')

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
        for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        if (square.textContent === ""){
        square.textContent = computer;
        checkWinner(computer);
        break;
        }
    
    }
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
                message.textContent = 'Player';
                playerWins++
            }else{
                message.textContent = 'Computer';
                computerWins++
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
        setTimeout(() => {
            alert("Draw!")
        }, 0);
    }
    }

    function resetGame() {
        squares.forEach(square => {
            square.textContent = "";
        });
        gameOver = false;
        message.textContent = '';
        playerWins = 0;
        computerWins = 0;
    }
    function resetCurrentGame() {
        squares.forEach(square => {
            square.textContent = "";
        });
        gameOver = false;
        message.textContent = '';
    }

    
    restartGameButton.addEventListener("click", resetGame)
    playAgainButton.addEventListener("click", resetCurrentGame)
 

