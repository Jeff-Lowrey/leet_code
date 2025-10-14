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
 * Main solution for Problem 912: Sort An Array
 *
 * @param {number[]} nums - Array to sort
 * @return {number[]} - Sorted array
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function solve(nums) {
    // Base case: arrays of length 0 or 1 are already sorted
    if (nums.length <= 1) {
        return nums;
    }

    /**
     * Merge two sorted arrays
     * @param {number[]} left - First sorted array
     * @param {number[]} right - Second sorted array
     * @return {number[]} - Merged sorted array
     */
    function merge(left, right) {
        const result = [];
        let i = 0, j = 0;

        // Merge elements in sorted order
        while (i < left.length && j < right.length) {
            if (left[i] <= right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }

        // Add remaining elements from left (if any)
        while (i < left.length) {
            result.push(left[i]);
            i++;
        }

        // Add remaining elements from right (if any)
        while (j < right.length) {
            result.push(right[j]);
            j++;
        }

        return result;
    }

    /**
     * Merge sort implementation
     * @param {number[]} arr - Array to sort
     * @return {number[]} - Sorted array
     */
    function mergeSort(arr) {
        if (arr.length <= 1) {
            return arr;
        }

        // Divide
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        // Conquer and Combine
        return merge(mergeSort(left), mergeSort(right));
    }

    return mergeSort(nums);
}

/**
 * Test cases for Problem 912: Sort An Array
 */
function testSolution() {
    console.log('Testing 912. Sort An Array');

    // Test case 1: Example from problem
    const result1 = solve([5, 2, 3, 1]);
    const expected1 = [1, 2, 3, 5];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected ${JSON.stringify(expected1)}, got ${JSON.stringify(result1)}`);

    // Test case 2: Another example
    const result2 = solve([5, 1, 1, 2, 0, 0]);
    const expected2 = [0, 0, 1, 1, 2, 5];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected ${JSON.stringify(expected2)}, got ${JSON.stringify(result2)}`);

    // Test case 3: Single element
    const result3 = solve([42]);
    const expected3 = [42];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected ${JSON.stringify(expected3)}, got ${JSON.stringify(result3)}`);

    // Test case 4: Already sorted
    const result4 = solve([1, 2, 3, 4, 5]);
    const expected4 = [1, 2, 3, 4, 5];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected ${JSON.stringify(expected4)}, got ${JSON.stringify(result4)}`);

    // Test case 5: Reverse sorted
    const result5 = solve([5, 4, 3, 2, 1]);
    const expected5 = [1, 2, 3, 4, 5];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected ${JSON.stringify(expected5)}, got ${JSON.stringify(result5)}`);

    // Test case 6: Negative numbers
    const result6 = solve([-4, 0, 7, 4, 9, -5, -1]);
    const expected6 = [-5, -4, -1, 0, 4, 7, 9];
    console.assert(JSON.stringify(result6) === JSON.stringify(expected6),
        `Test 6 failed: expected ${JSON.stringify(expected6)}, got ${JSON.stringify(result6)}`);

    console.log('All test cases passed for 912. Sort An Array!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 912. Sort An Array ===');
    console.log('Category: Sorting');
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
 * - This solution focuses on sorting concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
