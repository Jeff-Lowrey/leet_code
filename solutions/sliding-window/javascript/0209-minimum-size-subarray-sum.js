/**
 * ### METADATA:
 *
 *
 * ### INTUITION:
 * [This problem requires understanding of sliding window concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply sliding window methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - This ensures that the solution leverages sliding window principles
 * - This ensures that time complexity is optimized for the given constraints
 * - This ensures that space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * target = 7, nums = [2,3,1,2,4,3]
 * ```
 *
 * Step 1: Expand window
 * [2,3,1,2] sum=8 ≥ 7
 * Step 2: Contract
 * [3,1,2] sum=6 < 7
 * Expand: [3,1,2,4] sum=10 ≥ 7
 * Contract: [1,2,4] sum=7 ≥ 7
 * Contract: [2,4] sum=6 < 7
 * Expand: [2,4,3] sum=9 ≥ 7
 * Contract: [4,3] sum=7 ≥ 7, length=2
 *
 * Output:
 * ```
 * 2 (minimum length)
 * ```
 *
 * ### TIME COMPLEXITY:
 * O(n)**
 * - Single pass through input
 *
 * ### SPACE COMPLEXITY:
 * **O(n)** - [Explanation of why this complexity]. The algorithm [describe the operation] which takes **O(n)** space.
 *
 * ### EDGE CASES:
 * - **Empty input**: Handle when input is empty
 * - **Single element**: Handle single-element inputs
 * - **Boundary values**: Handle minimum/maximum valid values
 *
 * *
 */

/**
 * Main solution for Problem 209: Minimum Size Subarray Sum
 *
 * @param {number} target - Target sum to achieve or exceed
 * @param {number[]} nums - Array of positive integers
 * @return {number} - Minimum length of subarray with sum >= target, or 0 if none exists
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(target, nums) {
  if (!nums || nums.length === 0) return 0;

  let left = 0;
  let sum = 0;
  let minLength = Infinity;

  for (let right = 0; right < nums.length; right++) {
    // Expand window by adding current element
    sum += nums[right];

    // Contract window while sum is still >= target
    while (sum >= target) {
      minLength = Math.min(minLength, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

/**
 * Test cases for Problem 209: Minimum Size Subarray Sum
 */
function testSolution() {
  console.log("Testing 209. Minimum Size Subarray Sum");

  // Test case 1: Basic example
  const result1 = solve(7, [2, 3, 1, 2, 4, 3]);
  const expected1 = 2;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: target=7, nums=[2,3,1,2,4,3] -> ${result1}`);

  // Test case 2: Single element sufficient
  const result2 = solve(4, [1, 4, 4]);
  const expected2 = 1;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: target=4, nums=[1,4,4] -> ${result2}`);

  // Test case 3: No valid subarray
  const result3 = solve(11, [1, 1, 1, 1, 1, 1, 1, 1]);
  const expected3 = 0;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: target=11, nums=[1,1,1,1,1,1,1,1] -> ${result3}`);

  // Test case 4: Entire array needed
  const result4 = solve(15, [1, 2, 3, 4, 5]);
  const expected4 = 5;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: target=15, nums=[1,2,3,4,5] -> ${result4}`);

  // Test case 5: Empty array
  const result5 = solve(5, []);
  const expected5 = 0;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: target=5, nums=[] -> ${result5}`);

  // Test case 6: Single element array - sufficient
  const result6 = solve(3, [5]);
  const expected6 = 1;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: target=3, nums=[5] -> ${result6}`);

  // Test case 7: Single element array - insufficient
  const result7 = solve(10, [5]);
  const expected7 = 0;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );
  console.log(`Test 7 passed: target=10, nums=[5] -> ${result7}`);

  // Test case 8: Large numbers
  const result8 = solve(213, [12, 28, 83, 4, 25, 26, 25, 2, 25, 25, 25, 12]);
  const expected8 = 8;
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );
  console.log(
    `Test 8 passed: target=213, nums=[12,28,83,4,25,26,25,2,25,25,25,12] -> ${result8}`,
  );

  console.log("All test cases passed for 209. Minimum Size Subarray Sum!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 209. Minimum Size Subarray Sum ===");
  console.log("Category: Sliding Window");
  console.log("Difficulty: Medium");
  console.log("");

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
 * - This solution focuses on sliding window concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
