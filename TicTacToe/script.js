document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    const outcomeScreen = document.getElementById("outcome-screen");
    const outcomeText = document.getElementById("outcome-text");
    const playAgainButton = document.getElementById("play-again");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", cellClick);
        board.appendChild(cell);
    }

    // Handle cell clicks
    function cellClick(e) {
        const cell = e.target;
        const index = cell.dataset.index;

        if (gameBoard[index] === "") {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.classList.add("occupied");
            if (checkWinner()) {
                message.textContent = `${currentPlayer} wins!`;
                showOutcomeScreen(`${currentPlayer} wins!`);
            } else if (!gameBoard.includes("")) {
                message.textContent = "It's a draw!";
                showOutcomeScreen("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                message.textContent = `${currentPlayer}'s Turn`;
            }
        }
    }

    // Check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    // Show outcome screen
    function showOutcomeScreen(text) {
        outcomeText.textContent = text;
        outcomeScreen.style.display = "flex";
    }

    // Reset the game
    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        board.innerHTML = "";
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", cellClick);
            board.appendChild(cell);
        }
        currentPlayer = "X";
        message.textContent = "X's Turn";
        outcomeScreen.style.display = "none";
    }

    board.addEventListener("click", cellClick);
    resetButton.addEventListener("click", resetGame);
    playAgainButton.addEventListener("click", resetGame);
});
