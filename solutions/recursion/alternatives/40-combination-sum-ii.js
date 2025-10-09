/**

 *
 * This problem demonstrates key concepts in Recursion.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Given an array of integers (may contain duplicates) and a target, find all unique
 * combinations where the numbers sum to target. Each number may be used only once.
 * The key challenge is avoiding duplicate combinations when the input contains duplicates.
 *
 * APPROACH:


 *    - For each candidate, decide to include it or skip it
 *    - Skip duplicate candidates at the same recursion level
 *    - Move to next index after including a number (use only once)

 *    - If current number equals previous and we didn't use previous, skip current
 *    - This ensures we don't create duplicate combinations
 *
 * WHY THIS WORKS:
 * - Sorting enables duplicate detection by grouping same numbers
 * - Skipping duplicates at same level prevents duplicate combinations
 * - Moving to next index ensures each number used at most once
 *
 * TIME COMPLEXITY: O(2^n) - each element can be included or excluded
 * SPACE COMPLEXITY: O(n) - recursion depth
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * After sorting: [1,1,2,5,6,7,10]
 *
 * Explore combinations:
 * [1,1,6] -> sum = 8 (valid!)
 * [1,2,5] -> sum = 8 (valid!)
 * [1,7] -> sum = 8 (valid!)
 * [2,6] -> sum = 8 (valid!)
 *
 * Note: Duplicates like [1,1,6] from different 1's are prevented by skipping logic
 * Output: [[1,1,6], [1,2,5], [1,7], [2,6]]
 * ```
 *
 * EDGE CASES:
 * - Empty candidates array
 * - All duplicates
 * - No valid combinations
 * - Target equals single candidate
 */

/**
 * Main solution for Problem 40: Combination Sum II
 *
 * @param {number[]} candidates - Array of integers (may contain duplicates)
 * @param {number} target - Target sum
 * @return {number[][]} - All unique combinations that sum to target
 *
 * Time Complexity: O(2^n)
 * Space Complexity: O(n)
 */
function solve(candidates, target) {
    const result = [];

    // Sort to group duplicates and enable pruning
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
            // Skip duplicates at the same recursion level
            // If current element equals previous and we're not at start of this level
            if (i > start && candidates[i] === candidates[i - 1]) {
                continue;
            }

            const candidate = candidates[i];

            // Pruning: if adding this candidate exceeds target, stop
            // (works because array is sorted)
            if (currentSum + candidate > target) {
                break;
            }

            // Choose: add candidate to combination
            combination.push(candidate);

            // Explore: recurse with next index (each number used at most once)
            backtrack(i + 1, currentSum + candidate, combination);

            // Unchoose: backtrack
            combination.pop();
        }
    }

    // Start backtracking from index 0
    backtrack(0, 0, []);

    return result;
}

/**
 * Test cases for Problem 40: Combination Sum II
 */
function testSolution() {
    console.log('Testing 40. Combination Sum II');

    // Helper function to compare 2D arrays (order doesn't matter)
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => [...arr].sort((x, y) => x - y)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
        const sortedB = b.map(arr => [...arr].sort((x, y) => x - y)).sort((x, y) => JSON.stringify(x).localeCompare(JSON.stringify(y)));
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    }

    // Test case 1: Array with duplicates
    const result1 = solve([10,1,2,7,6,1,5], 8);
    const expected1 = [[1,1,6], [1,2,5], [1,7], [2,6]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Multiple duplicates
    const result2 = solve([2,5,2,1,2], 5);
    const expected2 = [[1,2,2], [5]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No valid combinations
    const result3 = solve([2,3,5], 1);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Single element
    const result4 = solve([1], 1);
    const expected4 = [[1]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: All same numbers
    const result5 = solve([1,1,1,1], 2);
    const expected5 = [[1,1]];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 40. Combination Sum II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 40. Combination Sum II ===');
    console.log('Category: Recursion');
    console.log('Difficulty: Medium');
    console.log('');

    console.log('Input: candidates = [10,1,2,7,6,1,5], target = 8');
    console.log('Output:', JSON.stringify(solve([10,1,2,7,6,1,5], 8)));
    console.log('');

    console.log('Input: candidates = [2,5,2,1,2], target = 5');
    console.log('Output:', JSON.stringify(solve([2,5,2,1,2], 5)));

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
 * - Key difference from Combination Sum I: each number used at most once
 * - Sorting is crucial for efficient duplicate detection
 * - The duplicate-skipping logic (i > start && candidates[i] === candidates[i-1])
 *   ensures we only skip duplicates at the same recursion level
 * - This pattern is common in many backtracking problems with duplicates
 */
