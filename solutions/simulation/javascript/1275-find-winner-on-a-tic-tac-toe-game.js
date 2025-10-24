/**
 * # 1275. Find Winner On A Tic Tac Toe Game
 *
 * Difficulty: Medium
 *
 * Solve the Find Winner On A Tic Tac Toe Game problem as described.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>* ```</dd>
 * <dt>Output:</dt>
 * <dd>* ```</dd>
 * <dt>Explanation:</dt>
 * <dd>Processing input produces the expected output</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Simulation, Game state checking
 * **Data Structures**: 2D array
 * **Patterns**: Win condition checking
 * **Time Complexity**: **O(n²)**
 * **Space Complexity**: **O(n)**
 *
 * ### INTUITION:
 * The key insight is to solve this problem efficiently.
 *
 * ### APPROACH:
 * We solve this problem by implementing the required algorithm.
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

### TIME COMPLEXITY:
 * **O(n²)** - Analysis of time complexity
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - Analysis of space complexity
 *
 * ### EDGE CASES:
 * - Handle empty input
 * - Handle boundary conditions
 *
 * </details>
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
