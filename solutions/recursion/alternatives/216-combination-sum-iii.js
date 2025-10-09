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
 *
 * **Step 1:** [description]
 *
 * **Step 2:** [description]
 *
 * ### TIME COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### SPACE COMPLEXITY:
 * **O(?)** - [explanation]
 *
 * ### EDGE CASES:
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 216: Combination Sum III
 *
 * @param {number} k - Number of integers in combination
 * @param {number} n - Target sum
 * @return {number[][]} - All valid combinations
 *
 * Time Complexity: O(C(9,k))
 * Space Complexity: O(k)
 */
function solve(k, n) {
    const result = [];

    // Edge cases
    if (k > 9 || n > 45 || n < 1) {
        return result;
    }

    /**
     * Backtracking helper function
     * @param {number} start - Starting number to consider
     * @param {number} currentSum - Current sum of numbers in combination
     * @param {number[]} combination - Current combination being built
     */
    function backtrack(start, currentSum, combination) {
        // Base case: found valid combination
        if (combination.length === k) {
            if (currentSum === n) {
                result.push([...combination]);
            }
            return;
        }

        // Pruning: if current sum already exceeds target, stop
        if (currentSum > n) {
            return;
        }

        // Try each number from start to 9
        for (let num = start; num <= 9; num++) {
            // Pruning: if adding minimum remaining numbers exceeds target, stop
            const remaining = k - combination.length - 1;
            const minPossibleSum = currentSum + num + (remaining * (num + 1 + remaining) / 2);
            if (minPossibleSum > n) {
                break;
            }

            // Choose: add number to combination
            combination.push(num);

            // Explore: recurse with next number
            backtrack(num + 1, currentSum + num, combination);

            // Unchoose: backtrack
            combination.pop();
        }
    }

    // Start backtracking from number 1
    backtrack(1, 0, []);

    return result;
}

/**
 * Test cases for Problem 216: Combination Sum III
 */
function testSolution() {
    console.log('Testing 216. Combination Sum III');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => [...arr].sort()).sort();
        const sortedB = b.map(arr => [...arr].sort()).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: k = 3, n = 7
    const result1 = solve(3, 7);
    const expected1 = [[1,2,4]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: k = 3, n = 9
    const result2 = solve(3, 9);
    const expected2 = [[1,2,6], [1,3,5], [2,3,4]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: k = 4, n = 1 (impossible)
    const result3 = solve(4, 1);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: k = 2, n = 18 (edge case)
    const result4 = solve(2, 18);
    const expected4 = [];
    console.assert(result4.length === 0,
        `Test 4 failed: expected no solutions for k=2, n=18`);

    // Test case 5: k = 9, n = 45 (all numbers)
    const result5 = solve(9, 45);
    const expected5 = [[1,2,3,4,5,6,7,8,9]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 216. Combination Sum III!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 216. Combination Sum III ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: k = 3, n = 7');
    console.log('Output:', JSON.stringify(solve(3, 7)));
    console.log('');

    console.log('Input: k = 3, n = 9');
    console.log('Output:', JSON.stringify(solve(3, 9)));

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
 * - This solution uses backtracking with pruning for efficiency
 * - The pruning optimization significantly reduces the search space
 * - Each number can only be used once (unlike Combination Sum I)
 * - Numbers are always used in ascending order to avoid duplicates
 */
