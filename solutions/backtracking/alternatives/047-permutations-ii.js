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
 * - **[Edge case 1]:** [how it's handled]
 * - **[Edge case 2]:** [how it's handled]
 *
 * </details>
 */

/**
 * Main solution for Problem 047: Permutations II
 *
 * @param {number[]} nums - Array of numbers that might contain duplicates
 * @return {number[][]} - Array of all unique permutations
 *
 * Time Complexity: O(n × n!) in worst case (all distinct), O(n × unique_perms) with duplicates
 * Space Complexity: O(n) for recursion depth and used array
 */
function solve(nums) {
    // Handle edge cases
    if (!nums || nums.length === 0) {
        return [[]];
    }

    // Sort array to enable duplicate detection
    nums.sort((a, b) => a - b);

    const result = [];
    const used = new Array(nums.length).fill(false);

    /**
     * Backtracking helper function
     * @param {number[]} currentPermutation - Current permutation being built
     */
    function backtrack(currentPermutation) {
        // Base case: we've used all elements
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]); // Make a copy
            return;
        }

        // Try each unused element at the current position
        for (let i = 0; i < nums.length; i++) {
            // Skip if element is already used
            if (used[i]) {
                continue;
            }

            // Skip duplicates: only use duplicate elements in order
            // If current element equals previous element and previous element is not used,
            // skip current element to avoid duplicate permutations
            if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
                continue;
            }

            // Choose: add current element to permutation
            currentPermutation.push(nums[i]);
            used[i] = true;

            // Explore: recursively build the rest of the permutation
            backtrack(currentPermutation);

            // Unchoose: remove current element and mark as unused (backtrack)
            currentPermutation.pop();
            used[i] = false;
        }
    }

    // Start backtracking with empty permutation
    backtrack([]);

    return result;
}

/**
 * Test cases for Problem 047: Permutations II
 */
function testSolution() {
    console.log('Testing 047. Permutations II');

    // Helper function to sort permutations for comparison
    function sortPermutations(permutations) {
        return permutations
            .map(perm => [...perm])
            .sort((a, b) => {
                for (let i = 0; i < Math.min(a.length, b.length); i++) {
                    if (a[i] !== b[i]) return a[i] - b[i];
                }
                return a.length - b.length;
            });
    }

    // Helper function to compare arrays of arrays
    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        const sorted1 = sortPermutations(arr1);
        const sorted2 = sortPermutations(arr2);
        return JSON.stringify(sorted1) === JSON.stringify(sorted2);
    }

    // Test case 1: Basic functionality with duplicates
    const result1 = solve([1, 1, 2]);
    const expected1 = [[1,1,2], [1,2,1], [2,1,1]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Three duplicates
    const result2 = solve([1, 2, 1, 1]);
    const expected2 = [[1,1,1,2], [1,1,2,1], [1,2,1,1], [2,1,1,1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: All elements are the same
    const result3 = solve([1, 1, 1]);
    const expected3 = [[1, 1, 1]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: No duplicates (should work like Permutations I)
    const result4 = solve([1, 2, 3]);
    const expected4 = [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Empty array
    const result5 = solve([]);
    const expected5 = [[]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Single element
    const result6 = solve([1]);
    const expected6 = [[1]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    // Test case 7: Check all permutations are unique
    const result7 = solve([1, 1, 2, 2]);
    const uniquePermutations = new Set(result7.map(perm => JSON.stringify(perm)));
    console.assert(uniquePermutations.size === result7.length,
        `Test 7 failed: found duplicate permutations`);

    console.log('All test cases passed for 047. Permutations II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 047. Permutations Ii ===');
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
