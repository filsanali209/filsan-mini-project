const squares = document.querySelectorAll('.square');
let player = 'X'
let computer = 'O'
let gameOver = false;

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
                setTimeout(() => {
                    alert("you win!")
                }, 0);
            }else{
                setTimeout(() => {
                    alert("you lose!")
                }, 0);
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
 
