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
 * Main solution for Problem 78: Subsets
 *
 * @param {number[]} nums - Array of distinct integers
 * @return {number[][]} - All possible subsets
 *
 * Time Complexity: O(2^n * n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    const result = [];

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
 * Alternative solution using include/exclude pattern
 */
function solveIncludeExclude(nums) {
    const result = [];

    function backtrack(index, subset) {
        // Base case: processed all elements
        if (index === nums.length) {
            result.push([...subset]);
            return;
        }

        // Exclude current element
        backtrack(index + 1, subset);

        // Include current element
        subset.push(nums[index]);
        backtrack(index + 1, subset);
        subset.pop();
    }

    backtrack(0, []);
    return result;
}

/**
 * Iterative solution using bit manipulation
 */
function solveIterative(nums) {
    const result = [];
    const n = nums.length;
    const totalSubsets = 1 << n; // 2^n

    // Generate all numbers from 0 to 2^n - 1
    for (let i = 0; i < totalSubsets; i++) {
        const subset = [];

        // Check each bit of i
        for (let j = 0; j < n; j++) {
            // If j-th bit is set, include nums[j]
            if (i & (1 << j)) {
                subset.push(nums[j]);
            }
        }

        result.push(subset);
    }

    return result;
}

/**
 * Test cases for Problem 78: Subsets
 */
function testSolution() {
    console.log('Testing 78. Subsets');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => JSON.stringify([...arr].sort((x, y) => x - y))).sort();
        const sortedB = b.map(arr => JSON.stringify([...arr].sort((x, y) => x - y))).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Three elements
    const result1 = solve([1,2,3]);
    const expected1 = [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${expected1.length} subsets, got ${result1.length}`);

    // Test case 2: Single element
    const result2 = solve([0]);
    const expected2 = [[],[0]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Two elements
    const result3 = solve([1,2]);
    console.assert(result3.length === 4, // 2^2 = 4
        `Test 3 failed: expected 4 subsets, got ${result3.length}`);

    // Test case 4: Test include/exclude approach
    const result4 = solveIncludeExclude([1,2,3]);
    console.assert(arraysEqual(result4, expected1),
        `Test 4 (include/exclude) failed: expected ${expected1.length} subsets, got ${result4.length}`);

    // Test case 5: Test iterative approach
    const result5 = solveIterative([1,2,3]);
    console.assert(arraysEqual(result5, expected1),
        `Test 5 (iterative) failed: expected ${expected1.length} subsets, got ${result5.length}`);

    console.log('All test cases passed for 78. Subsets!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 78. Subsets ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: [1,2,3]');
    console.log('Output:', JSON.stringify(solve([1,2,3])));
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
    solveIncludeExclude,
    solveIterative,
    testSolution,
    demonstrateSolution
};

/**
 * Additional Notes:
 * - Three common approaches: backtracking, include/exclude, bit manipulation
 * - Power set of n elements has 2^n subsets
 * - Backtracking approach is most intuitive and extensible
 * - Bit manipulation approach is elegant but less flexible
 * - This pattern is fundamental for many subset-related problems
 */
