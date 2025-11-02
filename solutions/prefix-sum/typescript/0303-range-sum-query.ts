/**
 * # Difficulty: Easy
 *
 * # 0303. Range Sum Query - Immutable
 *
 *
 * Given an integer array nums, handle multiple queries of the following type:
 *
 * Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
 *
 * Implement the NumArray class:
 *
 * - NumArray(int[] nums) Initializes the object with the integer array nums.
 * - int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e., nums[left] + nums[left + 1] + ... + nums[right]).
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]</dd>
 * <dt>Output:</dt>
 * <dd>[null,1,-1,-3]</dd>
 * <dt>Explanation:</dt>
 * <dd>The sum of elements between indices 2 and 5 is calculated as prefix[5+1] - prefix[2] = 1</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary>
### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Array, String, Tree
 * **Patterns**: Two Pointers Pattern
 * **Time Complexity**: O(n) - Single pass through input
 * **Space Complexity**: O(1) - Constant extra space
 *
 * ### INTUITION:
 * Precompute cumulative sums in array. For range [i,j], the sum is prefix[j+1] - prefix[i]. This reduces each query from O(n) to O(1) with O(n) preprocessing.
 *
 * ### APPROACH:
 * 1. **Initialize prefix sum**: In __init__, create self.prefix_sum = [0] * (len(nums) + 1)
 * 2. **Build prefix array**: For i in range(len(nums)), prefix_sum[i+1] = prefix_sum[i] + nums[i]
 * 3. **Query with O(1)**: In sumRange, return self.prefix_sum[right+1] - self.prefix_sum[left]
 * 4. **Leverage preprocessing**: Use pre-computed cumulative sums for fast queries
 *
 * ### WHY THIS WORKS:
 * - Precompute cumulative sums: prefix[i] = sum of nums[0..i-1]
 * - Range sum [left, right] = prefix[right+1] - prefix[left]
 * - O(n) preprocessing builds prefix array once
 * - O(1) query time: just subtraction, no loop needed
 * - Trade O(n) space for constant-time queries vs O(n) per query without prefix
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * ["NumArray","sumRange","sumRange","sumRange"], [[[-2,0,3,-5,2,-1]],[0,2],[2,5],[0,5]]
 * ```
 *
 * Step 1: Build prefix sum array
 * nums = [-2,0,3,-5,2,-1]
 * prefix = [0,-2,-2,1,-4,-2,-3]
 * Step 2: Query using prefix
 * sumRange(0,2) = prefix[3] - prefix[0] = 1 - 0 = 1
 * sumRange(2,5) = prefix[6] - prefix[2] = -3 - (-2) = -1
 * sumRange(0,5) = prefix[6] - prefix[0] = -3 - 0 = -3
 *
 * Output:
 * ```
 * [null,1,-1,-3]
 * ```

 * ### TIME COMPLEXITY:
 * O(n)
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 * - Constant extra space
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

class NumArray {
  private prefix: number[];

  constructor(nums: number[]) {
    this.prefix = [0];
    for (const num of nums) {
      this.prefix.push(this.prefix[this.prefix.length - 1] + num);
    }
  }

  /**
   * Return sum of elements from index left to right.
   *
   * Time Complexity: O(1)
   * Space Complexity: O(1)
   */
  sumRange(left: number, right: number): number {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { NumArray };
}

function runTests(): void {
  // Test case 1: Classic example
  const numArray1 = new NumArray([-2, 0, 3, -5, 2, -1]);
  console.log(`Test 1: ${numArray1.sumRange(0, 2) === 1 ? "PASS" : "FAIL"}`);
  console.log(`Test 2: ${numArray1.sumRange(2, 5) === -1 ? "PASS" : "FAIL"}`);
  console.log(`Test 3: ${numArray1.sumRange(0, 5) === -3 ? "PASS" : "FAIL"}`);

  // Test case 2: Single element
  const numArray2 = new NumArray([5]);
  console.log(`Test 4: ${numArray2.sumRange(0, 0) === 5 ? "PASS" : "FAIL"}`);

  // Test case 3: All positive
  const numArray3 = new NumArray([1, 2, 3, 4, 5]);
  console.log(`Test 5: ${numArray3.sumRange(0, 4) === 15 ? "PASS" : "FAIL"}`);
  console.log(`Test 6: ${numArray3.sumRange(1, 3) === 9 ? "PASS" : "FAIL"}`);

  console.log("\nAll test cases completed!");
}

if (typeof require !== "undefined" && require.main === module) {
  runTests();
}

export { NumArray };
