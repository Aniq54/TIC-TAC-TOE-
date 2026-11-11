
// Selecting HTML elements
const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetButton = document.getElementById("reset");

// Game variables
let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

// Score variables
let scoreX = 0;
let scoreO = 0;
let draws = 0;


const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {

    for (let combination of winningCombinations) {

        const [a, b, c] = combination;

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        ) {
            gameActive = false;

            statusText.textContent = "Player " + board[a] + " Wins!";

            // Highlight winning cells
            cells[a].classList.add("winner");
            cells[b].classList.add("winner");
            cells[c].classList.add("winner");

            // Update scoreboard
            if (board[a] === "X") {
                scoreX++;
                document.getElementById("scoreX").textContent = scoreX;
            } else {
                scoreO++;
                document.getElementById("scoreO").textContent = scoreO;
            }

            return true;
        }
    }

    // Check for draw
    if (!board.includes("")) {
        gameActive = false;
        draws++;

        document.getElementById("draws").textContent = draws;
        statusText.textContent = "It's a Draw!";

        return true;
    }

    return false;

}

// Handle cell clicks
function handleCellClick(event) {

    const clickedCell = event.target;
    const index = Array.from(cells).indexOf(clickedCell);

    // Check if cell is already filled
    if (board[index] !== "" || !gameActive) {
        return;
    }

    // Place current player's symbol
    board[index] = currentPlayer;
    clickedCell.textContent = currentPlayer;
clickedCell.classList.add(currentPlayer.toLowerCase());
    // Check for winner
if (checkWinner()) {
    return;
}

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";

    // Update turn message
    statusText.textContent = "Player " + currentPlayer + "'s Turn";
}


// Add click event to every cell
cells.forEach(cell => {
    cell.addEventListener("click", handleCellClick);
});

function resetGame() {

    // Clear the board array
    board = ["", "", "", "", "", "", "", "", ""];

    // Clear all cells
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("winner");
    });

    // Start with Player X
    currentPlayer = "X";

    // Activate the game again
    gameActive = true;

    // Update status
    statusText.textContent = "Player X's Turn";
}

// Add click event to reset button
resetButton.addEventListener("click", resetGame);
