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
 * Main solution for Problem 969: Pancake Sorting
 *
 * @param {number[]} arr - Array to sort using pancake flips
 * @return {number[]} - Sequence of k values for pancake flips
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
function solve(arr) {
    const result = [];
    const n = arr.length;

    /**
     * Flip the first k elements of the array
     * @param {number[]} arr - The array to modify
     * @param {number} k - Number of elements to flip
     */
    function flip(arr, k) {
        let left = 0;
        let right = k - 1;
        while (left < right) {
            [arr[left], arr[right]] = [arr[right], arr[left]];
            left++;
            right--;
        }
    }

    /**
     * Find the index of the maximum element in arr[0...end]
     * @param {number[]} arr - The array
     * @param {number} end - The ending index (inclusive)
     * @return {number} - Index of the maximum element
     */
    function findMaxIndex(arr, end) {
        let maxIdx = 0;
        for (let i = 1; i <= end; i++) {
            if (arr[i] > arr[maxIdx]) {
                maxIdx = i;
            }
        }
        return maxIdx;
    }

    // Sort the array by moving the largest element to its position each iteration
    for (let size = n; size > 1; size--) {
        // Find the index of the maximum element in the unsorted portion
        const maxIdx = findMaxIndex(arr, size - 1);

        // If max is already in its correct position, continue
        if (maxIdx === size - 1) {
            continue;
        }

        // If max is not at the beginning, flip it to the front
        if (maxIdx !== 0) {
            flip(arr, maxIdx + 1);
            result.push(maxIdx + 1);
        }

        // Flip to move the max element to its correct position
        flip(arr, size);
        result.push(size);
    }

    return result;
}

/**
 * Test cases for Problem 969: Pancake Sorting
 */
function testSolution() {
    console.log('Testing 969. Pancake Sorting');

    /**
     * Helper to verify that the flip sequence sorts the array
     * @param {number[]} arr - Original array
     * @param {number[]} flips - Sequence of flips
     * @return {boolean} - Whether the array is sorted after flips
     */
    function verifySolution(arr, flips) {
        const testArr = [...arr];

        function flip(arr, k) {
            let left = 0, right = k - 1;
            while (left < right) {
                [arr[left], arr[right]] = [arr[right], arr[left]];
                left++;
                right--;
            }
        }

        for (const k of flips) {
            flip(testArr, k);
        }

        // Check if sorted
        for (let i = 1; i < testArr.length; i++) {
            if (testArr[i] < testArr[i - 1]) return false;
        }
        return true;
    }

    // Test case 1: Example from problem
    const arr1 = [3, 2, 4, 1];
    const result1 = solve([...arr1]);
    console.log('Test 1 flips:', JSON.stringify(result1));
    console.assert(verifySolution(arr1, result1), 'Test 1 failed: array not sorted');
    console.assert(result1.length <= 10, 'Test 1 failed: too many flips');

    // Test case 2: Another example
    const arr2 = [1, 2, 3];
    const result2 = solve([...arr2]);
    console.log('Test 2 flips:', JSON.stringify(result2));
    console.assert(verifySolution(arr2, result2), 'Test 2 failed: array not sorted');

    // Test case 3: Reverse sorted
    const arr3 = [5, 4, 3, 2, 1];
    const result3 = solve([...arr3]);
    console.log('Test 3 flips:', JSON.stringify(result3));
    console.assert(verifySolution(arr3, result3), 'Test 3 failed: array not sorted');

    // Test case 4: Random order
    const arr4 = [3, 1, 4, 1, 5, 9, 2, 6];
    const result4 = solve([...arr4]);
    console.log('Test 4 flips:', JSON.stringify(result4));
    console.assert(verifySolution(arr4, result4), 'Test 4 failed: array not sorted');

    // Test case 5: Single element
    const arr5 = [1];
    const result5 = solve([...arr5]);
    console.assert(result5.length === 0, 'Test 5 failed: should have no flips');

    console.log('All test cases passed for 969. Pancake Sorting!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 969. Pancake Sorting ===');
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
