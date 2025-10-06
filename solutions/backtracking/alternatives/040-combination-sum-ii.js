/**
 * 040. Combination Sum II
 * Medium
 *
 * Given a collection of candidate numbers (candidates) and a target number (target),
 * find all unique combinations in candidates where the candidate numbers sum to target.
 * Each number in candidates may only be used once in the combination.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is similar to Combination Sum I, but with two key differences:
 * 1. Each number can only be used once (not unlimited times)
 * 2. The input array may contain duplicates, and we need to avoid duplicate combinations
 * The challenge is to handle duplicates properly while ensuring each number is used at most once.
 *
 * APPROACH:
 * 1. **Sort the array**: Critical for duplicate handling and early termination
 * 2. **Backtracking with index advancement**: Move to next index after including/excluding
 * 3. **Skip duplicates**: When at same level, skip duplicate values to avoid duplicate combinations
 * 4. **Early termination**: If current sum exceeds target, stop exploring
 * 5. **Base case**: When sum equals target, add combination to results
 *
 * WHY THIS WORKS:
 * - Sorting enables duplicate detection and early termination
 * - Advancing index ensures each number is used at most once
 * - Skipping duplicates at same recursion level prevents duplicate combinations
 * - The choose/explore/unchoose pattern systematically explores all valid combinations
 *
 * TIME COMPLEXITY: O(2^N) in worst case, where N is the length of candidates
 * SPACE COMPLEXITY: O(target/min_candidate) for recursion depth and combination storage
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: candidates = [10,1,2,7,6,1,5], target = 8
 * After sorting: [1,1,2,5,6,7,10]
 * Step 1: Try first 1 -> [1], remaining target = 7
 * Step 2: Try second 1 -> [1,1], remaining target = 6
 * Step 3: Try 2 -> [1,1,2], remaining target = 4
 * Step 4: Try 5 -> [1,1,2,5], sum = 9 > 8, backtrack
 * Continue exploring: [1,1,6], [1,2,5], [1,7], [2,6] are valid
 * Skip duplicate 1s at same level to avoid duplicate combinations
 * Output: [[1,1,6],[1,2,5],[1,7],[2,6]]
 * ```
 *
 * EDGE CASES:
 * - Empty candidates array
 * - Target is 0 (return empty combination)
 * - No valid combinations exist
 * - All numbers are duplicates
 * - Single element equals target
 */

/**
 * Main solution for Problem 040: Combination Sum II
 *
 * @param {number[]} candidates - Array of candidate numbers (may contain duplicates)
 * @param {number} target - Target sum to achieve
 * @return {number[][]} - Array of all unique combinations that sum to target
 *
 * Time Complexity: O(2^N) in worst case, where N is the length of candidates
 * Space Complexity: O(target/min_candidate) for recursion depth and combination storage
 */
function solve(candidates, target) {
    // Handle edge cases
    if (!candidates || candidates.length === 0 || target <= 0) {
        return target === 0 ? [[]] : [];
    }

    // Sort candidates to enable duplicate handling and early termination
    candidates.sort((a, b) => a - b);

    const result = [];

    /**
     * Backtracking helper function
     * @param {number} startIndex - Current index in candidates array
     * @param {number[]} currentCombination - Current combination being built
     * @param {number} currentSum - Current sum of the combination
     */
    function backtrack(startIndex, currentCombination, currentSum) {
        // Base case: found a valid combination
        if (currentSum === target) {
            result.push([...currentCombination]); // Make a copy
            return;
        }

        // Pruning: if current sum exceeds target, stop exploring
        if (currentSum > target) {
            return;
        }

        // Try each candidate starting from startIndex
        for (let i = startIndex; i < candidates.length; i++) {
            const candidate = candidates[i];

            // Skip duplicates at the same recursion level
            // This prevents duplicate combinations like [1a,2] and [1b,2] where 1a and 1b are same value
            if (i > startIndex && candidates[i] === candidates[i - 1]) {
                continue;
            }

            // Early termination: if candidate alone exceeds remaining target
            if (currentSum + candidate > target) {
                break; // Since array is sorted, all subsequent candidates will also exceed
            }

            // Choose: add current candidate to combination
            currentCombination.push(candidate);

            // Explore: recursively try to complete the combination
            // Note: we use 'i + 1' because each number can only be used once
            backtrack(i + 1, currentCombination, currentSum + candidate);

            // Unchoose: remove current candidate (backtrack)
            currentCombination.pop();
        }
    }

    // Start backtracking from index 0
    backtrack(0, [], 0);

    return result;
}

/**
 * Test cases for Problem 040: Combination Sum II
 */
function testSolution() {
    console.log('Testing 040. Combination Sum II');

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

    // Test case 1: Basic functionality with duplicates
    const result1 = solve([10, 1, 2, 7, 6, 1, 5], 8);
    const expected1 = [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: All duplicates
    const result2 = solve([2, 5, 2, 1, 2], 5);
    const expected2 = [[1, 2, 2], [5]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No solution exists
    const result3 = solve([2, 4, 6], 3);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Target is 0
    const result4 = solve([1, 2], 0);
    const expected4 = [[]];
    console.assert(arraysEqual(result4, expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Empty candidates array
    const result5 = solve([], 5);
    const expected5 = [];
    console.assert(arraysEqual(result5, expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Single element equals target
    const result6 = solve([1], 1);
    const expected6 = [[1]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    // Test case 7: Multiple duplicates, single solution
    const result7 = solve([1, 1, 1, 1], 2);
    const expected7 = [[1, 1]];
    console.assert(arraysEqual(result7, expected7),
        `Test 7 failed: expected ${JSON.stringify(expected7)}, got ${JSON.stringify(result7)}`);

    console.log('All test cases passed for 040. Combination Sum II!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 040. Combination Sum Ii ===');
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
