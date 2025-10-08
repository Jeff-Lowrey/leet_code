/**
 * 969. Pancake Sorting
 * Medium
 *
 * This problem demonstrates key concepts in Sorting.
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * Sort an array using only pancake flips, where a flip reverses the first k elements.
 * The strategy is similar to selection sort: find the maximum element, move it to
 * the front (if needed), then flip it to its correct position at the end.
 *
 * APPROACH:
 * For each position from the end:
 * 1. Find the index of the maximum element in the unsorted portion
 * 2. If it's not at the beginning, flip to bring it to the front
 * 3. Flip again to move it to its correct position
 * 4. Repeat for the next smaller element
 *
 * WHY THIS WORKS:
 * By repeatedly moving the largest unsorted element to its final position,
 * we sort the array. Each element requires at most 2 flips (one to bring to front,
 * one to move to position), so we use at most 2n flips.
 *
 * TIME COMPLEXITY: O(n^2) - n iterations, each finding max and flipping
 * SPACE COMPLEXITY: O(n) - for storing the flip operations
 *
 * EXAMPLE WALKTHROUGH:
 * Input: arr = [3,2,4,1]
 * Step 1: Find max in [3,2,4,1] -> 4 at index 2
 *   Flip first 3 elements: [4,2,3,1], record k=3
 *   Flip first 4 elements: [1,3,2,4], record k=4
 * Step 2: Find max in [1,3,2] -> 3 at index 1
 *   Flip first 2 elements: [3,1,2,4], record k=2
 *   Flip first 3 elements: [2,1,3,4], record k=3
 * Step 3: Find max in [2,1] -> 2 at index 0
 *   Already at front, flip first 2: [1,2,3,4], record k=2
 * Step 4: Array sorted, element 1 is in position
 * Output: [3,4,2,3,2]
 *
 * EDGE CASES:
 * - Already sorted: returns empty array
 * - Single element: returns empty array
 * - Max already in position: only needs one flip or none
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
