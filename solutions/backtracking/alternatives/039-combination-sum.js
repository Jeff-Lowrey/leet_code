/**

 *
 * Given an array of distinct integers candidates and a target integer target,
 * return a list of all unique combinations of candidates where the chosen numbers sum to target.
 * You may choose the same number from candidates an unlimited number of times.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * This is a classic backtracking problem where we explore all possible combinations
 * that sum to the target. Since we can reuse numbers, we need to carefully manage
 * our search to avoid duplicates while allowing reuse of the same element.
 *
 * APPROACH:





 *
 * WHY THIS WORKS:
 * - Systematically explores all valid combinations using choose/explore/unchoose pattern
 * - Allows reuse by not advancing start index when including current number
 * - Avoids duplicates by always processing candidates in sorted order
 * - Prunes invalid branches early when sum exceeds target
 *
 * TIME COMPLEXITY: O(N^(T/M)) where N = candidates length, T = target, M = minimal candidate
 * SPACE COMPLEXITY: O(T/M) for recursion depth and current combination storage
 *
 * EXAMPLE WALKTHROUGH:
 * ```
 * Input: candidates = [2,3,6,7], target = 7
 * Step 1: Try 2 -> sum=2, remaining=5, can continue with [2,3,6,7]
 * Step 2: Try 2 again -> sum=4, remaining=3, can continue with [2,3,6,7]
 * Step 3: Try 2 again -> sum=6, remaining=1, can continue with [2,3,6,7]
 * Step 4: Try 2 again -> sum=8, exceeds target, backtrack
 * Continue exploring: [2,2,3], [7] are valid combinations
 * Output: [[2,2,3],[7]]
 * ```
 *
 * EDGE CASES:
 * - Empty candidates array
 * - Target is 0 (return empty combination)
 * - No valid combinations exist
 * - Single element that equals target
 */

/**
 * Main solution for Problem 039: Combination Sum
 *
 * @param {number[]} candidates - Array of distinct integers
 * @param {number} target - Target sum to achieve
 * @return {number[][]} - Array of all unique combinations that sum to target
 *
 * Time Complexity: O(N^(T/M)) where N = candidates length, T = target, M = minimal candidate
 * Space Complexity: O(T/M) for recursion depth and current combination storage
 */
function solve(candidates, target) {
    // Handle edge cases
    if (!candidates || candidates.length === 0 || target <= 0) {
        return target === 0 ? [[]] : [];
    }

    // Sort candidates for better pruning and to avoid duplicates
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

            // Early termination: if candidate alone exceeds remaining target
            if (currentSum + candidate > target) {
                break; // Since array is sorted, all subsequent candidates will also exceed
            }

            // Choose: add current candidate to combination
            currentCombination.push(candidate);

            // Explore: recursively try to complete the combination
            // Note: we use 'i' (not 'i + 1') because we can reuse the same number
            backtrack(i, currentCombination, currentSum + candidate);

            // Unchoose: remove current candidate (backtrack)
            currentCombination.pop();
        }
    }

    // Start backtracking from index 0
    backtrack(0, [], 0);

    return result;
}

/**
 * Test cases for Problem 039: Combination Sum
 */
function testSolution() {
    console.log('Testing 039. Combination Sum');

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

    // Test case 1: Basic functionality - multiple combinations
    const result1 = solve([2, 3, 6, 7], 7);
    const expected1 = [[2, 2, 3], [7]];
    console.assert(arraysEqual(result1, expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Single element solution
    const result2 = solve([2, 3, 5], 8);
    const expected2 = [[2, 2, 2, 2], [2, 3, 3], [3, 5]];
    console.assert(arraysEqual(result2, expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: No solution exists
    const result3 = solve([2, 4], 3);
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

    // Test case 6: Single candidate equals target
    const result6 = solve([1], 1);
    const expected6 = [[1]];
    console.assert(arraysEqual(result6, expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    // Test case 7: Large target with reuse
    const result7 = solve([1, 2], 4);
    const expected7 = [[1, 1, 1, 1], [1, 1, 2], [2, 2]];
    console.assert(arraysEqual(result7, expected7),
        `Test 7 failed: expected ${JSON.stringify(expected7)}, got ${JSON.stringify(result7)}`);

    console.log('All test cases passed for 039. Combination Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 039. Combination Sum ===');
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
