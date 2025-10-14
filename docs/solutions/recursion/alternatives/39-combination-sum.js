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
 * - **Empty string:** Handle s.length == 0
 * - **Single character:** Minimal string input
 * - **All same characters:** Check duplicate handling
 * - **Special characters:** Handle non-alphanumeric
 * - **Case sensitivity:** Consider uppercase vs lowercase
 *
 * </details>
 */

/**
 * Main solution for Problem 39: Combination Sum
 *
 * @param {number[]} candidates - Array of distinct positive integers
 * @param {number} target - Target sum
 * @return {number[][]} - All unique combinations that sum to target
 *
 * Time Complexity: O(N^(T/M))
 * Space Complexity: O(T/M)
 */
function solve(candidates, target) {
    const result = [];

    // Sort candidates for optimization (optional but helps with pruning)
    candidates.sort((a, b) => a - b);

    /**
     * Backtracking helper function
     * @param {number} start - Starting index in candidates array
     * @param {number} currentSum - Current sum of combination
     * @param {number[]} combination - Current combination being built
     */
    function backtrack(start, currentSum, combination) {
        // Base case: found valid combination
        if (currentSum === target) {
            result.push([...combination]);
            return;
        }

        // Pruning: if current sum exceeds target, stop
        if (currentSum > target) {
            return;
        }

        // Try each candidate starting from 'start' index
        for (let i = start; i < candidates.length; i++) {
            const candidate = candidates[i];

            // Pruning: if adding this candidate exceeds target, stop
            // (works because array is sorted)
            if (currentSum + candidate > target) {
                break;
            }

            // Choose: add candidate to combination
            combination.push(candidate);

            // Explore: recurse with same index (allows reusing same number)
            backtrack(i, currentSum + candidate, combination);

            // Unchoose: backtrack
            combination.pop();
        }
    }

    // Start backtracking from index 0
    backtrack(0, 0, []);

    return result;
}

/**
 * Test cases for Problem 39: Combination Sum
 */
function testSolution() {
    console.log('Testing 39. Combination Sum');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => [...arr].sort((x, y) => x - y)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
        const sortedB = b.map(arr => [...arr].sort((x, y) => x - y)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Basic case
    const result1 = solve([2,3,6,7], 7);
    const expected1 = [[2,2,3], [7]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Multiple uses of same number
    const result2 = solve([2,3,5], 8);
    const expected2 = [[2,2,2,2], [2,3,3], [3,5]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single number
    const result3 = solve([2], 1);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Target equals candidate
    const result4 = solve([1], 1);
    const expected4 = [[1]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: No valid combinations
    const result5 = solve([5,6,7], 3);
    const expected5 = [];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 39. Combination Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 39. Combination Sum ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: candidates = [2,3,6,7], target = 7');
    console.log('Output:', JSON.stringify(solve([2,3,6,7], 7)));
    console.log('');

    console.log('Input: candidates = [2,3,5], target = 8');
    console.log('Output:', JSON.stringify(solve([2,3,5], 8)));

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
 * - Key difference from other combination problems: numbers can be reused
 * - Using same index 'i' in recursive call allows reusing the same number
 * - Sorting helps with pruning but isn't strictly necessary
 * - This pattern is useful for coin change and similar problems
 */
