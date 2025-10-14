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
 * - **Single element:** Special case for minimal input
 * - **All same values:** Check for duplicate handling
 * - **Negative numbers:** Ensure algorithm works with negatives
 * - **Large arrays:** Consider O(n) vs O(n²) performance
 *
 * </details>
 */

/**
 * Main solution for Problem 90: Subsets II
 *
 * @param {number[]} nums - Array of integers (may contain duplicates)
 * @return {number[][]} - All unique subsets
 *
 * Time Complexity: O(2^n * n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    const result = [];

    // Sort to group duplicates together
    nums.sort((a, b) => a - b);

    /**
     * Backtracking helper function
     * @param {number} start - Starting index in nums array
     * @param {number[]} subset - Current subset being built
     */
    function backtrack(start, subset) {
        // Add current subset to results
        result.push([...subset]);

        // Try adding each remaining number
        for (let i = start; i < nums.length; i++) {
            // Skip duplicates at the same recursion level
            // If current element equals previous and we're not at start, skip
            if (i > start && nums[i] === nums[i - 1]) {
                continue;
            }

            // Choose: add number to subset
            subset.push(nums[i]);

            // Explore: recurse with next index
            backtrack(i + 1, subset);

            // Unchoose: backtrack
            subset.pop();
        }
    }

    // Start backtracking from index 0 with empty subset
    backtrack(0, []);

    return result;
}

/**
 * Test cases for Problem 90: Subsets II
 */
function testSolution() {
    console.log('Testing 90. Subsets II');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => JSON.stringify([...arr])).sort();
        const sortedB = b.map(arr => JSON.stringify([...arr])).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Array with duplicates
    const result1 = solve([1,2,2]);
    const expected1 = [[],[1],[1,2],[1,2,2],[2],[2,2]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: All same elements
    const result2 = solve([1,1,1]);
    const expected2 = [[],[1],[1,1],[1,1,1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Multiple different duplicates
    const result3 = solve([4,4,4,1,4]);
    // Should have subsets with 0 to 4 4's, each potentially with or without 1
    console.assert(result3.length === 10, // 5 choices for number of 4's * 2 choices for 1
        `Test 3 failed: expected 10 unique subsets, got ${result3.length}`);

    // Test case 4: No duplicates
    const result4 = solve([1,2,3]);
    console.assert(result4.length === 8, // 2^3 = 8
        `Test 4 failed: expected 8 subsets, got ${result4.length}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = [[]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 90. Subsets II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 90. Subsets II ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: [1,2,2]');
    console.log('Output:', JSON.stringify(solve([1,2,2])));
    console.log('');

    console.log('Input: [0]');
    console.log('Output:', JSON.stringify(solve([0])));

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
 * - Key difference from Subsets I: handling duplicate values
 * - The duplicate-skipping condition is crucial: i > start && nums[i] === nums[i-1]
 * - Sorting is essential for this approach to work correctly
 * - This pattern combines subset generation with duplicate handling
 * - Similar technique used in Combination Sum II and Permutations II
 */
