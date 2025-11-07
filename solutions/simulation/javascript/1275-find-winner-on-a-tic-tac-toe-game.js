/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * 1. **Initialize data structures**: Set up the required data structures for the algorithm
 * 2. **Process input**: Iterate through the input applying the core technique
 * 3. **Track state**: Maintain necessary state information during processing
 * 4. **Return result**: Construct and return the final solution
 *
 *
 * ### WHY THIS WORKS:
 * This approach works because it correctly implements the problem requirements.
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * example input
 * ```
 *
 * Output:
 * ```
 * example output
 * ```
 *
 * Step-by-step execution:
 * 1. [First step]
 * 2. [Second step]
 * 3. [Final step]
 *
 * ### TIME COMPLEXITY:
 * O(n²)** - Analysis of time complexity - [Add explanation of why this complexity]
 *
 * ### SPACE COMPLEXITY:
 * O(n)** - Analysis of space complexity - [Add explanation of why this complexity]
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
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
