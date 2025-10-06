/**
 * 238. Product Of Array Except Self
 * Medium
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal to the
 * product of all the elements of nums except nums[i].
 *
 * SOLUTION EXPLANATION:
 *
 * INTUITION:
 * We need to calculate the product of all elements except the current one. A naive approach
 * would be O(n²), but we can optimize using left and right products in two passes.
 *
 * APPROACH:
 * 1. **Left pass**: Calculate product of all elements to the left of each position
 * 2. **Right pass**: Calculate product of all elements to the right and combine with left
 * 3. **Optimize space**: Use the result array to store left products, then modify in-place
 *
 * WHY THIS WORKS:
 * - For position i, we need: leftProduct[i] * rightProduct[i]
 * - First pass fills result with left products
 * - Second pass multiplies by right products in reverse order
 * - This avoids creating separate left/right arrays
 *
 * TIME COMPLEXITY: O(n) - two passes through the array
 * SPACE COMPLEXITY: O(1) - excluding the output array
 *
 * EXAMPLE WALKTHROUGH:
 * Input: [1,2,3,4]
 * Left pass: [1,1,2,6] (products of elements to the left)
 * Right pass: [24,12,8,6] (multiply by products from the right)
 * Output: [24,12,8,6]
 *
 * EDGE CASES:
 * - Array with zeros: handle carefully to avoid zero products
 * - Single element: return [1]
 * - Two elements: [b, a] for input [a, b]
 */

/**
 * Main solution for Problem 238: Product Of Array Except Self
 *
 * @param {number[]} nums - Array of integers
 * @return {number[]} - Array where each element is product of all other elements
 *
 * Time Complexity: O(n) - two passes through the array
 * Space Complexity: O(1) - excluding the output array
 */
function solve(nums) {
    const n = nums.length;
    const result = new Array(n);

    // First pass: calculate products of all elements to the left of each position
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
        result[i] = leftProduct;
        leftProduct *= nums[i];
    }

    // Second pass: calculate products of all elements to the right and combine
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
        result[i] *= rightProduct;
        rightProduct *= nums[i];
    }

    return result;
}

/**
 * Test cases for Problem 238: Product Of Array Except Self
 */
function testSolution() {
    console.log('Testing 238. Product Of Array Except Self');

    // Test case 1: Basic example
    const result1 = solve([1, 2, 3, 4]);
    const expected1 = [24, 12, 8, 6];
    console.assert(JSON.stringify(result1) === JSON.stringify(expected1),
        `Test 1 failed: expected [${expected1}], got [${result1}]`);

    // Test case 2: Array with zero
    const result2 = solve([-1, 1, 0, -3, 3]);
    const expected2 = [0, 0, 9, 0, 0];
    console.assert(JSON.stringify(result2) === JSON.stringify(expected2),
        `Test 2 failed: expected [${expected2}], got [${result2}]`);

    // Test case 3: Two elements
    const result3 = solve([2, 3]);
    const expected3 = [3, 2];
    console.assert(JSON.stringify(result3) === JSON.stringify(expected3),
        `Test 3 failed: expected [${expected3}], got [${result3}]`);

    // Test case 4: Single element
    const result4 = solve([5]);
    const expected4 = [1];
    console.assert(JSON.stringify(result4) === JSON.stringify(expected4),
        `Test 4 failed: expected [${expected4}], got [${result4}]`);

    // Test case 5: All same elements
    const result5 = solve([2, 2, 2, 2]);
    const expected5 = [8, 8, 8, 8];
    console.assert(JSON.stringify(result5) === JSON.stringify(expected5),
        `Test 5 failed: expected [${expected5}], got [${result5}]`);

    console.log('All test cases passed for 238. Product Of Array Except Self!');
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
    console.log('\n=== Problem 238. Product Of Array Except Self ===');
    console.log('Category: Arrays Hashing');
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
 * - This solution achieves O(1) space complexity by using the output array cleverly
 * - The division approach would be simpler but fails when there are zeros
 * - This two-pass approach handles all edge cases including multiple zeros
 * - The technique can be adapted for similar left-right product problems
 */