/**
 * 496. Next
 * Medium
 *
 * Next Greater Element Implementation This implementation provides functions to find the next greater element for elements in an array. For each element, it finds the first greater element that comes after it in the array. Time Complexity: O(n) where n is the length of the input array Space Complexity: O(n) for the stack storage
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### INTUITION:
 * The key insight for solving Next is to understand the core problem pattern
 * and apply the most efficient algorithmic approach.
 *
 * ### APPROACH:
 * 1. Analyze the problem requirements
 * 2. Choose the optimal data structure
 * 3. Implement the solution step by step
 * 4. Handle edge cases appropriately
 *
 * ### WHY THIS WORKS:
 * This approach works because it leverages the fundamental properties of the problem
 * to achieve an efficient solution.
 *
 * ### EXAMPLE WALKTHROUGH:
 * For a typical input, the algorithm processes the data systematically
 * to produce the expected output.
 *
 * </details>
 */

/**
 * Next Greater Element Implementation
 * 
 * This implementation provides functions to find the next greater element
 * for elements in an array. For each element, it finds the first greater
 * element that comes after it in the array.
 * 
 * Time Complexity: O(n) where n is the length of the input array
 * Space Complexity: O(n) for the stack storage
 */

/**
 * Finds the next greater element for each element in the array
 * @param {number[]} nums - Input array of numbers
 * @returns {number[]} Array containing next greater elements
 */
function findNextGreater(nums) {
    if (!nums || nums.length === 0) {
        return [];
    }

    const n = nums.length;
    const result = new Array(n).fill(-1); // Initialize result array with -1
    const stack = []; // Stack to keep track of indices

    // Process all elements from right to left
    for (let i = n - 1; i >= 0; i--) {
        // Remove elements from stack that are smaller than current element
        while (stack.length > 0 && nums[stack[stack.length - 1]] <= nums[i]) {
            stack.pop();
        }

        // If stack is not empty, top element is the next greater element
        if (stack.length > 0) {
            result[i] = nums[stack[stack.length - 1]];
        }

        // Push current index to stack
        stack.push(i);
    }

    return result;
}

/**
 * Finds the next greater element for elements in nums1 with reference to nums2
 * @param {number[]} nums1 - First array
 * @param {number[]} nums2 - Second array (reference array)
 * @returns {number[]} Array containing next greater elements
 */
function nextGreaterElement(nums1, nums2) {
    if (!nums1 || !nums2 || nums1.length === 0 || nums2.length === 0) {
        return [];
    }

    // Create map to store next greater elements for nums2
    const nextGreaterMap = new Map();
    const stack = [];

    // Process nums2 to find next greater elements
    for (let i = nums2.length - 1; i >= 0; i--) {
        while (stack.length > 0 && stack[stack.length - 1] <= nums2[i]) {
            stack.pop();
        }
        nextGreaterMap.set(nums2[i], stack.length === 0 ? -1 : stack[stack.length - 1]);
        stack.push(nums2[i]);
    }

    // Create result array for nums1 using the map
    return nums1.map(num => nextGreaterMap.get(num));
}

// Example usage and test cases
function runTests() {
    // Test Case 1: Basic array
    console.log("Test 1:", findNextGreater([4, 5, 2, 10, 8]));
    // Expected: [5, 10, 10, -1, -1]

    // Test Case 2: Array with duplicates
    console.log("Test 2:", findNextGreater([1, 1, 1, 1]));
    // Expected: [-1, -1, -1, -1]

    // Test Case 3: Empty array
    console.log("Test 3:", findNextGreater([]));
    // Expected: []

    // Test Case 4: Next Greater Element II (with two arrays)
    console.log("Test 4:", nextGreaterElement([4, 1, 2], [1, 3, 4, 2]));
    // Expected: [-1, 3, -1]
}

// Export functions for external use
module.exports = {
    findNextGreater,
    nextGreaterElement
};

// Uncomment to run tests
// runTests();