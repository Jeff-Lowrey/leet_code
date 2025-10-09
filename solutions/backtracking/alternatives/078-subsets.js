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
 * Main solution for Problem 078: Subsets
 *
 * @param {number[]} nums - Array of unique integers
 * @return {number[][]} - Array of all possible subsets (power set)
 *
 * Time Complexity: O(n × 2^n) - 2^n subsets, each takes O(n) to copy
 * Space Complexity: O(n) - recursion depth
 */
function solve(nums) {
    // Handle edge cases
    if (!nums) return [];
    if (nums.length === 0) return [[]];

    const result = [];

    /**
     * Backtracking helper function
     * @param {number} index - Current index in nums array
     * @param {number[]} currentSubset - Current subset being built
     */
    function backtrack(index, currentSubset) {
        // Base case: we've considered all elements
        if (index === nums.length) {
            result.push([...currentSubset]); // Make a copy
            return;
        }

        // Choice 1: Exclude current element
        backtrack(index + 1, currentSubset);

        // Choice 2: Include current element
        currentSubset.push(nums[index]);
        backtrack(index + 1, currentSubset);
        currentSubset.pop(); // Backtrack
    }

    // Start backtracking from index 0
    backtrack(0, []);

    return result;
}

/**
 * Test cases for Problem 078: Subsets
 */
function testSolution() {
    console.log('Testing 078. Subsets');

    // Helper function to sort subsets for comparison
    function sortSubsets(subsets) {
        return subsets
            .map(subset => [...subset].sort((a, b) => a - b))
            .sort((a, b) => {
                if (a.length !== b.length) return a.length - b.length;
                for (let i = 0; i < a.length; i++) {
                    if (a[i] !== b[i]) return a[i] - b[i];
                }
                return 0;
            });
    }

    // Helper function to compare arrays of arrays
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = sortSubsets(arr1);
        const sorted2 = sortSubsets(arr2);
        return JSON.stringify(sorted1) === JSON.stringify(sorted2);
    }

    // Test case 1: Basic functionality - 3 elements
    const result1 = solve([1, 2, 3]);
    const expected1 = [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Two elements
    const result2 = solve([0, 1]);
    const expected2 = [[], [0], [1], [0,1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single element
    const result3 = solve([1]);
    const expected3 = [[], [1]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Empty array
    const result4 = solve([]);
    const expected4 = [[]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Check count is 2^n
    const result5 = solve([1, 2, 3, 4]);
    const expected5Count = Math.pow(2, 4); // 2^4 = 16
    console.assert(result5.length === expected5Count,
        `Test 5 failed: expected ${expected5Count} subsets, got ${result5.length}`);

    // Test case 6: All subsets are unique
    const result6 = solve([1, 2, 3]);
    const uniqueSubsets = new Set(result6.map(subset => JSON.stringify([...subset].sort())));
    console.assert(uniqueSubsets.size === result6.length,
        `Test 6 failed: found duplicate subsets`);

    // Test case 7: Contains empty subset
    const result7 = solve([1, 2]);
    const hasEmptySubset = result7.some(subset => subset.length === 0);
    console.assert(hasEmptySubset,
        `Test 7 failed: should contain empty subset`);

    // Test case 8: Contains full set
    const result8 = solve([1, 2, 3]);
    const hasFullSet = result8.some(subset => subset.length === 3 &&
        subset.includes(1) && subset.includes(2) && subset.includes(3));
    console.assert(hasFullSet,
        `Test 8 failed: should contain full set`);

    // Test case 9: Negative numbers
    const result9 = solve([-1, 0, 1]);
    const expected9Count = Math.pow(2, 3); // 2^3 = 8
    console.assert(result9.length === expected9Count,
        `Test 9 failed: expected ${expected9Count} subsets, got ${result9.length}`);

    console.log('All test cases passed for 078. Subsets!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 078. Subsets ===');
    console.log('Category: Backtracking');
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
 * - This solution focuses on backtracking concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
