const squares = document.querySelectorAll('.square');
let player = 'X'
let computer = 'O'

squares.forEach(square => {
    square.addEventListener("click", () => {
        if (square.textContent !== "") return;

        square.textContent = player; 
        computerMove()
    })
});

 function computerMove(){
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        if (square.textContent === ""){
        square.textContent = computer;
        break;
        }
    
    }
 }
