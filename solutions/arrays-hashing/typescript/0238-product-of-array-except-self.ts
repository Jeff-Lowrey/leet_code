/**
 * # 0238. Product Of Array Except Self
 *
 * Difficulty: Medium
 *
 *
 * Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].
 *
 * The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.
 *
 * You must write an algorithm that runs in O(n) time and without using the division operation.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>[1, 2, 3, 4]</dd>
 * <dt>Output:</dt>
 * <dd>[24, 12, 8, 6]</dd>
 * <dt>Explanation:</dt>
 * <dd>The product array excluding self is [24,12,8,6] for input [1,2,3,4]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
 *
 * ### METADATA:
 * **Techniques**: Array Traversal, Prefix Product, Suffix Product
 * **Data Structures**: Array
 * **Patterns**: Two Pass Pattern
 * **Time Complexity**: O(n) - Two passes through input
 * **Space Complexity**: O(1) - Constant extra space (excluding output array)
 *
 * ### INTUITION:
 * The product except self equals (product of all elements to the left) × (product of all elements to the right). Build the result array in two passes: first pass calculates cumulative left products, second pass calculates right products and multiplies them in-place.
 *
 * ### APPROACH:
 * 1. **Initialize result array**: Create result array of size n filled with 1s
 * 2. **Calculate left products**: Initialize left_product = 1, iterate left-to-right through nums
 * 3. **Store left products**: For each index i, set result[i] = left_product, then update left_product *= nums[i]
 * 4. **Calculate right products**: Initialize right_product = 1, iterate right-to-left through nums
 * 5. **Combine with right products**: For each index i, multiply result[i] *= right_product, then update right_product *= nums[i]
 * 6. **Return result**: The result array now contains products of all elements except self at each position
 *
 * ### WHY THIS WORKS:
 * - Two-pass approach: left products then right products multiplied together gives product except self
 * - First pass stores cumulative left products in result array
 * - Second pass computes right products on-the-fly and multiplies into existing result
 * - Avoids division operation while achieving O(n) time
 * - O(1) extra space by using output array to store intermediate left products
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

 * ### TIME COMPLEXITY:
 * O(n)
 * - Two passes through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space (excluding output array)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class Solution {
  /**
   * Calculate product of all elements except self for each position.
   *
   * Time Complexity: O(n)
   * Space Complexity: O(1) - excluding the output array
   */
  productExceptSelf(nums: number[]): number[] {
    const n = nums.length;
    // Initialize output array with 1s
    const result = new Array(n).fill(1);

    // Calculate products of all elements to the left of each position
    let leftProduct = 1;
    for (let i = 0; i < n; i++) {
      result[i] = leftProduct;
      leftProduct *= nums[i];
    }

    // Calculate products of all elements to the right and combine with left products
    let rightProduct = 1;
    for (let i = n - 1; i >= 0; i--) {
      result[i] *= rightProduct;
      rightProduct *= nums[i];
    }

    return result;
  }
}

// Test cases
if (typeof module !== "undefined" && module.exports) {
  module.exports = Solution;
}

function runTests(): void {
  const solution = new Solution();

  // Test case 1: Example from problem
  const result1 = solution.productExceptSelf([1, 2, 3, 4]);
  const expected1 = [24, 12, 8, 6];
  console.log(`Test 1: ${JSON.stringify(result1) === JSON.stringify(expected1) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [1, 2, 3, 4]`);
  console.log(`  Expected: ${JSON.stringify(expected1)}`);
  console.log(`  Got: ${JSON.stringify(result1)}`);

  // Test case 2: Array with negative numbers
  const result2 = solution.productExceptSelf([-1, 1, 0, -3, 3]);
  const expected2 = [0, 0, 9, 0, 0];
  console.log(`Test 2: ${JSON.stringify(result2) === JSON.stringify(expected2) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [-1, 1, 0, -3, 3]`);
  console.log(`  Expected: ${JSON.stringify(expected2)}`);
  console.log(`  Got: ${JSON.stringify(result2)}`);

  // Test case 3: Single element
  const result3 = solution.productExceptSelf([5]);
  const expected3 = [1];
  console.log(`Test 3: ${JSON.stringify(result3) === JSON.stringify(expected3) ? "PASS" : "FAIL"}`);
  console.log(`  Input: [5]`);
  console.log(`  Expected: ${JSON.stringify(expected3)}`);
  console.log(`  Got: ${JSON.stringify(result3)}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export default Solution;
