/**
 * LeetCode Problem 1275: Find Winner on a Tic Tac Toe Game
 * Difficulty: Easy
 * Category: Simulation
 *
 * METADATA:
 * Techniques: Simulation, Game state checking
 * Data Structures: 2D array
 * Patterns: Win condition checking
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */

function tictactoe(moves) {
    const board = Array(3).fill(null).map(() => Array(3).fill(''));

    for (let i = 0; i < moves.length; i++) {
        const [row, col] = moves[i];
        board[row][col] = i % 2 === 0 ? 'X' : 'O';
    }

    function checkWinner(player) {
        // Check rows
        for (let row of board) {
            if (row.every(cell => cell === player)) return true;
        }
        // Check columns
        for (let col = 0; col < 3; col++) {
            if (board.every(row => row[col] === player)) return true;
        }
        // Check diagonals
        if (board[0][0] === player && board[1][1] === player && board[2][2] === player) return true;
        if (board[0][2] === player && board[1][1] === player && board[2][0] === player) return true;
        return false;
    }

    if (checkWinner('X')) return "A";
    if (checkWinner('O')) return "B";
    if (moves.length === 9) return "Draw";
    return "Pending";
}

if (require.main === module) {
    const testCases = [
        [[[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]], "A"],
        [[[0, 0], [1, 1], [0, 1], [0, 2], [1, 0], [2, 0]], "B"],
        [[[0, 0], [1, 1], [2, 0], [1, 0], [1, 2], [2, 1], [0, 1], [0, 2], [2, 2]], "Draw"],
    ];

    console.log("Testing tictactoe:");
    for (const [moves, expected] of testCases) {
        const result = tictactoe(moves);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} tictactoe(${JSON.stringify(moves)}) = ${result}, expected = ${expected}`);
    }
}

module.exports = { tictactoe };
