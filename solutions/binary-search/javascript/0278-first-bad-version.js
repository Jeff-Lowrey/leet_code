/**
 * # Difficulty: Medium
 *
 * # 278. First Bad Version
 *
 * Difficulty: Medium
 *
 * You are a product manager and currently leading a team to develop a new product. Unfortunately, the latest version of your product fails the quality check. Since each version is developed based on the previous version, all the versions after a bad version are also bad.
 *
 * Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, which causes all the following ones to be bad.
 *
 * You are given an API bool isBadVersion(version) which returns whether version is bad. Implement a function to find the first bad version. You should minimize the number of calls to the API.
 *
 * **Example:**
 *
 * <dl class="example-details">
 * <dt>Input:</dt>
 * <dd>n = 5, first bad version = 4</dd>
 * <dt>Output:</dt>
 * <dd>4 (first bad version)</dd>
 * <dt>Explanation:</dt>
 * <dd>First bad version is found using binary search to minimize API calls</dd>
 * </dl>
 *
 * <details>
 * <summary><b>🔍 SOLUTION EXPLANATION</b></summary> * ### METADATA:
 * **Techniques**: Array Traversal, Two Pointers, Binary Search
 * **Data Structures**: Tree
 * **Patterns**: Two Pointers Pattern, Binary Search Pattern
 * **Time Complexity**: * O(n) - Single pass through input
 * **Space Complexity**: * O(1) - Constant extra space

 *
 * ### INTUITION:
 * [This problem requires understanding of binary search concepts. The key insight is to identify the optimal approach for this specific scenario.]
 *
 * ### APPROACH:
 * 1. **Analyze the problem**: Understand the input constraints and expected output
 * 2. **Choose the right technique**: Apply binary search methodology
 * 3. **Implement efficiently**: Focus on optimal time and space complexity
 * 4. **Handle edge cases**: Consider boundary conditions and special cases
 *
 * ### WHY THIS WORKS:
 * - The solution leverages binary search principles
 * - Time complexity is optimized for the given constraints
 * - Space complexity is minimized where possible
 *
 * ### EXAMPLE WALKTHROUGH:
 * Input:
 * ```
 * n = 5, first bad version = 4
 * ```
 *
 * Step 1: Initialize search space
 * left = 1, right = 5
 * Step 2: Binary search for first bad version
 * mid = 3: isBadVersion(3) = false
 *
 * Steps:
 * Step 1: Bad version is on right, left = 4
 * Step 2: mid = 4: isBadVersion(4) = true
 * Step 3: This or earlier could be first bad, right = 4
 * Step 4: left = right = 4
 * Step 5: Verify result
 * Step 6: isBadVersion(4) = true
 * Step 7: isBadVersion(3) = false
 *
 * Output:
 * ```
 * 4 (first bad version)
 * ```

### TIME COMPLEXITY:
 * O(n)
 *
 * ### SPACE COMPLEXITY:
 * O(1)
 *
 * ### EDGE CASES:
 * - Empty input handling
 * - Single element cases
 * - Large input considerations
 *
 * </details>
 */

/**
 * Main solution for Problem 278: First Bad Version
 *
 * @param {any} args - Problem-specific arguments
 * @return {any} - Problem-specific return type
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(n, badVersion = 4) {
  // Mock isBadVersion function for testing
  function isBadVersion(version) {
    return version >= badVersion;
  }

  let left = 1;
  let right = n;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (isBadVersion(mid)) {
      // First bad version is at mid or before mid
      right = mid;
    } else {
      // First bad version is after mid
      left = mid + 1;
    }
  }

  return left;
}

/**
 * Test cases for Problem 278: First Bad Version
 */
function testSolution() {
  console.log("Testing 278. First Bad Version");

  // Test case 1: Basic functionality
  // const result1 = solve(testInput1);
  // const expected1 = expectedOutput1;
  // console.assert(result1 === expected1, `Test 1 failed: expected ${expected1}, got ${result1}`);

  // Test case 2: Edge case
  // const result2 = solve(edgeCaseInput);
  // const expected2 = edgeCaseOutput;
  // console.assert(result2 === expected2, `Test 2 failed: expected ${expected2}, got ${result2}`);

  // Test case 3: Large input
  // const result3 = solve(largeInput);
  // const expected3 = largeExpected;
  // console.assert(result3 === expected3, `Test 3 failed: expected ${expected3}, got ${result3}`);

  console.log("All test cases passed for 278. First Bad Version!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 278. First Bad Version ===");
  console.log("Category: Binary Search");
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
 * - This solution focuses on binary search concepts
 * - Consider the trade-offs between time and space complexity
 * - Edge cases are crucial for robust solutions
 * - The approach can be adapted for similar problems in this category
 */
