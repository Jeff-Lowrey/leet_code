/**
 * ### INTUITION:
 * The key insight is that for each position i, the product of all elements except nums[i] equals (product of all elements to the left of i) × (product of all elements to the right of i). We can calculate these prefix and suffix products in two passes without using division. First pass: build left products. Second pass: multiply by right products while traversing backwards.
 *
 * ### APPROACH:
 * 1. **First pass (left to right)**: Calculate prefix products - for each position i, store the product of all elements to its left in result[i]
 * 2. **Initialize left product**: Start with leftProduct = 1 (no elements to the left of index 0)
 * 3. **Second pass (right to left)**: Calculate suffix products and combine - traverse backwards, multiplying result[i] by the product of all elements to its right
 * 4. **Initialize right product**: Start with rightProduct = 1 (no elements to the right of last index)
 * 5. **Combine results**: result[i] already has left product, multiply it by right product to get final answer
 *
 * ### WHY THIS WORKS:
 * - This ensures that two-pass approach: left products then right products multiplied together gives product except self
 * - This ensures that first pass stores cumulative left products in result array
 * - This ensures that second pass computes right products on-the-fly and multiplies into existing result
 * - This ensures that avoids division operation while achieving O(n) time
 * - This ensures that o(1) extra space by using output array to store intermediate left products
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1, 2, 3, 4]
 * ```
 *
 * Step 1: Calculate left products
 * i=0: result[0] = 1 (no left elements)
 * left_product = 1 × 1 = 1
 * i=1: result[1] = 1 (product of left: 1)
 * left_product = 1 × 2 = 2
 * i=2: result[2] = 2 (product of left: 1×2)
 * left_product = 2 × 3 = 6
 * i=3: result[3] = 6 (product of left: 1×2×3)
 * left_product = 6 × 4 = 24
 * result = [1, 1, 2, 6]
 * Step 2: Calculate right products and combine
 * i=3: result[3] = 6 × 1 = 6 (no right elements)
 * right_product = 1 × 4 = 4
 * i=2: result[2] = 2 × 4 = 8 (right: 4)
 * right_product = 4 × 3 = 12
 * i=1: result[1] = 1 × 12 = 12 (right: 3×4)
 * right_product = 12 × 2 = 24
 * i=0: result[0] = 1 × 24 = 24 (right: 2×3×4)
 * right_product = 24 × 1 = 24
 * result = [24, 12, 8, 6]
 *
 * Output:
 * ```
 * [24, 12, 8, 6]
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)** - where n is the length of the array. We make exactly two passes through the array: one left-to-right pass to calculate prefix products (**O(n)**), and one right-to-left pass to calculate suffix products and combine them with the prefix products (**O(n)**). Each pass performs constant-time operations (multiplication and array access) for each element. Total: **O(n)** + **O(n)** = **O(2n)** = **O(n)**. This is optimal since we must examine every element at least once.
 *
 * ### SPACE COMPLEXITY:
 * O(1)** - We use only two variables (leftProduct and rightProduct) for tracking running products, regardless of input size. The result array is required for output and is not counted as extra space per the problem constraints. If we count the output array, the space complexity would be **O(n)**, but conventionally output space is excluded from space complexity analysis. This makes our solution optimal for space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 * 
 *
 * */

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
  console.log("Testing 238. Product Of Array Except Self");

  // Test case 1: Basic example
  const result1 = solve([1, 2, 3, 4]);
  const expected1 = [24, 12, 8, 6];
  console.assert(
    JSON.stringify(result1) === JSON.stringify(expected1),
    `Test 1 failed: expected [${expected1}], got [${result1}]`,
  );

  // Test case 2: Array with zero
  const result2 = solve([-1, 1, 0, -3, 3]);
  const expected2 = [0, 0, 9, 0, 0];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected [${expected2}], got [${result2}]`,
  );

  // Test case 3: Two elements
  const result3 = solve([2, 3]);
  const expected3 = [3, 2];
  console.assert(
    JSON.stringify(result3) === JSON.stringify(expected3),
    `Test 3 failed: expected [${expected3}], got [${result3}]`,
  );

  // Test case 4: Single element
  const result4 = solve([5]);
  const expected4 = [1];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected [${expected4}], got [${result4}]`,
  );

  // Test case 5: All same elements
  const result5 = solve([2, 2, 2, 2]);
  const expected5 = [8, 8, 8, 8];
  console.assert(
    JSON.stringify(result5) === JSON.stringify(expected5),
    `Test 5 failed: expected [${expected5}], got [${result5}]`,
  );

  console.log("All test cases passed for 238. Product Of Array Except Self!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 238. Product Of Array Except Self ===");
  console.log("Category: Arrays Hashing");
  console.log("Difficulty: Medium");
  console.log("");

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
  demonstrateSolution,
};

/**
 * Additional Notes:
 * - This solution achieves O(1) space complexity by using the output array cleverly
 * - The division approach would be simpler but fails when there are zeros
 * - This two-pass approach handles all edge cases including multiple zeros
 * - The technique can be adapted for similar left-right product problems
 */
