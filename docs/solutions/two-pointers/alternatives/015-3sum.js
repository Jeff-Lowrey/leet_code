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
 * Main solution for Problem 015: 3Sum
 *
 * @param {number[]} nums - Array of integers
 * @return {number[][]} - Array of unique triplets that sum to zero
 *
 * Time Complexity: O(n²)
 * - O(n log n) for sorting
 * - O(n²) for nested loops with two pointers
 * - Overall: O(n²)
 * Space Complexity: O(1)
 * - Excluding output space, only using constant extra space
 * - Sorting can be done in-place
 */
function solve(nums) {
    // Edge case: need at least 3 numbers
    if (!nums || nums.length < 3) {
        return [];
    }

    const result = [];

    // Sort the array to enable two-pointer technique and skip duplicates
    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        // Skip duplicate values for the first number
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue;
        }

        // If the smallest number is positive, no triplet can sum to 0
        if (nums[i] > 0) {
            break;
        }

        // Two pointers approach for the remaining array
        let left = i + 1;
        let right = nums.length - 1;
        const target = -nums[i];

        while (left < right) {
            const sum = nums[left] + nums[right];

            if (sum === target) {
                result.push([nums[i], nums[left], nums[right]]);

                // Skip duplicates for the second number
                while (left < right && nums[left] === nums[left + 1]) {
                    left++;
                }
                // Skip duplicates for the third number
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

    return result;
}

/**
 * Test cases for Problem 015: 3Sum
 */
function testSolution() {
    console.log('Testing 015. 3Sum');

    // Helper function to compare arrays of arrays
    const arraysEqual = (a, b) => {
        if (a.length !== b.length) return false;
        const sortedA = a.map(arr => arr.slice().sort((x, y) => x - y)).sort();
        const sortedB = b.map(arr => arr.slice().sort((x, y) => x - y)).sort();
        return JSON.stringify(sortedA) === JSON.stringify(sortedB);
    };

    // Test case 1: Example from problem
    const result1 = solve([-1, 0, 1, 2, -1, -4]);
    const expected1 = [[-1, -1, 2], [-1, 0, 1]];
    console.assert(arraysEqual(result1, expected1), `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);
    console.log(`Test 1 passed: threeSum([-1,0,1,2,-1,-4]) = ${JSON.stringify(result1)}`);

    // Test case 2: No solution
    const result2 = solve([0, 1, 1]);
    const expected2 = [];
    console.assert(arraysEqual(result2, expected2), `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);
    console.log(`Test 2 passed: threeSum([0,1,1]) = ${JSON.stringify(result2)}`);

    // Test case 3: All zeros
    const result3 = solve([0, 0, 0]);
    const expected3 = [[0, 0, 0]];
    console.assert(arraysEqual(result3, expected3), `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);
    console.log(`Test 3 passed: threeSum([0,0,0]) = ${JSON.stringify(result3)}`);

    // Test case 4: Multiple solutions with duplicates
    const result4 = solve([-2, 0, 0, 2, 2]);
    const expected4 = [[-2, 0, 2]];
    console.assert(arraysEqual(result4, expected4), `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);
    console.log(`Test 4 passed: threeSum([-2,0,0,2,2]) = ${JSON.stringify(result4)}`);

    // Test case 5: Edge case - less than 3 elements
    const result5 = solve([1, 2]);
    const expected5 = [];
    console.assert(arraysEqual(result5, expected5), `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);
    console.log(`Test 5 passed: threeSum([1,2]) = ${JSON.stringify(result5)}`);

    console.log('All test cases passed for 015. 3Sum!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 015. 3Sum ===');
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
