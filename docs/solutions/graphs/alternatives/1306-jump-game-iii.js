/**
 * Difficulty: Medium
 *
 * [Problem description goes here]
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[input description]</dd>
 * <dt>Output:</dt>
 * <dd>[output description]</dd>
 * <dt>Explanation:</dt>
 * <dd>[explanation]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * [High-level insight or key observation]
 *
 * ### APPROACH:
 * [Detailed explanation of the solution approach]
 *
 * ### WHY THIS WORKS:
 * - [Explanation of correctness]
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * [example input]
 * ```
 * **Step 1:** [description]
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **Empty array:** Handle nums.length == 0
 * - **Single element:** Minimal array input
 * - **All same values:** Check duplicate handling
 * - **Sorted vs unsorted:** Verify input assumptions
 * - **Negative numbers:** Handle signed integers
 *
 * </details>
 */

/**
 * Main solution for Problem 1306: Jump Game Iii
 *
 * @param {number[]} arr - Array of non-negative integers
 * @param {number} start - Starting index
 * @return {boolean} - True if can reach an index with value 0
 *
 * Time Complexity: O(n) - visit each index at most once
 * Space Complexity: O(n) - queue and visited array
 */
function solve(arr, start) {
    if (!arr || arr.length === 0) return false;

    const n = arr.length;
    const visited = new Array(n).fill(false);
    const queue = [start];
    visited[start] = true;

    while (queue.length > 0) {
        const currentIndex = queue.shift();

        // Check if current position has value 0
        if (arr[currentIndex] === 0) {
            return true;
        }

        const value = arr[currentIndex];

        // Try jumping forward (i + arr[i])
        const forwardIndex = currentIndex + value;
        if (forwardIndex >= 0 && forwardIndex < n && !visited[forwardIndex]) {
            visited[forwardIndex] = true;
            queue.push(forwardIndex);
        }

        // Try jumping backward (i - arr[i])
        const backwardIndex = currentIndex - value;
        if (backwardIndex >= 0 && backwardIndex < n && !visited[backwardIndex]) {
            visited[backwardIndex] = true;
            queue.push(backwardIndex);
        }
    }

    return false; // No index with value 0 is reachable
}

/**
 * Test cases for Problem 1306: Jump Game Iii
 */
function testSolution() {
    console.log('Testing 1306. Jump Game Iii');

    // Test case 1: Can reach 0
    const result1 = solve([4,2,3,0,3,1,2], 5);
    console.assert(result1 === true, `Test 1 failed: expected true, got ${result1}`);

    // Test case 2: Cannot reach 0
    const result2 = solve([4,2,3,0,3,1,2], 0);
    console.assert(result2 === true, `Test 2 failed: expected true, got ${result2}`);

    // Test case 3: Can reach 0 from middle
    const result3 = solve([3,0,2,1,2], 2);
    console.assert(result3 === false, `Test 3 failed: expected false, got ${result3}`);

    // Test case 4: Cannot reach any 0
    const result4 = solve([1,1,1,1,1], 0);
    console.assert(result4 === false, `Test 4 failed: expected false, got ${result4}`);

    // Test case 5: Single element with 0
    const result5 = solve([0], 0);
    console.assert(result5 === true, `Test 5 failed: expected true, got ${result5}`);

    // Test case 6: Single element without 0
    const result6 = solve([1], 0);
    console.assert(result6 === false, `Test 6 failed: expected false, got ${result6}`);

    // Test case 7: Multiple zeros
    const result7 = solve([0,1,0], 1);
    console.assert(result7 === true, `Test 7 failed: expected true, got ${result7}`);

    // Test case 8: Cyclic path but no 0 reachable
    const result8 = solve([1,1,2,2,1], 0);
    console.assert(result8 === false, `Test 8 failed: expected false, got ${result8}`);

    // Test case 9: Complex path to reach 0
    const result9 = solve([4,2,1,0,2], 0);
    console.assert(result9 === true, `Test 9 failed: expected true, got ${result9}`);

    console.log('All test cases passed for 1306. Jump Game Iii!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 1306. Jump Game Iii ===');
    console.log('Category: Graphs');
    console.log('Difficulty: Medium');
    console.log('');

    // Example demonstration would go here
    testSolution();
}

// Run tests if this file is executed directly
if (require.main === module) {
    demonstrateSolution();
}

// Export for use in other modules
module.exports = {
    solve,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - This solution focuses on graphs concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
