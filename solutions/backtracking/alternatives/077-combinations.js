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
 * Main solution for Problem 077: Combinations
 *
 * @param {number} n - Range of numbers to choose from [1, n]
 * @param {number} k - Number of elements in each combination
 * @return {number[][]} - Array of all possible combinations
 *
 * Time Complexity: O(C(n,k) * k) = O(n! / (k!(n-k)!) * k) for generating and copying combinations
 * Space Complexity: O(k) for recursion depth and current combination
 */
function solve(n, k) {
    // Handle edge cases
    if (k === 0) return [[]];
    if (k > n || n <= 0) return [];
    if (k === n) return [Array.from({length: n}, (_, i) => i + 1)];

    const result = [];

    /**
     * Backtracking helper function
     * @param {number} start - Starting number for current level (to avoid duplicates)
     * @param {number[]} currentCombination - Current combination being built
     */
    function backtrack(start, currentCombination) {
        // Base case: we have k elements in current combination
        if (currentCombination.length === k) {
            result.push([...currentCombination]); // Make a copy
            return;
        }

        // Pruning: if remaining numbers can't fill remaining slots, stop
        const remaining = k - currentCombination.length;
        const available = n - start + 1;
        if (available < remaining) {
            return;
        }

        // Try each number from start to n
        for (let i = start; i <= n; i++) {
            // Choose: add current number to combination
            currentCombination.push(i);

            // Explore: recursively build rest of combination
            // Note: use i+1 as start to avoid duplicates and ensure ascending order
            backtrack(i + 1, currentCombination);

            // Unchoose: remove current number (backtrack)
            currentCombination.pop();
        }
    }

    // Start backtracking from number 1
    backtrack(1, []);

    return result;
}

/**
 * Test cases for Problem 077: Combinations
 */
function testSolution() {
    console.log('Testing 077. Combinations');

    // Helper function to sort combinations for comparison
    function sortCombinations(combinations) {
        return combinations
            .map(combo => [...combo].sort((a, b) => a - b))
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
        const sorted1 = sortCombinations(arr1);
        const sorted2 = sortCombinations(arr2);
        return JSON.stringify(sorted1) === JSON.stringify(sorted2);
    }

    // Helper function to calculate C(n,k)
    function combination(n, k) {
        if (k === 0 || k === n) return 1;
        if (k > n) return 0;
        let result = 1;
        for (let i = 0; i < k; i++) {
            result = result * (n - i) / (i + 1);
        }
        return Math.round(result);
    }

    // Test case 1: Basic functionality n=4, k=2
    const result1 = solve(4, 2);
    const expected1 = [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: n=1, k=1
    const result2 = solve(1, 1);
    const expected2 = [[1]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: k=0 (edge case)
    const result3 = solve(4, 0);
    const expected3 = [[]];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: k > n (edge case)
    const result4 = solve(2, 3);
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: k = n
    const result5 = solve(3, 3);
    const expected5 = [[1, 2, 3]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Check count matches C(n,k)
    const result6 = solve(5, 3);
    const expected6Count = combination(5, 3); // C(5,3) = 10
    console.assert(result6.length === expected6Count,
        `Test 6 failed: expected ${expected6Count} combinations, got ${result6.length}`);

    // Test case 7: All combinations are unique and have correct length
    const result7 = solve(4, 2);
    const uniqueCombinations = new Set(result7.map(combo => JSON.stringify(combo)));
    console.assert(uniqueCombinations.size === result7.length,
        `Test 7 failed: found duplicate combinations`);

    result7.forEach((combo, index) => {
        console.assert(combo.length === 2,
            `Test 7 failed: combination ${index} should have length 2, got ${combo.length}`);
        console.assert(combo[0] < combo[1],
            `Test 7 failed: combination ${index} should be in ascending order`);
    });

    // Test case 8: Larger case n=6, k=4
    const result8 = solve(6, 4);
    const expected8Count = combination(6, 4); // C(6,4) = 15
    console.assert(result8.length === expected8Count,
        `Test 8 failed: expected ${expected8Count} combinations, got ${result8.length}`);

    console.log('All test cases passed for 077. Combinations!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 077. Combinations ===');
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
