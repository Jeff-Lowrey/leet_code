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
 * fruits = [1,2,1,2,3,1,1]
 * ```
 *
 * Step 1: Expand with at most 2 types
 * [1,2,1,2]: types={1,2}, count=4
 * [1,2,1,2,3]: types={1,2,3}, invalid
 * Step 2: Contract
 * [2,1,2,3]: types={1,2,3}, invalid
 * [1,2,3]: types={1,2,3}, invalid
 * [2,3]: types={2,3}, valid
 * [2,3,1,1]: types={2,3,1}, invalid
 * [3,1,1]: types={3,1}, count=3
 *
 * Output:
 * ```
 * 4 (maximum fruits)
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
 * Main solution for Problem 904: Fruit Into Baskets
 *
 * @param {number[]} fruits - Array representing fruit types at each tree
 * @return {number} - Maximum number of fruits that can be collected
 *
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function solve(fruits) {
  if (!fruits || fruits.length === 0) return 0;

  const fruitCount = new Map();
  let left = 0;
  let maxFruits = 0;

  for (let right = 0; right < fruits.length; right++) {
    const fruit = fruits[right];

    // Add current fruit to window
    fruitCount.set(fruit, (fruitCount.get(fruit) || 0) + 1);

    // If we have more than 2 types, contract window
    while (fruitCount.size > 2) {
      const leftFruit = fruits[left];
      fruitCount.set(leftFruit, fruitCount.get(leftFruit) - 1);

      // Remove fruit type if count reaches 0
      if (fruitCount.get(leftFruit) === 0) {
        fruitCount.delete(leftFruit);
      }

      left++;
    }

    // Update maximum fruits collected
    maxFruits = Math.max(maxFruits, right - left + 1);
  }

  return maxFruits;
}

/**
 * Test cases for Problem 904: Fruit Into Baskets
 */
function testSolution() {
  console.log("Testing 904. Fruit Into Baskets");

  // Test case 1: Basic example
  const result1 = solve([1, 2, 1]);
  const expected1 = 3;
  console.assert(
    result1 === expected1,
    `Test 1 failed: expected ${expected1}, got ${result1}`,
  );
  console.log(`Test 1 passed: fruits=[1,2,1] -> ${result1}`);

  // Test case 2: More complex case
  const result2 = solve([0, 1, 2, 2]);
  const expected2 = 3;
  console.assert(
    result2 === expected2,
    `Test 2 failed: expected ${expected2}, got ${result2}`,
  );
  console.log(`Test 2 passed: fruits=[0,1,2,2] -> ${result2}`);

  // Test case 3: Multiple type changes
  const result3 = solve([1, 2, 3, 2, 2]);
  const expected3 = 4;
  console.assert(
    result3 === expected3,
    `Test 3 failed: expected ${expected3}, got ${result3}`,
  );
  console.log(`Test 3 passed: fruits=[1,2,3,2,2] -> ${result3}`);

  // Test case 4: Single type
  const result4 = solve([1, 1, 1, 1]);
  const expected4 = 4;
  console.assert(
    result4 === expected4,
    `Test 4 failed: expected ${expected4}, got ${result4}`,
  );
  console.log(`Test 4 passed: fruits=[1,1,1,1] -> ${result4}`);

  // Test case 5: Two types only
  const result5 = solve([1, 2, 1, 2, 1, 2]);
  const expected5 = 6;
  console.assert(
    result5 === expected5,
    `Test 5 failed: expected ${expected5}, got ${result5}`,
  );
  console.log(`Test 5 passed: fruits=[1,2,1,2,1,2] -> ${result5}`);

  // Test case 6: Empty array
  const result6 = solve([]);
  const expected6 = 0;
  console.assert(
    result6 === expected6,
    `Test 6 failed: expected ${expected6}, got ${result6}`,
  );
  console.log(`Test 6 passed: fruits=[] -> ${result6}`);

  // Test case 7: Single element
  const result7 = solve([5]);
  const expected7 = 1;
  console.assert(
    result7 === expected7,
    `Test 7 failed: expected ${expected7}, got ${result7}`,
  );
  console.log(`Test 7 passed: fruits=[5] -> ${result7}`);

  // Test case 8: Complex pattern
  const result8 = solve([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]);
  const expected8 = 5;
  console.assert(
    result8 === expected8,
    `Test 8 failed: expected ${expected8}, got ${result8}`,
  );
  console.log(`Test 8 passed: fruits=[3,3,3,1,2,1,1,2,3,3,4] -> ${result8}`);

  console.log("All test cases passed for 904. Fruit Into Baskets!");
}

/**
 * Example usage and demonstration
 */
function demonstrateSolution() {
  console.log("\n=== Problem 904. Fruit Into Baskets ===");
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
 * - This is essentially "longest substring with at most K distinct characters" where K=2
 */
