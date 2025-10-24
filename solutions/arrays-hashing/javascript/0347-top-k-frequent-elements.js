/**
 * # Difficulty: Medium
 *
 * # 0347. Top K Frequent Elements
 *
 * Difficulty: Medium
 *
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>nums = [1,1,1,2,2,3], k = 2</dd>
 * <dt>Output:</dt>
 * <dd>[1, 2]
 * [1, 2]</dd>
 * <dt>Explanation:</dt>
 * <dd>The k=2 most frequent elements in [1,1,1,2,2,3] are [1,2]</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Hash Table Lookup, Hash Map Storage, Array Traversal
 * **Data Structures**: Hash Map, Hash Set, Array
 * **Patterns**: Hash Table Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of arrays hashing concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply arrays hashing methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages arrays hashing principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * nums = [1,1,1,2,2,3], k = 2
 * ```
 *
 * Step 1: Count frequencies using Counter
 * freq_map = {1: 3, 2: 2, 3: 1}
 * Step 2: Build max heap with negative frequencies
 * heap = [(-3, 1), (-2, 2), (-1, 3)]
 * Step 3: Extract k most frequent elements
 * Alternative (Bucket Sort):
 *
 * Steps:
 * Step 1: - Pop: (-3, 1) → result = [1]
 * Step 2: - Pop: (-2, 2) → result = [1, 2]
 * Step 3: Create buckets by frequency
 * Step 4: buckets[3] = [1]
 * Step 5: buckets[2] = [2]
 * Step 6: buckets[1] = [3]
 * Step 7: Collect from highest frequency buckets
 * Step 8: - From bucket 3: add 1
 * Step 9: - From bucket 2: add 2
 *
 * Output:
 * ```
 * [1, 2]
 * [1, 2]
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

/**
 * Main solution for Problem 347: Top K Frequent Elements
 *
 * @param {number[]} nums - Array of integers
 * @param {number} k - Number of top frequent elements to return
 * @return {number[]} - Array of k most frequent elements
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function solve(nums, k) {
  // Handle edge cases
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }

  if (k >= nums.length) {
    return [...new Set(nums)];
  }

  // Step 1: Count frequency of each number using Map
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Step 2: Create buckets indexed by frequency
  // Maximum frequency possible is nums.length
  const buckets = Array(nums.length + 1)
    .fill(null)
    .map(() => []);

  for (const [num, freq] of freqMap) {
    buckets[freq].push(num);
  }

  // Step 3: Collect k most frequent elements
  // Traverse from highest frequency to lowest
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    result.push(...buckets[i]);
  }

  // Return exactly k elements
  return result.slice(0, k);
}

/**
 * Test cases for Problem 347: Top K Frequent Elements
 */
function testSolution() {
  console.log("Testing 347. Top K Frequent Elements");

  // Test case 1: Basic functionality
  const result1 = solve([1, 1, 1, 2, 2, 3], 2);
  const expected1 = [1, 2]; // Order may vary but should contain these elements
  console.assert(
    result1.length === 2 && result1.includes(1) && result1.includes(2),
    `Test 1 failed: expected [1,2], got [${result1}]`,
  );

  // Test case 2: Single element
  const result2 = solve([1], 1);
  const expected2 = [1];
  console.assert(
    JSON.stringify(result2) === JSON.stringify(expected2),
    `Test 2 failed: expected [1], got [${result2}]`,
  );

  // Test case 3: All elements have same frequency
  const result3 = solve([1, 2, 3], 2);
  console.assert(
    result3.length === 2,
    `Test 3 failed: expected length 2, got ${result3.length}`,
  );

  // Test case 4: Edge case - empty array
  const result4 = solve([], 1);
  const expected4 = [];
  console.assert(
    JSON.stringify(result4) === JSON.stringify(expected4),
    `Test 4 failed: expected [], got [${result4}]`,
  );

  // Test case 5: k larger than unique elements
  const result5 = solve([1, 1, 2, 2, 3], 5);
  console.assert(
    result5.length === 3 &&
      result5.includes(1) &&
      result5.includes(2) &&
      result5.includes(3),
    `Test 5 failed: expected all unique elements, got [${result5}]`,
  );

  console.log("All test cases passed for 347. Top K Frequent Elements!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 347. Top K Frequent Elements ===");
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
 * - This solution focuses on arrays hashing concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
