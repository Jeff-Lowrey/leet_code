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
 * Main solution for Problem 018: 4Sum
 *
 * @param {number[]} nums - Array of integers
 * @param {number} target - Target sum
 * @return {number[][]} - Array of unique quadruplets that sum to target
 *
 * Time Complexity: O(n³)
 * Space Complexity: O(1)
 */
function solve(nums, target) {
    // Edge case: need at least 4 numbers
    if (!nums || nums.length < 4) {
        return [];
    }

    const result = [];
    const n = nums.length;

    // Sort the array to enable two-pointer technique and skip duplicates
    nums.sort((a, b) => a - b);

    for (let i = 0; i < n - 3; i++) {
        // Skip duplicate values for the first number
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        for (let j = i + 1; j < n - 2; j++) {
            // Skip duplicate values for the second number
            if (j > i + 1 && nums[j] === nums[j - 1]) {
                continue;
            }

            // Two pointers approach for the remaining array
            let left = j + 1;
            let right = n - 1;

            while (left < right) {
                const sum = nums[i] + nums[j] + nums[left] + nums[right];

                if (sum === target) {
                    result.push([nums[i], nums[j], nums[left], nums[right]]);

                    // Skip duplicates for the third number
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    // Skip duplicates for the fourth number
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }

                    left++;
                    right--;
                } else if (sum < target) {
                    left++;
                } else {
                    right--;
                }
            }
        }
    }

    return result;
}

/**
 * Test cases for Problem 018: 4Sum
 */
function testSolution() {
    console.log('Testing 018. 4Sum');

    // Helper function to compare arrays of arrays
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => arr.slice().sort((x, y) => x - y)).sort();
        const sortedB = b.map(arr => arr.slice().sort((x, y) => x - y)).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    // Test case 1: Example from problem
    const result1 = solve([1, 0, -1, 0, -2, 2], 0);
    const expected1 = [[-2, -1, 1, 2], [-2, 0, 0, 2], [-1, 0, 0, 1]];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);
    console.log(`Test 1 passed: fourSum([1,0,-1,0,-2,2], 0) = ${JSON.stringify(result1)}`);

    // Test case 2: No solution
    const result2 = solve([2, 2, 2, 2, 2], 8);
    const expected2 = [[2, 2, 2, 2]];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);
    console.log(`Test 2 passed: fourSum([2,2,2,2,2], 8) = ${JSON.stringify(result2)}`);

    // Test case 3: Edge case - less than 4 elements
    const result3 = solve([1, 2, 3], 6);
    const expected3 = [];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);
    console.log(`Test 3 passed: fourSum([1,2,3], 6) = ${JSON.stringify(result3)}`);

    // Test case 4: Another example
    const result4 = solve([2, 2, 2, 2, 2], 9);
    const expected4 = [];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);
    console.log(`Test 4 passed: fourSum([2,2,2,2,2], 9) = ${JSON.stringify(result4)}`);

    // Test case 5: Negative target
    const result5 = solve([-3, -1, 0, 2, 4, 5], 2);
    const expected5 = [[-3, -1, 2, 4]];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);
    console.log(`Test 5 passed: fourSum([-3,-1,0,2,4,5], 2) = ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 018. 4Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 018. 4Sum ===');
    console.log('Category: Two Pointers');
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
 * - This solution focuses on two pointers concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
